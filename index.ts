import express from "express";
const app = express();

app.use(express.json());

import {MeasurementUnit} from './info';
import {User} from './info';
import {Stream} from './info';

app.get('/MeasurementUnit',(req,res) =>{
    res.status(200).json(MeasurementUnit);
});

app.get('/SensorDevice/User',(req,res) =>{
  res.status(200).json(User);
});

app.get('/SensorDevice/:Key',(req,res) =>{
  const { Key } = req.params;
  const key2 = Stream.find((key2) => key2.key === Key);
  res.status(200).json(key2);
});

app.get('/Stream/:Key',(req,res) =>{

});

app.post('/SensorDevice',(req,res)=>{
  const outKey = '27b26e48cd674cc38ec45808cf48fa07';
  const key2 = Stream.find((key2) => key2.key === outKey);
  const stream = key2?.streams;
  const Key = "8961bd9a4d1e439ebf3b86af5b9d5c1f"
  const id = 2;
  const stream2 = stream?.find((stream2)=> stream2.key === Key);
  

});

app.post('/DataStream/SensorDevice/:Key',(req,res)=>{

});

app.post('/DataStream/:Key',(req,res)=>{
  const outKey = '27b26e48cd674cc38ec45808cf48fa07';
  const key2 = Stream.find((key2) => key2.key === outKey);
  const stream = key2?.streams;
  const { Key } = req.params;
  const stream2 = stream?.find((stream2)=> stream2.key === Key);
  const measurements = stream2?.measurements;
  measurements?.unshift(req.body);
  
  res.status(200).json(req.body);


});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on PORT ${port}'));