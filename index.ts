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
  const devices = Stream.find((devices) => devices.key === Key);
  res.status(200).send(devices);
  //tem q ter o for 5
});

app.get('/Stream/:Key',(req,res) =>{
  const outKey = '27b26e48cd674cc38ec45808cf48fa07';
  const devices = Stream.find((devices) => devices.key === outKey);
  const streams = devices?.streams;
  const { Key } = req.params;
  const stream = streams?.find((stream) => stream.key === Key);
  res.status(200).send(stream);

});

app.post('/SensorDevice',(req,res)=>{
  const outKey = '27b26e48cd674cc38ec45808cf48fa07';
  const devices = Stream.find((devices) => devices.key === outKey);
  const streams = devices?.streams;
  const Key = "8961bd9a4d1e439ebf3b86af5b9d5c1f"
  const id = 2;
  const stream2 = streams?.find((stream2)=> stream2.key === Key);

});

app.post('/DataStream/SensorDevice/:Key',(req,res)=>{

});

app.post('/DataStream/:Key',(req,res)=>{
  const outKey = '27b26e48cd674cc38ec45808cf48fa07';
  const devices = Stream.find((devices) => devices.key === outKey);
  const streams = devices?.streams;
  const { Key } = req.params;
  const stream = streams?.find((stream)=> stream.key === Key);
  const measurements = stream?.measurements;
  measurements?.unshift(req.body);
  
  res.status(200).json(req.body);

});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on PORT ${port}'));