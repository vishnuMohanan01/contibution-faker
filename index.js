const git = require("simple-git");
const moment = require("moment");
const jsonfile = require("jsonfile");
const crypto = require("crypto");
const random = require("random");

const PATH = "./gibberish.json";
const initial_date = moment().subtract(1, 'y'); 
const final_date = moment().format();

while (initial_date.format() !== final_date){
    let i = 1;
    while(i <= random.int(min = i, max = 5)){
        jsonfile.writeFile(PATH, {"secreteKey" : crypto.randomBytes(32).toString("hex")})
        .then(console.log(initial_date))
        .catch(err => console.error("error occured" + err));
        git().add(".").commit("This is an idiotic commit", {"--date" : initial_date.format()}).push("origin", "master");
        i = i+1;
    }
    i = 1;
    initial_date.add(1, "d").format();
}

