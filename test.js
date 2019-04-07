const git = require("simple-git");
const moment = require("moment");
const jsonfile = require("jsonfile");
const crypto = require("crypto");
const random = require("random");

const PATH = "./gibberish.json";
const initial_date = moment().subtract(1, 'y'); 
const final_date = moment().format();

jsonfile.writeFile(PATH, {"secrete_key" : crypto.randomBytes(32).toString("hex")});

git().add(".").commit("test commit", {"--date" : initial_date.format()}).push();
console.log("Commited");
