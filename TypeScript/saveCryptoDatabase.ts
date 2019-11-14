let AWS = require("aws-sdk");

//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint:"https://dynamodb.us-east-1.amazonaws.com"
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the name of the coin and the price with the specified timestamp. */
export function saveData(priceTimeStamp: number, coin: String, price:number): Promise<String> {
    //Table name and data for table
    let params = {
        TableName: "CryptoData",
        Item: {
            Timestamp: priceTimeStamp,
            Currency: coin,
            Price: price,
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<String> ((resolve, reject) =>{
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " +  JSON.stringify(err));
            }
            else {
                resolve("Item added to table with coin name: " + coin);
            }
        })
    });
}


