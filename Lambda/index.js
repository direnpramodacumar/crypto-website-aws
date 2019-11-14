//Import external library with websocket functions
let ws = require('websocket');

//Hard coded domain name and stage - use when pushing messages from server to client
let stage = "dev";
let domainName = "98n1mhhhxe.execute-api.us-east-1.amazonaws.com";

exports.handler = async (event) => {
    try {

        const msg = "";
        console.log("Domain: " + domainName + " stage: " + stage);
        
        //Get promises message to connected clients
        let sendMsgPromises = await ws.getSendMessagePromises(msg, domainName, stage);

        //Execute promises
        await Promise.all(sendMsgPromises);
    }
    catch(err){
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }

    //Success
    return { statusCode: 200, body: "Data sent successfully." };
};



