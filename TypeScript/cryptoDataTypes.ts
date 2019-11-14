interface  CryptoCompareRates{
    time: number,
    high: number,
    low:number,
    open:number,
    volumefrom: number,
    volumeto: number,
    close: number,
}

//The data structure returned in the message body by cryptocompare
interface CryptoCompareObject {
    Response: String,
    Message?:String,
    Type: number,
    Aggregated: boolean,
    Data:[CryptoCompareRates],
}



