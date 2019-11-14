//Import AWS
let AWS = require("aws-sdk");


//Data that we are going to send to endpoint
//REPLACE THIS WITH YOUR OWN DATA!
let endpointData = {
    "instances":
        [
            {
                "start":"2019-04-26 02:00:00",
                "target": [94.64962252531477,94.26279244000936,92.00401161418125,88.65335030848412,93.63789681774786,96.07564500499979,96.12373368852315,95.26011199841564,102.75334286512211,100.68719624978739,98.70410647049175,105.06111043791572,100.80946703873695,109.17352810987568,102.74405336058028,102.97885039343942,102.67677999758143,111.22333601914332,106.11973890673644,104.04360149719466,98.79875734774072,105.23769644209462,100.91899153266283,103.02469941046154,97.2384255688926,98.51653230887347,95.75898800761254,92.42727500401293,100.99403026733128,93.26165371101635,95.25772876022015,98.89185208766001,99.03713534266302,104.3837822951661,106.60661501634976,107.12674489802991,109.28409373429844,107.94572190295072,108.1421307767276,115.39671426406468,116.26258059212033,112.33195304985361,107.07490682263024,111.47111386247887,103.93491622526082,105.59722766165949,103.2118661218931,102.55851672849703,106.43667788232258,96.75000541276842,96.52109703248115,100.14681172956188,97.47282812229811,103.2380069987613,100.1575515023608,101.44292427581541,108.42432341600673,103.33134212256013,107.50855202783777,116.03386260583184,109.30892429915987,115.4982845687144,110.24476804524886,111.09156620300634,119.28904770493651,115.83075244172603,108.6634350338515,112.25714130451662,109.65080597469557,110.83544108959674,109.89826263928357,103.84214503550925,101.9815457847856,107.2635216299683,107.46806763525083,101.58607925682473,105.35820628352039,100.25445609525677,107.70597710372442,112.20992538744167,105.627387693269,116.20231287909446,111.38780125972632,110.17718929208844,114.09596348944845,119.15998523040945,116.30580107453184,114.47265128260197,116.46012202231145,114.3022193491687,112.2696146482443,119.60549241992547,117.16598658523783,111.44664605003904,116.70920714937937,111.62330183738466,105.97662555434553,103.78584879629724,108.25156593397968,111.30116560485416,112.69243171622189]
			}
        ],
    "configuration":
        {
            "num_samples": 50,
            "output_types":["mean","quantiles","samples"],
            "quantiles":["0.1","0.9"]
        }
};

//Name of endpoint
const endpointName = "synth-endpoint";

//Parameters for calling endpoint
let params = {
    EndpointName: endpointName,
    Body: JSON.stringify(endpointData),
    ContentType: "application/json",
    Accept: "application/json"
};

//AWS class that will query endpoint
let awsRuntime = new AWS.SageMakerRuntime({});

//Handler for Lambda function
exports.handler =  event => {
    //Call endpoint and handle response
    awsRuntime.invokeEndpoint(params, (err, data)=>{
        if (err) {//An error occurred
            console.log(err, err.stack);

            //Return error response
            const response = {
                statusCode: 500,
                body: JSON.stringify('ERROR: ' + JSON.stringify(err)),
            };
            return response;
        }
        else{//Successful response
            //Convert response data to JSON
            let responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'));
            
            let values = [];
            //Store the data in array
            responseData.predictions.forEach(pre => {
                pre.mean.forEach(pr => {
                    values.push(pr);
                })
            })
 
            //Create new DocumentClient
            let documentClient = new AWS.DynamoDB.DocumentClient();
            
            //Table name and data for table
            for (let i = 0; i < 50; i++) {
                let params = {
                    TableName: "SyntheticPredictionData",
                    Item: {
                        Time:500+i,
                        Value:values[i]
                    }
                }
                 //Store data in DynamoDB and handle errors
                documentClient.put(params, (err, data) => {
                    if (err) {
                      console.log("Unable to add item: " +  JSON.stringify(err));
                    }
                    else {
                           console.log("Prediction added to table" );
                    }

            })
            }

            //Return successful response
            const response = {
                statusCode: 200,
                body: JSON.stringify('Synthetic Predictions stored.'),
            };
            return response;
        }
    });
};

