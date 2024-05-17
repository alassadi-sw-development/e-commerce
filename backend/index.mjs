import express, { response } from "express";
import  { query, validationResult, body } from "express-validator";
import expressEjsLayouts from "express-ejs-layouts";
import cors from "cors";
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import {addUserToJSON, addCartToUser, getCartsByUsername, readJSONFile} from "./handleData.mjs"
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 8081;
const allowedOrigins = ['http://127.0.0.1:5500','http://127.0.0.1:5501', 'http://127.0.0.1:5502', 'http://127.0.0.1:5503'];
const __dirname = path.resolve();

app.use(session({
  secret: 'khalid the developer',
  saveUninitialized: true,
  resave:false,
  cookie:{
    maxAge: 6000 * 60
  }
}))
app.use(expressEjsLayouts)
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors({
  origin: allowedOrigins
}));
app.use(express.static("public"));
//app.use('/css', express.static(""))
const emptySignature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAABkCAYAAADOvVhlAAAAAXNSR0IArs4c6QAAAzpJREFUeF7t1MEJAAAIAzG7/9Juca+4QCHI7RwBAgQIpAJL14wRIECAwAmvJyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAg8HqAAZbdjCY4AAAAASUVORK5CYII="

const products = readJSONFile("./products.json")

app.get("/products", (request, response)=>{
  response.status(201).send(products);
});

app.patch("/update-cart", (request, response)=>{
    const cartItems = request.body.arrayData;
    console.log(request.body.arrayData);
    addCartToUser("./data.json", request.body.arrayData.username, cartItems)
});

app.get("/myCart", (request, response)=>{
  const myCart = getCartsByUsername("./data.json",request.query.username);
  if (myCart) return response.status(200).send(myCart);
  else return response.sendstatus(404);
});

app.post("/signUp", (request, response)=>{
  const jsonData = readJSONFile("./data.json")
  const username = request.body.username;
  if (jsonData.users.find(user => user.username === username)){
    return response.status(400).send({ username: 'User exists, log in instead?' });
  }

  const imageURL = request.body.signature;
  if (emptySignature == imageURL) {return response.status(400).send({ "signature-pad" : "Invalid Signature, must sign to sign up!"})}
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
  fs.writeFile(filePath, imageBuffer, err => {
    if (err) {
      console.error('Error writing file', err);
      return response.status(500).send('Failed to save image');
  }
  });

  const DataJSON = "./data.json";

  const formInputs = request.body; 
  const entries = Object.entries(formInputs);
  const newUserArr = entries.slice(0, -1);
  const newUser = Object.fromEntries(newUserArr);
  newUser.carts = [];

  addUserToJSON(DataJSON, newUser)

  return response.status(200).send({msg : "signup"})
});

app.post("/signin", (request, response)=>{
  const { body : {username,password}} = request;
  const jsonData = readJSONFile("./data.json");
  const findUser = jsonData.users.find((user)=> user.username === username);
  if(!findUser) response.status(401).send({username : "username does not exist"});
  if (findUser.password !== password) return response.status(401).send({password : "wrong password"});
  console.log(findUser);
  findUser.password= "****"
  request.session.user = findUser;
  return response.status(200).send(JSON.stringify(findUser))
})

app.get("/signin/status", (request, response) => {
  /* request.sessionStore.get(request.sessionID, (err, session) => 
  {console.log(session)}) */
  return request.session.user ? response.status(200).send( request.session.user.username) : response.status(401).send({status : "Not Authenticated"});
});



app.get('', (request, response)=>{
  response.render('index', {title : "users"})
})
app.get('/usersCarts', (request, response)=>{
  response.render('usersCarts', {title : "user's Carts"})
})

app.listen(PORT, ()=>{
  console.log(`Running on http://localhost:${PORT}`);
});

