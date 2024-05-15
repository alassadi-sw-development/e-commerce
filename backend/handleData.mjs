import fs from 'fs';


export function readJSONFile(filename){
    try {
      const data = fs.readFileSync(filename, 'utf8');
      return JSON.parse(data);
  } catch (error) {
      console.error('Error reading JSON file:', error);
      return null;
  }
}

export function writeJSONFile(filename, data) {
  try {
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      console.log('JSON data written to file successfully.');
  } catch (error) {
      console.error('Error writing JSON file:', error);
  }
}

export function addUserToJSON(filename, newUser) {
  const jsonData = readJSONFile(filename);
  if (jsonData) {
      jsonData.users.push(newUser);
      writeJSONFile(filename, jsonData);
  }
}

export function addCartToUser(filename, username, cartItems) {
  const jsonData = readJSONFile(filename);
  if (jsonData) {
      const user = jsonData.users.find(user => user.username === username);
      if (user) {
          user.carts.unshift(cartItems);
          writeJSONFile(filename, jsonData);
      } else {
          console.error('User not found.');
      }
  }
}

export function getCartsByUsername(filename,username) {
  const jsonData = readJSONFile(filename);
  const user = jsonData.users.find(user => user.username === username);
  if (user) {
      return user.carts;
  } else {
      return null;
  }
}