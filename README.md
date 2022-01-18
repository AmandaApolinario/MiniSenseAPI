# RESTFul API MiniSense

Esta API tem como objetivo auxiliar as operações que o usuário é capaz de desempenhar no produto. É possível cadastras usuários, registrar dispositivos e vincular novas streams a estes. Além disso, pode-se visualizar todas as informações adicionadas para fácil controle de dados por meio de mensagens em JSON.

Foi utilizado para a implementação TypeScript com nodeJS, e Express.

# Como foi modelado

O projeto foi modelado com base no diagrama fornecido. No arquivo 'products.ts' foram criadas classes para os usuários(User), unidades de medida(MeasurementUnit), dispositivos(SensorDevice), streams(DataStream) e medições das streams(Measurements). Com os POST requests podemos enviar dados em JSON para criar novos objetos e adicioná-los aos respectivos vetores desejados.

O projeto tem como base um vetor de usuários, quando criamos um novo usuário adicionamos o nome de usuário e email, posteriormente é possível criar um vetor de disposivos, adicionar streams a ele e, por fim, publicar medições nas streams. O acesso a qualquer objeto, com exceção do usuário cujo acesso é feito pelo username, é feito por meio das keys, únicas para cada tipo de objeto.

As unidades de medida já foram adicionadas, então não é necessário que sejam cadastradas inicialmente, é possível visualizar todas por meio de um GET request.

Já as outras informações que foram adicionadas manualmente também podem ser visualizadas com GET requests, cada uma com endpoints específicos para os dados desejados. Todas as informações detalhadas de como os GET e POST requests funcionam estão abaixo na seção Endpoints. 


## Executar a API

port: localhost:3000

para rodar o aplicativo, utilize o comando:
```
npm run dev
```

# Endpoints

## GET

### **Consultar unidades de medida**
`/MeasurementUnit`

*Response*

200 - Sucesso

```
[
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
]
```


<br>

### **Consultar dispositivos do usuário**
`/SensorDevice/(username)`

*Response*

200 - Sucesso

404 - Usuário não encontrado

<br>

### **Consultar dispositivo específico com sua chave**


`/SensorDevice/(username)/(key do dispositivo)`

*Response*

200 - Sucesso

404 - Sensor device não encontrado

404 - Usuário não encontrado

<br>

### **Consultar dados de um stream específico com sua chave**

`/Stream/(username)/(key da stream)`

*Response*

200 - Sucesso

404 - Sensor device não encontrado

404 - Stream não encontrada

<br>

## POST

Substitua os parentesis nos requests pelas informações desejadas. Os requests são adicionados no body, caso esteja utilizando postman pode-se escrever os dados selecionando a opção raw e o formato de texto JSON no body.

### **Registrar um novo usuário**
`/User`

*Request*

```
{
    "username": "(nome do usuário)",
    "email": "(email do usuário)"
}
```

*Response*

200 - Sucesso

```
{
  "username": "username",
  "email": "email"
}
```

<br>

### **Registrar um novo dispositivo**
`/SensorDevice/(username)`

*Request*
```
{
    "label": "(label do dispositivo)",
    "description": "(descrição do dispositivo)"
}
```

*Response*

200 - Sucesso
```
{
  "id": 1,
  "key": "1",
  "label": "label",
  "description": "description"
}
```

404 - Dispositivo não encontrado

<br>

### **Registrar stream para um dispositivo**
`/DataStream/(username)/SensorDevice/(key do dispositivo) `

*Request*
```
{
  "label": "(label da stream)",
  "unitId": (id da unidade de medida)
}
```

*Response*

200 - Sucesso

```
{
  "id": 1,
  "key": "1",
  "label": "label",
  "unitId": 1,
  "deviceId": 1,
  "measurementCount": 0
}
```

404 - Sensor device não encontrado

404 - Usuario não encontrado

<br>

### **Publicar medição em uma stream**

`/DataStream/(user)/(key dispositivo)/(key stream)`

*Request*

```
{
    "timestamp": (valor do timestamp),
    "value": (valor)
}
```
*Response*

200 - Sucesso

```
{
  "id": 1,
  "timestamp": 1111,
  "value": 11.1,
  "unitId": 1
}
```

404 - Stream não encontrado

404 - Sensor device não encontrado

<br>

## Exemplo de utilização

Para ilustrar a utilização aqui terá um simples exemplo de como utilizar a API

1. `POST localhost:3000/User`

*Request*
```
{
  "username": "amanda",
  "email":"amanda@gmail.com"
}
```

*Response*

```
{
  "username": "amanda",
  "email": "amanda@gmail.com"
}
```

2. `POST localhost:3000/SensorDevice/amanda`

*Request*
```
{
  "label": "label",
  "description": "description"
}
```

*Response*

```
{
  "id": 1,
  "key": "1",
  "label": "label",
  "description": "description"
}
```

3. `POST localhost:3000/DataStream/amanda/SensorDevice/1`

*Request*
```
{
  "label": "label",
  "unitId": 1
}
``` 
*Response*

```
{
  "id": 1,
  "key": "1",
  "label": "label",
  "unitId": 1,
  "deviceId": 1,
  "measurementCount": 0
}
```

4. `POST localhost:3000/DataStream/amanda/1/1`

*Request*
```
{
  "timestamp": 12345,
  "value": 15.5
}
```

*Response*

```
{
  "id": 1,
  "timestamp": 12345,
  "value": 15.5,
  "unitId": 1
}
```

5. `GET localhost:3000/MeasurementUnit`

*Response*

```
[
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
]
```

6. `GET localhost:3000/SensorDevice/amanda`

*Response*

```
[
    {
        "streams": [
            {
                "measurements": [
                    {
                        "timestamp": 12345,
                        "value": 15.5
                    }
                ],
                "id": 1,
                "key": "1",
                "label": "label",
                "unitId": 1,
                "deviceId": 1,
                "measurementCount": 1
            }
        ],
        "id": 1,
        "key": "1",
        "label": "label",
        "description": "description"
    }
]
```

7. `GET localhost:3000/SensorDevice/amanda/1`

*Response*

```
{
    "id": 1,
    "key": "1",
    "label": "label",
    "description": "description"
}
```

8. `GET localhost:3000/Stream/amanda/1`

*Response*

```
{
    "id": 1,
    "key": "1",
    "label": "label",
    "unitId": 1,
    "deviceId": 1,
    "measurementCount": 1
}
```
