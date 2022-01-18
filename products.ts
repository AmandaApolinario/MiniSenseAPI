export class User{
    username: String;
    email: String;
    sensorDevice: SensorDevice[] = new Array();

    constructor(username:String,email:String){
        this.username = username;
        this.email = email;
    }

    format(){
        return `{"username": "${this.username}","email":"${this.email}"}`;
    }
}

export const MeasurementUnit = 
    [
        {
           "id":1,
           "symbol":"ºC",
           "description": "Celsius"
        },
        {
           "id":2,
           "symbol":"mg/m³",
           "description": "Megagram per cubic metre"
        },
        {
           "id":3,
           "symbol":"hPA",
           "description": "hectopasca"
        },
        {
           "id":4,
           "symbol":"lux",
           "description": "Lux"
        },
        {
           "id":5,
           "symbol":"%",
           "description": "Percent"
        }
];

export class Measurements{
    timestamp:number;
    value:number;

    constructor(timestamp:number,value:number){
        this.timestamp = timestamp;
        this.value = value;
    }

    format(id:number,unitId:number){
        return `{"id": ${id}, "timestamp": ${this.timestamp}, "value": ${this.value}, "unitId": ${unitId}}`;
    }
}

export class DataStream{
    id:number;
    key:String;
    label:String;
    unitId:number;
    deviceId:number;
    measurementCount:number;
    measurements:Array<Measurements> = new Array();

    constructor(id:number,key:number,label:String,unitId:number,deviceId:number){
        this.id = id;
        this.key = key.toString();
        this.label = label;
        this.unitId = unitId;
        this.deviceId = deviceId;
        this.measurementCount = 0;
        
    }

    addMeasurement(measure:Measurements){
        (this.measurements).unshift(measure);
        this.measurementCount++;
    }

    format(){
        return `{"id": ${this.id},"key": "${this.key}","label": "${this.label}", "unitId": ${this.unitId}, "deviceId": ${this.deviceId}, "measurementCount": ${this.measurementCount}}`
    }

    getDataStream(){
        //nao consegui retornar os measurements
        return `{"id": ${this.id},"key": "${this.key}","label": "${this.label}", "unitId": ${this.unitId}, "deviceId": ${this.deviceId}, "measurementCount": ${this.measurementCount}}`
    }
}

export class SensorDevice {
    id:number;
    key:String;
    label:String;
    description:String;
    streams:Array<DataStream> = new Array();

    constructor(id:number,label:String,description:String){
        this.id = id;
        this.key = id.toString();
        this.label = label;
        this.description = description;
        
    }

    addStream(stream:DataStream){
        (this.streams).unshift(stream);
    }

    format(){
        return `{"id": ${this.id},"key": "${this.key}","label": "${this.label}","description": "${this.description}"}`
    }

    getSensorDevice(){
        //nao consegui fazer retornar as streams para a response
        return `{"id": ${this.id},"key": "${this.key}","label": "${this.label}","description": "${this.description}"}`;
    }
}