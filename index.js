const git = require("simple-git/promise")();
const moment = require("moment");
const jsonfile = require("jsonfile");
const crypto = require("crypto");
const random = require("random");





let initial_date = moment().subtract(1, 'y'); 
const final_date = moment().format('MMMM Do YYYY');



const process = async (initial_date, final_date) => {
        jsonfile.writeFile("./gibberish.json", {"secrete_key" : crypto.randomBytes(32).toString("hex")});
        await git.add("./gibberish.json");
        await git.commit("commit by bot", {"--date" : initial_date.format()});
        await git.push(['-u', 'origin' ,'master']);
};




const commit = async (initial_date, final_date) => {
    if (initial_date.format('MMMM Do YYYY') === final_date){
        console.log("---End Process---");
        return;
    }
    else{
        for (var i = 1; i <= random.int(min = 1, max = 7); i++){
            await process(initial_date, final_date);
        }
        console.log(`Added ${i} Commits for the Date: ${initial_date.format("MMMM Do YYYY")}`);
        await commit(initial_date.add(1, 'days'), final_date);
        return;
    }
};


commit(initial_date, final_date);

