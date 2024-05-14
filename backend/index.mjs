import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8081;

const allowedOrigins = ['http://127.0.0.1:5500','http://127.0.0.1:5501', 'http://127.0.0.1:5502', 'http://127.0.0.1:5503'];

app.use(cors({
  origin: allowedOrigins
}));

const users = [
  {"id":1,"userName":"admin", "passWord":"admin123","firstName": "admin", "lastName":"Admin", "Street": "admin's Street" ,"city": "admin's city","PLZ": "1234","state": "admin's state"},
  {"id":2,"userName":"khalid", "passWord":"password123","firstName": "Khalid", "lastName":"Al Assadi", "Street": "khalid's Street" ,"city": "khalid's city","PLZ": "1234","state": "khalid's state"},
  {"id":3,"userName":"user1", "passWord":"password1","firstName": "John", "lastName":"Doe", "Street": "123 Main St" ,"city": "Anytown","PLZ": "5678","state": "Somestate"},
  {"id":4,"userName":"user2", "passWord":"password2","firstName": "Jane", "lastName":"Smith", "Street": "456 Elm St" ,"city": "Othertown","PLZ": "9012","state": "Anotherstate"},
  {"id":5,"userName":"user3", "passWord":"password3","firstName": "David", "lastName":"Johnson", "Street": "789 Oak St" ,"city": "Newtown","PLZ": "3456","state": "Differentstate"},
  {"id":6,"userName":"user4", "passWord":"password4","firstName": "Sarah", "lastName":"Williams", "Street": "101 Pine St" ,"city": "Smalltown","PLZ": "7890","state": "Unkownstate"},
  {"id":7,"userName":"user5", "passWord":"password5","firstName": "Michael", "lastName":"Brown", "Street": "202 Maple St" ,"city": "Largetown","PLZ": "2345","state": "Knownstate"},
  {"id":8,"userName":"user6", "passWord":"password6","firstName": "Emily", "lastName":"Jones", "Street": "303 Cedar St" ,"city": "Oldtown","PLZ": "6789","state": "Famousstate"},
  {"id":9,"userName":"user7", "passWord":"password7","firstName": "Daniel", "lastName":"Miller", "Street": "404 Walnut St" ,"city": "Moderntown","PLZ": "1234","state": "Uniquestate"},
  {"id":10,"userName":"user8", "passWord":"password8","firstName": "Jessica", "lastName":"Davis", "Street": "505 Birch St" ,"city": "Villagetown","PLZ": "5678","state": "Interestingstate"}
];

const products = [
  {
      "id": "A1",
      "image": "img/Products/Tshirt.png",
      "name": "T-Shirt",
      "rating": {
          "stars": 4.5,
          "count": 2758
      },
      "priceCents": 3299,
      "type": "clothing",
      "sizeChartLink": "img/clothing-size-chart.png"
  },
  {
      "id": "A2",
      "image": "img/Products/shirt.png",
      "name": "Shirt",
      "rating": {
          "stars": 5,
          "count": 78
      },
      "priceCents": 4599,
      "type": "clothing",
      "sizeChartLink": "img/clothing-size-chart.png"
  },
  {
      "id": "B1",
      "image": "img/Products/socks.png",
      "name": "Socks",
      "rating": {
          "stars": 1.5,
          "count": 8
      },
      "priceCents": 599
  },
  {
      "id": "B2",
      "image": "img/Products/shoes.png",
      "name": "Shoes",
      "rating": {
          "stars": 2,
          "count": 1758
      },
      "priceCents": 11999
  }
]




app.get("/", (request, response)=>{
  response.status(201).send({msg : "Hello"});
});

app.get("/users", (request, response)=>{
  response.status(201).send(users);
});

app.get("/products", (request, response)=>{
  response.status(201).send(products);
});

app.listen(PORT, ()=>{
  console.log(`Running on http://localhost:${PORT}`);
});


