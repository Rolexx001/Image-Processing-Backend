const {Queue}=require('bullmq');
const Redis=require('ioredis');
require('dotenv').config();

const connection=new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    maxRetriesPerRequest:null,
});

const IMAGE_QUEUE_NAME='image-processing-queue';

const imageQueue=new Queue(IMAGE_QUEUE_NAME,{connection});

module.exports={imageQueue,connection,IMAGE_QUEUE_NAME};