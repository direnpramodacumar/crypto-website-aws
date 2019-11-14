//Axios will handle HTTP requests to web service
const axios = require ('axios');

//Database module
import { saveData } from "./saveCryptoDatabase";

//Class that wraps cryptocompare web service
export class CryptoCompare {
    //Base URL of cryptocompare.com API
    baseURL: string = "https://min-api.cryptocompare.com/data/histohour";

    //Returns a Promise that will get the rates
    getExchangeRates(coin:String): Promise<object> {
        //Build URL for API call
        let url:string = this.baseURL;
        url += "?fsym=" + coin;
        url += "&tsym=GBP&limit=200&api_key=1a21906c85ba03e718297455d22a82befba38629cadf994ead760229549ca207";
       console.log(url)
        return axios.get(url);
    }
}

//Gets the historical data for diferents currencies 
async function getHistoricalData(cryptCoin:String,cryptName:String){

    //Create instance of cryptocompare.com class
    let cryptoCompare: CryptoCompare = new CryptoCompare();

    //Array to hold promises
    let promiseArray: Array<Promise<object>> = [];

    //Add axios promise to array
    promiseArray.push(cryptoCompare.getExchangeRates(cryptCoin));

    //Wait for all promises to execute
    try {
        let resultArray: Array<object> = await Promise.all(promiseArray);

        //Output the data 
        resultArray.forEach((result)=>{
            //data contains the body of the web service response
            let data: CryptoCompareObject = result['data'];

            //Check that API call succeeded.
            if(data.Response !='Success'){
                console.log("Error: " + JSON.stringify(data.Message));
            }
            else{
                //save data to database
                for(let i: number = 0; i<200; i++){
                    saveData(data.Data[i].time,cryptName, data.Data[i].close);
                }
            }
        }); 
    } 
    catch(error){
        console.log("Error: " + JSON.stringify(error));
    }
}

let coins = ['BTC','ETH', 'XRP', 'EOS','LTC'];
let coinsName = ['Bitcoin','Ethereum', 'Ripple', 'EOS','Litecoin'];

for(let i: number = 0; i<1; i++){
    //Call function to get data for each currency
    getHistoricalData(coins[i],coinsName[i]);
 
}

