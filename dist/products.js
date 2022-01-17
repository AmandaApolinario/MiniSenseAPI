"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorDevice = exports.DataStream = exports.Measurements = exports.MeasurementUnit = exports.User = void 0;
class User {
    constructor(username, email) {
        this.sensorDevice = new Array();
        this.username = username;
        this.email = email;
    }
    format() {
        return `{"username": "${this.username}","email":"${this.email}}"`;
    }
}
exports.User = User;
exports.MeasurementUnit = [
    {
        "id": 1,
        "symbol": "ºC",
        "description": "Celsius"
    },
    {
        "id": 2,
        "symbol": "mg/m³",
        "description": "Megagram per cubic metre"
    },
    {
        "id": 3,
        "symbol": "hPA",
        "description": "hectopasca"
    },
    {
        "id": 4,
        "symbol": "lux",
        "description": "Lux"
    },
    {
        "id": 5,
        "symbol": "%",
        "description": "Percent"
    }
];
class Measurements {
    constructor(timestamp, value) {
        this.timestamp = timestamp;
        this.value = value;
    }
    format(id, unitId) {
        return `{"id": ${id}, "timestamp": ${this.timestamp}, "value": ${this.value}, "unitId": ${unitId}}`;
    }
}
exports.Measurements = Measurements;
class DataStream {
    constructor(id, key, label, unitId, deviceId) {
        this.measurements = new Array();
        this.id = id;
        this.key = key.toString();
        this.label = label;
        this.unitId = unitId;
        this.deviceId = deviceId;
        this.measurementCount = 0;
    }
    addMeasurement(measure) {
        (this.measurements).unshift(measure);
        this.measurementCount++;
    }
    format() {
        return `{"id": ${this.id},"key": "${this.key}","label": "${this.label}", "unitId": ${this.unitId}, "deviceId": ${this.deviceId}, "measurementCount": ${this.measurementCount}}`;
    }
}
exports.DataStream = DataStream;
class SensorDevice {
    constructor(id, label, description) {
        this.streams = new Array();
        this.id = id;
        this.key = id.toString();
        this.label = label;
        this.description = description;
    }
    addStream(stream) {
        (this.streams).unshift(stream);
    }
    format() {
        return `{"id": ${this.id},"key": "${this.key}","label": "${this.label}","description": "${this.description}"}`;
    }
}
exports.SensorDevice = SensorDevice;
