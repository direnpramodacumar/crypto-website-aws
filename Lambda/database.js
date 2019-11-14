let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "WebSocketClients"
    };
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "WebSocketClients",
        Key: {
            ConnectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};
/*******************************************/
//Returns bitcoin sentiment
module.exports.getSentimentBitcoin = async () => {
    let params = {
        TableName: "SentimentTwitterData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:30,
        ExpressionAttributeValues: {
            ":curr" : "Bitcoin"
        }
    }
    return documentClient.query(params).promise();
};

//Returns ethereum sentiment
module.exports.getSentimentEthereum = async () => {
    let params = {
        TableName: "SentimentTwitterData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:30,
        ExpressionAttributeValues: {
            ":curr" : "Ethereum"
        }
    }
    return documentClient.query(params).promise();
};

//Returns eos sentiment
module.exports.getSentimentEOS = async () => {
    let params = {
        TableName: "SentimentTwitterData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:30,
        ExpressionAttributeValues: {
            ":curr" : "EOS"
        }
    }
    return documentClient.query(params).promise();
};

//Returns rippple sentiment
module.exports.getSentimentRipple = async () => {
    let params = {
        TableName: "SentimentTwitterData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:30,
        ExpressionAttributeValues: {
            ":curr" : "Ripple"
        }
    }
    return documentClient.query(params).promise();
};

//Returns litecoin sentiment
module.exports.getSentimentLitecoin = async () => {
    let params = {
       TableName: "SentimentTwitterData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:30,
        ExpressionAttributeValues: {
            ":curr" : "Litecoin"
        }
    }
    return documentClient.query(params).promise();
};

/******************************************/
//Returns bitcoin data
module.exports.getBitcoin = async () => {
    let params = {
        TableName: "CryptoData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:200,
        ExpressionAttributeValues: {
            ":curr" : "Bitcoin"
        }
    }
    return documentClient.query(params).promise();
};

//Returns eos data
module.exports.getEOS = async () => {
    let params = {
        TableName: "CryptoData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:200,
        ExpressionAttributeValues: {
            ":curr" : "EOS"
        }
    }
    return documentClient.query(params).promise();
};

//Returns litecoin data
module.exports.getLitecoin = async () => {
    let params = {
        TableName: "CryptoData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:200,
        ExpressionAttributeValues: {
            ":curr" : "Litecoin"
        }
    }
    return documentClient.query(params).promise();
};

//Returns ripple data
module.exports.getRipple = async () => {
    let params = {
       TableName: "CryptoData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:200,
        ExpressionAttributeValues: {
            ":curr" : "Ripple"
        }
    }
    return documentClient.query(params).promise();
};

//Returns ethereum data
module.exports.getEthereum = async () => {
    let params = {
        TableName: "CryptoData",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:200,
        ExpressionAttributeValues: {
            ":curr" : "Ethereum"
        }
    }
    return documentClient.query(params).promise();
};

/******************************************/
//Returns synthetic data
module.exports.getSyntheticData = async () => {
    let params = {
        TableName: "SyntheticData"
    };
    return documentClient.scan(params).promise();
};

//Returns prediction of the synthetic data
module.exports.getSyntheticPredictionsData = async () => {
    let params = {
        TableName: "SyntheticPredictionData"
    };
    return documentClient.scan(params).promise();
};

/******************************************/
//Returns prediction of the bitcoin data
module.exports.getBitcoinPredictionsData = async () => {
     let params = {
        TableName: "CryptoDataPredictions",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:40,
        ExpressionAttributeValues: {
            ":curr" : "Bitcoin"
        }
    }
    return documentClient.query(params).promise();
};

//Returns prediction of the litecoin data
module.exports.getLitecoinPredictionsData = async () => {
     let params = {
        TableName: "CryptoDataPredictions",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:40,
        ExpressionAttributeValues: {
            ":curr" : "Litecoin"
        }
    }
    return documentClient.query(params).promise();
};

//Returns prediction of the eos data
module.exports.getEOSPredictionsData = async () => {
     let params = {
        TableName: "CryptoDataPredictions",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:40,
        ExpressionAttributeValues: {
            ":curr" : "EOS"
        }
    }
    return documentClient.query(params).promise();
};

//Returns prediction of the ethereum data
module.exports.getEtheriumPredictionsData = async () => {
     let params = {
        TableName: "CryptoDataPredictions",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:40,
        ExpressionAttributeValues: {
            ":curr" : "Etherium"
        }
    }
    return documentClient.query(params).promise();
};

//Returns prediction of the ripple data
module.exports.getRipplePredictionsData = async () => {
     let params = {
        TableName: "CryptoDataPredictions",
        IndexName: "Currency-index",
        KeyConditionExpression: "Currency = :curr",
        Limit:40,
        ExpressionAttributeValues: {
            ":curr" : "Ripple"
        }
    }
    return documentClient.query(params).promise();
};