const {Worker} = require('bullmq');
const sharp=require('sharp');
const connectDB=require('../shared/db');
const {connection,IMAGE_QUEUE_NAME}=require('../shared/queue');
const Image=require('../api/models/Image');
const path=require('path');

const fs=require('fs').promises;
sharp.cache(false);

connectDB();

const worker=new Worker(IMAGE_QUEUE_NAME,async(job)=>{
    const {imageId,filePath,fileName}=job.data;
    const storageName=path.basename(filePath); 
    const processedDir=path.join('uploads','processed');
    const thumbPath = path.join(processedDir, `thumb-${storageName}.webp`);
    const largePath = path.join(processedDir, `large-${storageName}.webp`);
    try{
     console.log(`Processing job ${job.id} for image ${imageId}`);

    await Image.findByIdAndUpdate(imageId,{status:'processing'});
    

    await Promise.all([
        sharp(filePath)
            .resize(200,200)
            .toFile(thumbPath),

        sharp(filePath)
            .resize(1200)
            .composite([{
                
                input: Buffer.from(`<svg><text x="10" y="30" font-size="30" fill="white">© AmanSagar</text></svg>`),
                gravity:'southeast',
            }])
            .webp()
            .toFile(largePath)
    ])
    
    await Image.findByIdAndUpdate(imageId,{
        status:'completed',
        processedUrl:largePath.replace(/\\/g,'/')
    });
    setTimeout(async()=>{
        try{
            await fs.unlink(filePath);
            console.log(`Deleted raw file: ${filePath}`);
        }
        catch(err){
            console.error(`Cleaned delayed but file will be removed later: ${err.message}`);
        }
    })
    return {status:'done'};

    


    } catch(err){
        await Image.findByIdAndUpdate(imageId,{status:'failed'});
        throw err;
    }
},{connection});

worker.on('completed',(job)=>console.log(`Job ${job.id} completed`));
worker.on('failed',(job,err)=>console.log(`Job ${job.id} failed with error ${err.message}`));