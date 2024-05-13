import express from 'express';

const app = express();

const PORT = process.env.PORT || 8081;



app.listen(PORT,()=>{
  console.log(`running on port ${PORT}`);
})