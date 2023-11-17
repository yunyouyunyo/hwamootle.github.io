function postGameData(RecordID,Token,GameLevel,Status, handler){
    let url = "http://140.92.18.127/TestApiPostGameData/";
    let params ={
        RecordID: RecordID,
        Token: Token,
        GameID: "b55d927d7e5f4e7c7e4e406ecc3508bd991a77a0b6bd4f41712d4d99499ececc",
        GameLevel: GameLevel,
        Status: Status,
    } ;
    let jsonStr = JSON.stringify(params);
    let base64 = btoa(jsonStr);
    console.log(base64);
    // fetch(url+base64)
    // .then((res)=>{
    //     return res.json();
    // })
    // .then(body=>{
    //     if(handler != undefined)
    //     handler(body);
    // })
}