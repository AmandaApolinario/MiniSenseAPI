# COLOCA CONTROLE DE ERROS

# RESTFul API MiniSense

explanation of what it 

The REST API to the example app is described below.

port: localhost:3000

## Install
blablabla

## Run the API
blablabla

# Endpoints

## GET

### **Consultar unidades de medida**
`/MeasurementUnit`

Response

200 Sucesso e as unidades de medida em json


### **Consultar dispositivos do usuário**
`/SensorDevice/User`

Response

200 Sucesso e os dispositivos do usuário

### **Consultar dispositivo específico com sua chave**

Utilize no lugar de key a chave do dispositivo

`/SensorDevice/key`

Response

200 Sucesso e o dispositivo escolhido

### **Consultar dados de um stream específico com sua chave**
Utilize no lugar de key a chave da stream

`/Stream/key`

Response

200 Sucesso e dados da stream escolhida

## POST

### **Registrar um novo dispositivo**
`/SensorDevice`

Request

(em formato JSON)

Response

### **Registrar stream para um dispositivo**
Utilize no lugar de key a chave do dispositivo

`/DataStream/SensorDevice/key `

Request
(em formato JSON)

Response

### **Publicar medição em uma stream**
Utilize no lugar de key a chave da stream

`/DataStream/key`

Request

(em formato JSON)

```
{
    "timestamp": valor,
    "value": valor
}
```
Response