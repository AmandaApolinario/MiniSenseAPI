"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const products_1 = require("./products");
const products_2 = require("./products");
const products_3 = require("./products");
const products_4 = require("./products");
const products_5 = require("./products");
let users = new Array();
//para que cada key seja diferente, independente dos devices q elas tão
let keysForStreams = 1;
function findSensorDevice(User) {
    const usuario = users.find(username => username.username === User);
    if (usuario) {
        return usuario.sensorDevice;
    }
}
//Consultar unidades de medida
app.get('/MeasurementUnit', (req, res) => {
    res.status(200).json(products_2.MeasurementUnit);
});
//Consultar dispositivos do usuário
app.get('/SensorDevice/:User', (req, res) => {
    const { User } = req.params;
    const usuario = users.find(username => username.username === User);
    if (usuario) {
        res.status(200).json(usuario.sensorDevice);
    }
    res.status(404).send("Usuario não encontrado");
});
//Consultar dispositivo específico com sua chave
app.get('/SensorDevice/:User/:Key', (req, res) => {
    //tem q ter o for 5 q eu n fiz
    const { User } = req.params;
    const { Key } = req.params;
    const sensorDevice = findSensorDevice(User);
    if (sensorDevice) {
        const device = sensorDevice.find(dispositivo => dispositivo.key === Key);
        if (device) {
            //da uma olhada pq provavelmente tem q fazer um format ai
            res.status(200).send(JSON.parse(device.getSensorDevice()));
        }
        else {
            res.status(404).send("Sensor device não encontrado");
        }
    }
    res.status(404).send("Usuario não encontrado");
});
//Consultar dados de um stream específico com sua chave
app.get('/Stream/:User/:Key', (req, res) => {
    const { User } = req.params;
    const { Key } = req.params;
    const sensorDevice = findSensorDevice(User);
    if (sensorDevice) {
        for (let i = 0; i < sensorDevice.length; i++) {
            let streams = sensorDevice[i].streams;
            let stream = streams.find(key => key.key === Key);
            if (stream) {
                res.status(200).send(JSON.parse(stream.getDataStream()));
            }
            else {
                res.status(200).send("medição não encontrada");
            }
        }
        res.status(404).send("Stream não encontrada");
    }
    else {
        res.status(404).send("Sensor device não encontrado");
    }
});
//Cadastra um usuário
app.post('/User', (req, res) => {
    const info = req.body;
    users.unshift(new products_1.User(info.username, info.email));
    res.status(200).send(JSON.parse(users[0].format()));
});
//Registrar um dispositivo
app.post('/SensorDevice/:User', (req, res) => {
    let sensorDevice = findSensorDevice(req.params.User);
    const info = req.body;
    if (sensorDevice) {
        sensorDevice.unshift(new products_5.SensorDevice(sensorDevice.length + 1, info.label, info.description));
        res.status(200).send(JSON.parse(sensorDevice[0].format()));
    }
    else {
        res.status(404).send("Dispositivo não encontrado");
    }
});
//Registrar stream para um dispositivo
app.post('/DataStream/:User/SensorDevice/:Key', (req, res) => {
    const { User } = req.params;
    let sensorDevice = findSensorDevice(req.params.User);
    const { Key } = req.params;
    if (sensorDevice) {
        const device = sensorDevice.find(deviceKey => deviceKey.key === Key);
        if (device) {
            const info = req.body;
            let stream = new products_4.DataStream((device.streams).length + 1, keysForStreams, info.label, info.unitId, device.id);
            keysForStreams++;
            device.addStream(stream);
            res.status(200).send(JSON.parse(stream.format()));
        }
        else {
            res.status(404).send("Sensor device não encontrado");
        }
    }
    else {
        res.status(404).send("Usuario não encontrado");
    }
});
//publicar medicao em uma stream de um dispositivo
app.post('/DataStream/:User/:KeyDevice/:KeyStream', (req, res) => {
    const { User } = req.params;
    let sensorDevice = findSensorDevice(req.params.User);
    const { KeyDevice } = req.params;
    const { KeyStream } = req.params;
    if (sensorDevice) {
        const device = sensorDevice.find(deviceKey => deviceKey.key === KeyDevice);
        if (device) {
            const stream = (device.streams).find(streamKey => streamKey.key === KeyStream);
            if (stream) {
                const info = req.body;
                let measure = new products_3.Measurements(+info.timestamp, +info.value);
                stream.addMeasurement(measure);
                res.status(200).send(JSON.parse(measure.format(stream.id, stream.unitId)));
            }
            else {
                res.status(404).send("Stream não encontrado");
            }
            res.status(404).send("Sensor device não encontrado");
        }
    }
    else {
        res.status(404).send("Usuario não encontrado");
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on PORT ${port}'));
