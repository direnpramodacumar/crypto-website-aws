let AWS = require("aws-sdk");

exports.handler = (event) => {

    //Output data to logs
    event.Records.forEach(record => {
         
        if (record.eventName == 'INSERT') {
            let twitterId =record.dynamodb.NewImage.TwitterId.N;
            let twitterText = record.dynamodb.NewImage.Text.S;
            let timestamp= record.dynamodb.NewImage.Timestamp.N;
            let twitterName =record.dynamodb.NewImage.Currency.S;
            let para= {
                LanguageCode: "en",
                Text:twitterText
            };
            
          let comprehend = new AWS.Comprehend();

            //Call comprehend to detect sentiment of text
                comprehend.detectSentiment(para, (err, data) => {
                    //Log result or error
                    if (err) {
                        console.log("\nError with call to Comprehend:\n" + JSON.stringify(err));
                    }
                    else {
                        //Create new DocumentClient
						let documentClient = new AWS.DynamoDB.DocumentClient();
						
						//Table name and data for table
						let param = {
							TableName:"SentimentTwitterData",
							Item: {
								Timestamp:Number(timestamp),
								TwitterId:Number(twitterId),
								Currency: twitterName,
								Sentiment:data.Sentiment,
								Positive:data.SentimentScore.Positive,
								Negative:data.SentimentScore.Negative,
								Neutral:data.SentimentScore.Neutral
							}
						};
						//Store data in DynamoDB and handle errors
						documentClient.put(param, (err, data) => {
    						if (err) {
    							console.log("Unable to add item: " +  JSON.stringify(err));
    						}
    						else {
    							console.log( param.Item.Currency + "Item added to table");
    						}
                        })
                    }
                })
        }
    })
}