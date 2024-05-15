import express, { query } from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

// import handle data Functions
import {addUserToJSON, addCartToUser, getCartsByUsername} from "./handleData.mjs"

const app = express();
const PORT = process.env.PORT || 8081;
const allowedOrigins = ['http://127.0.0.1:5500','http://127.0.0.1:5501', 'http://127.0.0.1:5502', 'http://127.0.0.1:5503'];
const __dirname = path.resolve();
console.log(__dirname);

app.use(bodyParser.json());
app.use(cors({
  origin: allowedOrigins
}));

const users = [
  {"id":1,"username":"admin", "password":"admin123","firstName": "admin", "lastName":"Admin", "Street": "admin's Street" ,"city": "admin's city","PLZ": "1234","state": "admin's state"},
  {"id":2,"username":"khalid", "password":"password123","firstName": "Khalid", "lastName":"Al Assadi", "Street": "khalid's Street" ,"city": "khalid's city","PLZ": "1234","state": "khalid's state"},
  {"id":3,"username":"user1", "password":"password1","firstName": "John", "lastName":"Doe", "Street": "123 Main St" ,"city": "Anytown","PLZ": "5678","state": "Somestate"},
  {"id":4,"username":"user2", "password":"password2","firstName": "Jane", "lastName":"Smith", "Street": "456 Elm St" ,"city": "Othertown","PLZ": "9012","state": "Anotherstate"},
  {"id":5,"username":"user3", "password":"password3","firstName": "David", "lastName":"Johnson", "Street": "789 Oak St" ,"city": "Newtown","PLZ": "3456","state": "Differentstate"},
  {"id":6,"username":"user4", "password":"password4","firstName": "Sarah", "lastName":"Williams", "Street": "101 Pine St" ,"city": "Smalltown","PLZ": "7890","state": "Unkownstate"},
  {"id":7,"username":"user5", "password":"password5","firstName": "Michael", "lastName":"Brown", "Street": "202 Maple St" ,"city": "Largetown","PLZ": "2345","state": "Knownstate"},
  {"id":8,"username":"user6", "password":"password6","firstName": "Emily", "lastName":"Jones", "Street": "303 Cedar St" ,"city": "Oldtown","PLZ": "6789","state": "Famousstate"},
  {"id":9,"username":"user7", "password":"password7","firstName": "Daniel", "lastName":"Miller", "Street": "404 Walnut St" ,"city": "Moderntown","PLZ": "1234","state": "Uniquestate"},
  {"id":10,"username":"user8", "password":"password8","firstName": "Jessica", "lastName":"Davis", "Street": "505 Birch St" ,"city": "Villagetown","PLZ": "5678","state": "Interestingstate"}
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
];
let orders = [];

app.get("/", (request, response)=>{
  response.status(201).send({msg : "Hello"});
});

app.get("/users", (request, response)=>{
  console.log(request.query);
  const {query: {filter,value}} = request;
  if(!filter && !value) return response.status(201).send(users);
  if (filter && value) {
    return response.send(users.filter((user) => user[filter].includes(value)));
  }
  return response.status(201).send(users);
});

app.get("/users/:id", (request, response)=>{
  console.log(request.params);
  const parsedId =parseInt(request.params.id);
  console.log(parsedId);
  if(isNaN(parsedId)){ return response.status(400).send({msg: "Bad request"})}

  const findUser = users.find((user)=> user.id === parsedId);

  if(!findUser) { return response.sendstatus(404)};
  return response.send(findUser)
})

app.get("/products", (request, response)=>{
  response.status(201).send(products);
});

app.patch("/update-cart", (request, response)=>{
    const cartItems = request.body.arrayData;
    console.log(cartItems);
    addCartToUser("./data.json", "kalassad564", cartItems)
});
app.get("/myCart", (request, response)=>{
  const myCart = getCartsByUsername("./data.json","kalassad564");
  if (myCart) return response.status(200).send(myCart);
  else return response.sendstatus(404);
});

app.post("/signUp", (request, response)=>{

  const username = request.body.username;
  console.log();
  if (users.find(user => user.username === username)){
    return response.status(400).send({ username: 'User exists, log in instead?' });
  }else {
    console.log("you are good to go");
  }
  const imageURL = request.body.signature;
  const matches = imageURL.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return response.status(400).send('Invalid input string');
  }

  const imageBuffer = Buffer.from(matches[2], 'base64');
  const fileType = matches[1];
  const fileName = `signature_${username}.${fileType}`;
  const uploadDir = path.join(__dirname, 'signatures');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, fileName);
  console.log(filePath);
  fs.writeFile(filePath, imageBuffer, err => {
    if (err) {
      console.error('Error writing file', err);
      return response.status(500).send('Failed to save image');
  }
  });

  const DataJSON = "./data.json";

  const formInputs = request.body; // Assuming request.body contains the form data
  const entries = Object.entries(formInputs);
  const newUserArr = entries.slice(0, -1); // Exclude the last entry (signature)
  const newUser = Object.fromEntries(newUserArr);
  newUser.carts = [];
  console.log(newUser);

  addUserToJSON(DataJSON, newUser)
  
  addCartToUser(DataJSON, username, cartItems)


  return response.send({msg : "signup"})
});

app.post("/signin", (request, response)=>{
  console.log(request.body);
  return response.send({msg : "signin"})
})

app.listen(PORT, ()=>{
  console.log(`Running on http://localhost:${PORT}`);
});