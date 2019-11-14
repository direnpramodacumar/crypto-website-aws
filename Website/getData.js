//Return the crypto data and the prediction data
function getCurrencyData(data){
    let currencyData = [
        {name: "Bitcoin", x: [], y: [], p:[], pt:[]},
        {name: "Ethereum", x: [], y: [], p:[], pt:[]},
        {name: "EOS", x: [], y: [], p:[], pt:[]},
        {name: "Ripple", x: [], y: [], p:[], pt:[]},
        {name: "Litecoin", x: [], y: [], p:[], pt:[]},
    ]
    //Sort the predictions of the currencies 
    data.bitcoinPredictions.sort(function (a, b) {
        return a.Time - b.Time;
    });
    data.eosPredictions.sort(function (a, b) {
        return a.Time - b.Time;
    });
    data.ripplePredictions.sort(function (a, b) {
        return a.Time - b.Time;
    });
    data.ethereumPredictions.sort(function (a, b) {
        return a.Time - b.Time;
    });
    data.litecoinPredictions.sort(function (a, b) {
        return a.Time - b.Time;
    });
  
    //Get bitcoin data
    data.bitcoin.forEach(currency => {
        let formattedDate = new Date(currency.Timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
        currencyData[0].x.push(formattedDate);
        currencyData[0].y.push(currency.Price); 
    });
    //Get predictions of the bitcoin 
    data.bitcoinPredictions.forEach(currency => {
        let hoursDate= new Date("2019-03-25 12:00:00");
        currencyData[0].p.push(currency.Value);
        currencyData[0].pt.push(hoursDate.setHours( hoursDate.getHours() + currency.Time)); 
    });
    //Get ethereum data
    data.ethereum.forEach(currency => {
        let formattedDate = new Date(currency.Timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
        currencyData[1].x.push(formattedDate);
        currencyData[1].y.push(currency.Price);
     
    });
    //Get predictions of the ethereum 
    data.ethereumPredictions.forEach(currency => {
        let hoursDate= new Date("2019-03-25 12:00:00");
        currencyData[1].p.push(currency.Value);
        currencyData[1].pt.push(hoursDate.setHours( hoursDate.getHours() + currency.Time)); 
    });
    //Get eos data
    data.eos.forEach(currency => {
        let formattedDate = new Date(currency.Timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
        currencyData[2].x.push(formattedDate);
        currencyData[2].y.push(currency.Price);
       
    });
    //Get predictions of the eos 
    data.eosPredictions.forEach(currency => {
        let hoursDate= new Date("2019-03-25 12:00:00");
        currencyData[2].p.push(currency.Value);
        currencyData[2].pt.push(hoursDate.setHours( hoursDate.getHours() + currency.Time)); 
    });
    //Get ripple data
    data.ripple.forEach(currency => {
        let formattedDate = new Date(currency.Timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
        currencyData[3].x.push(formattedDate);
        currencyData[3].y.push(currency.Price);
        
    });
    //Get predictions of the ripple 
    data.ripplePredictions.forEach(currency => {
        let hoursDate= new Date("2019-03-25 12:00:00");
        currencyData[3].p.push(currency.Value);
        currencyData[3].pt.push(hoursDate.setHours( hoursDate.getHours() + currency.Time)); 
    });
    //Get litecoin data
    data.litecoin.forEach(currency => {
        let formattedDate = new Date(currency.Timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');
        currencyData[4].x.push(formattedDate);
        currencyData[4].y.push(currency.Price);
     
    });
    //Get predictions of the litecoin 
    data.litecoinPredictions.forEach(currency => {
        let hoursDate= new Date("2019-03-25 12:00:00");
        currencyData[4].p.push(currency.Value);
        currencyData[4].pt.push(hoursDate.setHours( hoursDate.getHours() + currency.Time)); 
    });
    
    //sort the dates of all currencies
    currencyData.forEach(currency => {
        currency.x.sort();
    });

    
    return currencyData;
}
//Return the sentiment data of all currencies 
 function getSentimentData(data){
    let sentimentData = [
        {name: "Bitcoin",s:[]},
        {name: "Ethereum",s:[]},
        {name: "EOS",s:[]},
        {name: "Ripple",s:[]},
        {name: "Litecoin",s:[]},
    ]
     
    //Get bitcoin sentiment data
    data.bitcoinSentiment.forEach(sentiment => {  
        sentimentData[0].s.push(sentiment.Sentiment);
        
    });

    //Get ethereum sentiment data
    data.ethereumSentiment.forEach(sentiment => {
        sentimentData[1].s.push(sentiment.Sentiment);

    });
    //Get eos sentiment data
    data.eosSentiment.forEach(sentiment => {
        sentimentData[2].s.push(sentiment.Sentiment);

    });
    //Get ripple sentiment data
    data.rippleSentiment.forEach(sentiment => {
        sentimentData[3].s.push(sentiment.Sentiment);

    });
    //Get litecoin sentiment data
    data.litecoinSentiment.forEach(sentiment => {
        sentimentData[4].s.push(sentiment.Sentiment);

    });

    return sentimentData;

}
//Return the synthetic data
function getSyntheticData(data){
    let synthData = [{name: "Synthetic",x: [], y: [], p:[], pt:[]}];

    //Sort synthetic date
    data.synthetic.sort(function (a, b) {
        return a.Time - b.Time;
    });
    //Sort prediction synthetic date
    data.syntheticPredictions.sort(function (a, b) {
        return a.Time - b.Time;
    });

    //Get synthetic data
    data.synthetic.forEach(synth => {
        synthData.forEach(synthdat => {
            synthdat.x.push(synth.Time);
            synthdat.y.push(synth.Value);
        });
    });
    //Get Prediction of the synthetic data
    data.syntheticPredictions.forEach(synth => {
        synthData.forEach(synthdat => {
            synthdat.pt.push(synth.Time);
            synthdat.p.push(synth.Value);
        });   
    });
    
return synthData
}

