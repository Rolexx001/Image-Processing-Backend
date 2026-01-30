const express=require('express');
const router=express.Router();

const multer=require('multer');
const Image=require('../models/Image');
const {imageQueue}=require('../../shared/queue');

const upload=multer({dest:'uploads/'});

router.post('/upload',upload.single('image'),async(req,res)=>{
    try{
        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image file." });
        }
        const newImage=await Image.create({
            originalName:req.file.originalname,
            path:req.file.path,
        });

        await imageQueue.add(
            'process-image',
            {
                imageId: newImage._id,
                filePath: req.file.path,
                fileName: req.file.originalname,
            },
            {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000,
                },
                removeOnComplete: true,
            }
        );
        res.status(202).json({id:newImage._id,status:'queued'});

    }
    catch(err){
        if (err.message.includes('ECONNREFUSED')) {
            return res.status(503).json({ error: "Redis is offline. Task could not be queued." });
        }
        res.status(500).json({error:err.message});
    }
});

router.get('/status/:id',async(req,res)=>{
    const image=await Image.findById(req.params.id);
    res.json(image);
});

module.exports=router;