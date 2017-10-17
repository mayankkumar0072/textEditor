'use strict';

const DB = require("./config/db-conf");

class DBController{

    save(param, callback){
        DB.TextCol.find({"uid":"text"}).forEach(function(e, i){
               console.log(e);
               if(e.text){
                   e.text= e.text+param;
               }else {
                   e["text"]= param;
               }
               DB.TextCol.save(e,callback);
            }
        )
    }
}


module.exports = new DBController();
