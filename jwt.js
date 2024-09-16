const jwt = require('jsonwebtoken');

const payload = {
    id : 123,
    name: 'John Doe'
}

const secret = 'secret';

//access token ->15 mins, 
//refresh token ->7d,30 days,365 days.. 
const token = jwt.sign(payload,secret,{expiresIn:'1d'});
console.log(token);


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MTIzNCwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzI2NDAyMzUxLCJleHAiOjE3MjY0ODg3NTF9FVtzOlJwM1vegQ4kFmZEbzt4
const tokenBeenModify = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6MTIzNCwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzI2NDAyMzUxLCJleHAiOjE3MjY0ODg3NTF9FVtzOlJwM1vegQ4kFmZEbzt4';
try{
const payload = jwt.verify(tokenBeenModify,secret); //it throw error, therefore we need to add try catch
console.log(payload);
}catch(e){
console.log(e);
}
