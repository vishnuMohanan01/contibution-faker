const git = require("simple-git/promise")();
const moment = require("moment");
const jsonfile = require("jsonfile");
const crypto = require("crypto");
const random = require("random");


let initial_date = moment().subtract(1, 'y'); 
const final_date = moment().format('MMMM Do YYYY');



const committing = async (initial_date, final_date) => {
    if (initial_date.format('MMMM Do YYYY') === final_date){
        console.log("\n\n----End of process----");
        return;
    }
    else{
        jsonfile.writeFile("./gibberish.json", {"secrete_key" : crypto.randomBytes(32).toString("hex")});
        await git.add("./gibberish.json");
        await git.commit("commit by bot", {"--date" : initial_date.format()});
        await git.push(['-u', 'origin' ,'master']);
        console.log(`Pushing Complete for ${initial_date.format('MMMM Do YYYY')}`);
        await committing(initial_date.add(1, 'days'), final_date);
        return;
    }
};


committing(initial_date, final_date);