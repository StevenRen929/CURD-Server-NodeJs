const bcrypt = require('bcrypt');

const password = 'abc123';

//12 is the round of hash,higher need more time to decrypt
const hashed = bcrypt.hashSync(password,12);
console.log(hashed);