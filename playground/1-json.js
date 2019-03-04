const fs = require('fs');

const buffer = fs.readFileSync('1-json.json');
const strJSON = buffer.toString();
var o = JSON.parse(strJSON);
o.name = 'Denis';
o.age = 18;
o = JSON.stringify(o);
fs.writeFileSync('1-json.json', o);