//Axios will handle HTTP requests to web service
const axios = require ('axios');

//Database module
import { saveData } from "./database_function_synthetic";

///The ID of the student's data that I will download
let studentID = 'M00657130';

//URL where student data is available
let url = 'https://m3ijbzm7a4.execute-api.us-east-1.amazonaws.com/dev/';

async function storeTweets(){
    try {
        //Get synthetic data
        let synthData = (await axios.get(url + studentID)).data.target;
        
        //Output the result
        let promiseArray: Array< Promise<any> > = [];
        for (let i = 0; i < 500; i++) {
            //Store save data promise in array
            promiseArray.push(saveData(i, synthData[i]));
        }
        //Execute all of the save data promises
        let databaseResult: Array<any> = await Promise.all(promiseArray);
        console.log("Database result: " + JSON.stringify(databaseResult));
    }
    catch(error){
        console.log("Error: " + JSON.stringify(error));
    }
}
//Call function to save synthetic data
storeTweets();