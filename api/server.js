const express=require('express');
const connectDB=require('../shared/db');
const uploadRoutes=require('./routes/upload.routes');

const {createBullBoard}=require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { imageQueue } = require('../shared/queue');

const serverAdapter=new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues:[new BullMQAdapter(imageQueue)],
  serverAdapter,
});


const app=express();
connectDB();
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use('/api',uploadRoutes);
app.use('/admin/queues', serverAdapter.getRouter());


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});