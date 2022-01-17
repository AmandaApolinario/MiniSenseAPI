import express from "express";
const app = express();

app.use(express.json());

import { User } from "./products";
import { MeasurementUnit } from "./products";
import { Measurements } from './products';
import { DataStream } from './products';
import { SensorDevice } from './products';

let users:User[] = new Array();

//para que cada key seja diferente, independente dos devices q elas tão
let keysForStreams:number = 1; 

function findSensorDevice(User:String){
  const usuario = users.find( username => username.username === User);

  if(usuario){
    return usuario.sensorDevice;
  }
  
}

app.get('/MeasurementUnit',(req,res) =>{
  res.status(200).json(MeasurementUnit); 
});

app.get('/SensorDevice/:User',(req,res) =>{
  const { User } = req.params;
  const usuario = users.find( username => username.username === User);
  if(usuario){
    res.status(200).json(usuario.sensorDevice);
  }
  res.status(404).send("Usuario não encontrado");
  
});

app.get('/SensorDevice/:User/:Key',(req,res) =>{
  const { User } = req.params;
  const { Key } = req.params;
  const sensorDevice = findSensorDevice(User);

  if(sensorDevice){
    const device = sensorDevice.find( dispositivo => dispositivo.key === Key);
    if(device){
      //da uma olhada pq provavelmente tem q fazer um format ai
      res.status(200).json(device);
    }
    else{
      res.status(404).send("Sensor device não encontrado");
    }
  }
  res.status(404).send("Usuario não encontrado");

});

app.get('/Stream/:User/:Key',(req,res) =>{

});

//perguntar se eu posso fazer isso aq
app.post('/User',(req,res)=>{
  const info = req.body;
  users.unshift(new User(info.username,info.email));
  res.status(200).send(JSON.parse(users[0].format()));
});
/*teste
{
  "username" = "amanda",
  "email" = "amanda@gmail"
}
*/

app.post('/SensorDevice/:User',(req,res)=>{
  let sensorDevice = findSensorDevice(req.params.User);
  const info = req.body;
  if(sensorDevice){
    sensorDevice.unshift(new SensorDevice(sensorDevice.length+1,info.label,info.description));
  res.status(200).send(JSON.parse(sensorDevice[0].format()));
  }
  

});

/*teste
{
  "label": "label",
  "description": "description"
}
*/

app.post('/DataStream/:User/SensorDevice/:Key',(req,res)=>{
  const { User } = req.params;
  let sensorDevice = findSensorDevice(req.params.User);
  const { Key } = req.params;
  if(sensorDevice){
    const device = sensorDevice.find( deviceKey => deviceKey.key === Key);

    if(device){
      const info = req.body;
      let stream = new DataStream((device.streams).length+1,keysForStreams,info.label,info.unitId,device.id);
      keysForStreams++;
      device.addStream(stream);
      res.status(200).send(JSON.parse(stream.format()));
    }
    else{
      res.status(404).send("Sensor device não encontrado");
    }
  }
  else{
    res.status(404).send("Usuario não encontrado");
  }
  
});

/*teste
{
  "label": "label",
  "unitId": 2
}
*/

//publicar medicao em uma stream de um dispositivo
app.post('/DataStream/:User/:KeyDevice/:KeyStream',(req,res)=>{
  const { User } = req.params;
  let sensorDevice = findSensorDevice(req.params.User);

  const { KeyDevice } = req.params;
  const { KeyStream } = req.params;

  if(sensorDevice){
    const device = sensorDevice.find( deviceKey => deviceKey.key === KeyDevice);
    if(device){
      const stream = (device.streams).find( streamKey => streamKey.key === KeyStream);
      if(stream){
        const info = req.body;
        let measure = new Measurements(+info.timestamp,+info.value);
        stream.addMeasurement(measure);
        res.status(200).send(JSON.parse(measure.format(stream.id,stream.unitId)));
      }
      else{
        res.status(404).send("Stream não encontrado");
      }
      res.status(404).send("Sensor device não encontrado");
    }
  }
  else{
    res.status(404).send("Usuario não encontrado");
  }
  
});
/*teste
{
  "timestamp": 13242,
  "value": 15.5
}
*/

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on PORT ${port}'));