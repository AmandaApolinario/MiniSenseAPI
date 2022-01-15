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

export const User = 
[
    {
      "id":1,
      "key":"10dd35008a0f4d838c3dc22856660928",
      "label":"sensor 001",
      "description":"Isaac's Room control",
      "streams":[
        {
          "id":1,
          "key":"b4ea3ba494644200b679ac593f55cb87",
          "label":"temperature",
          "unitId":1,
          "deviceId":1,
          "measurementCount":84
        },
        {
          "id":3,
          "key":"ae194d2b61e0496fbf601f9edcf8b0c5",
          "name":"humidity",
          "unitId":5,
          "deviceId":1,
          "measurementCount":6
        },
        {
          "id":4,
          "key":"3170f851fd9045ed99e5d86ababdb80e",
          "label":"carbon dioxide",
          "unitId":2,
          "deviceId":1,
          "measurementCount":7
        }
      ]
    },

    {
      "id":2,
      "key":"27b26e48cd674cc38ec45808cf48fa07",
      "label":"Kitchen's freezer sensor (Arduino)",
      "description":"Kitchen's freezer sensor (Arduino)",
    
    }
];

export const Stream =
[
{
    "id":2,
    "key":"27b26e48cd674cc38ec45808cf48fa07",
    "label":"Kitchen's freezer sensor (Arduino)",
    "description":"Kitchen's freezer sensor (Arduino)",
    "streams":[
      {
        "id":2,
        "key":"8961bd9a4d1e439ebf3b86af5b9d5c1f",
        "label":"temperature",
        "unitId":1,
        "deviceId":2,
        "measurementCount":19,
        "measurements":[
          {
            "timestamp":1506455591,
            "value":-6.56
          },
          {
            "timestamp":1506455566,
            "value":-6.54
          },
          {
            "timestamp":1506455551,
            "value":-6.56
          },
          {
            "timestamp":1506455530,
            "value":-6.55
          },
          {
            "timestamp":1506455510,
            "value":-6.56
          }
        ]
      }
    ]
  }];