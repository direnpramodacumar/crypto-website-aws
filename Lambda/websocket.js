let AWS = require("aws-sdk");

// Add ApiGatewayManagementApi to the AWS namespace
require('aws-sdk/clients/apigatewaymanagementapi');

//Import functions for database
let db = require('database');

module.exports.getSendMessagePromises = async (message, domainName, stage) => {
    //Get connection IDs of clients
    let clientIdArray = (await db.getConnectionIds()).Items;
    
    //Get Bitcoin data
    let bitcoinArray = (await db.getBitcoin()).Items;
    //Get EOS data
    let eosArray = (await db.getEOS()).Items;
    //Get Ethereum data
    let ethereumArray = (await db.getEthereum()).Items;
   //Get Ripple data
    let rippleArray = (await db.getRipple()).Items;
    //Get Litecoin data
    let litecoinArray = (await db.getLitecoin()).Items;
    
    //Get bitcoin sentiment data
    let bitcoinSentimentArray= (await db.getSentimentBitcoin()).Items;
    //Get ethereum sentiment data
    let ethereumSentimentArray= (await db.getSentimentEthereum()).Items;
    //Get ripple sentiment data
    let rippleSentimentArray= (await db.getSentimentRipple()).Items;
    //Get litecoin sentiment data
    let litecoinSentimentArray= (await db.getSentimentLitecoin()).Items;
    //Get eos sentiment data
    let eosSentimentArray= (await db.getSentimentEOS()).Items;
    
    //Get synthetic data
    let syntheticArray= (await db.getSyntheticData()).Items;
    //Get predictions of the synthetic data
    let syntheticPredictionsArray= (await db.getSyntheticPredictionsData()).Items;
    
    //Get predictions of the bitcoin data
    let bitcoinPredictionsArray= (await db.getBitcoinPredictionsData()).Items;
    //Get predictions of the ethereum data
    let ethereumPredictionsArray= (await db.getEtheriumPredictionsData()).Items;
    //Get predictions of the ripple data
    let ripplePredictionsArray= (await db.getRipplePredictionsData()).Items;
    //Get predictions of the eos data
    let eosPredictionsArray= (await db.getEOSPredictionsData()).Items;
    //Get predictions of the litecoin data
    let litecoinPredictionsArray= (await db.getLitecoinPredictionsData()).Items;
     
    
    let dbData={
        bitcoin: bitcoinArray,
        eos: eosArray,
        ethereum: ethereumArray,
        ripple: rippleArray,
        litecoin: litecoinArray,
        bitcoinSentiment: bitcoinSentimentArray,
        ethereumSentiment: ethereumSentimentArray,
        rippleSentiment: rippleSentimentArray,
        litecoinSentiment: litecoinSentimentArray,
        eosSentiment: eosSentimentArray,
        synthetic: syntheticArray,
        syntheticPredictions:syntheticPredictionsArray,
        bitcoinPredictions: bitcoinPredictionsArray,
        ethereumPredictions: ethereumPredictionsArray,
        ripplePredictions: ripplePredictionsArray,
        litecoinPredictions: litecoinPredictionsArray,
        eosPredictions: eosPredictionsArray,
        
    };
    
    //Create API Gateway management class.
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: domainName + '/' + stage
    });

    //Try to send message to connected clients
    let msgPromiseArray = clientIdArray.map( async item => {
        try{
            console.log("Sending message '" + message + "' to: " + item.ConnectionId);

            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: item.ConnectionId,
                Data: JSON.stringify(dbData)
            };

            //Wait for API Gateway to execute and log result
            await apigwManagementApi.postToConnection(apiMsg).promise();
            console.log("Message '" + message + "' sent to: " + item.ConnectionId);
        }
        catch(err){
            console.log("Failed to send message to: " + item.ConnectionId);

            //Delete connection ID from database
            if(err.statusCode == 410) {
                try {
                    await db.deleteConnectionId(item.ConnectionId);
                }
                catch (err) {
                    console.log("ERROR deleting connectionId: " + JSON.stringify(err));
                    throw err;
                }
            }
            else{
                console.log("UNKNOWN ERROR: " + JSON.stringify(err));
                throw err;
            }
        }
    });

    return msgPromiseArray;
};


