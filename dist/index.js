"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const info_1 = require("./info");
const info_2 = require("./info");
const info_3 = require("./info");
app.get('/MeasurementUnit', (req, res) => {
    res.status(200).json(info_1.MeasurementUnit);
});
app.get('/SensorDevice/User', (req, res) => {
    res.status(200).json(info_2.User);
});
app.get('/SensorDevice/:Key', (req, res) => {
    const { Key } = req.params;
    const devices = info_3.Stream.find((devices) => devices.key === Key);
    res.status(200).send(devices);
    //tem q ter o for 5
});
app.get('/Stream/:Key', (req, res) => {
    const outKey = '27b26e48cd674cc38ec45808cf48fa07';
    const devices = info_3.Stream.find((devices) => devices.key === outKey);
    const streams = devices === null || devices === void 0 ? void 0 : devices.streams;
    const { Key } = req.params;
    const stream = streams === null || streams === void 0 ? void 0 : streams.find((stream) => stream.key === Key);
    res.status(200).send(stream);
});
app.post('/SensorDevice', (req, res) => {
    const outKey = '27b26e48cd674cc38ec45808cf48fa07';
    const devices = info_3.Stream.find((devices) => devices.key === outKey);
    const streams = devices === null || devices === void 0 ? void 0 : devices.streams;
    const Key = "8961bd9a4d1e439ebf3b86af5b9d5c1f";
    const id = 2;
    const stream2 = streams === null || streams === void 0 ? void 0 : streams.find((stream2) => stream2.key === Key);
});
app.post('/DataStream/SensorDevice/:Key', (req, res) => {
});
app.post('/DataStream/:Key', (req, res) => {
    const outKey = '27b26e48cd674cc38ec45808cf48fa07';
    const devices = info_3.Stream.find((devices) => devices.key === outKey);
    const streams = devices === null || devices === void 0 ? void 0 : devices.streams;
    const { Key } = req.params;
    const stream = streams === null || streams === void 0 ? void 0 : streams.find((stream) => stream.key === Key);
    const measurements = stream === null || stream === void 0 ? void 0 : stream.measurements;
    measurements === null || measurements === void 0 ? void 0 : measurements.unshift(req.body);
    res.status(200).json(req.body);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on PORT ${port}'));
