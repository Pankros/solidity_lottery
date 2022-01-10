// compile code will go here
const path = require("path");
const fs = require("fs");
const solc = require("solc");

//process.argv.forEach(function (val, index, array) {
//    console.log(index + ': ' + val);
//  });
//const inboxPath = path.resolve(__dirname, process.argv[2]);
const fullPath = path.resolve(__dirname, "contracts", "Lottery.sol");

const source = fs.readFileSync(fullPath, "utf8");

//console.log(solc.compile(source, 1).contracts[':Lottery']);

module.exports = solc.compile(source, 1).contracts[':Lottery'];