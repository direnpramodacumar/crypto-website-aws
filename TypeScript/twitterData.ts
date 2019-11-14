//Time library that we will use to increment dates.
const moment = require('moment');

//Module that reads keys from .env file
const dotenv = require('dotenv');

//Node Twitter library
const Twitter = require('twitter'); 

//Database module
import { saveData} from "./saveTwitterDatabase";

//Copy variables in file into environment variables
dotenv.config();

//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//Function downloads and outputs tweet text
async function storeTweets(keyword: String){
    try{
        //Set up parameters for the search
        let searchParams = {
            q: keyword,
            count: 21,
            lang: "en"
        };
        //Wait for search to execute asynchronously
        let twitterResult = await client.get('search/tweets', searchParams);

        //Output the result
        let promiseArray: Array< Promise<any> > = [];
        twitterResult.statuses.forEach((tweet)=>{
            //Store save data promise in array
            promiseArray.push(saveData(moment(tweet.created_at).valueOf(),tweet.id,keyword,tweet.text));

        });

        //Execute all of the save data promises
        let databaseResult: Array<any> = await Promise.all(promiseArray);
        console.log("Database result: " + JSON.stringify(databaseResult));
    }
    catch(error){ 
        console.log(JSON.stringify(error));
    }
};

let coinsName = ['Bitcoin','Ethereum', 'Ripple', 'EOS','Litecoin'];
for(let i: number = 0; i<5; i++){
    //Call function to search for tweets with currency name
        storeTweets(coinsName[0]);  
}