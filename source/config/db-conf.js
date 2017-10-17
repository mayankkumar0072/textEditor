
"use strict";
/**
 * MongoDb database configuration
 */
const MongoClient = require('mongodb').MongoClient;
const DBURL = `mongodb://127.0.0.1/textdb`;


class MongoConnection{

    constructor(DBURL){
        this.getConnection(DBURL,(err, database)=>{
            if(err){
                console.error("-------MongoConnection error-------");
                throw err;
            }else{
                console.log("-------MongoConnected successfully-------");
                this.initCollection(database);
            }
        });
    }

    getConnection(url, callback){
        MongoClient.connect(url,(err, database)=> {
            if (err){
                console.log(err);
                callback(err, null)
            }else{
                callback(null, database)
            }
        });
    }

    initCollection(database){
        console.log("-------Initializing Mongo collections-------");
        this.TextCol = database.collection("text");
        this.save = this.TextCol.insert({"uid":"text"});

        console.log("-------Initialized Mongo collections-------");
    }
}


module.exports = new MongoConnection(DBURL);
