"use strict";
const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const dbController = require("./source/dbController");
const port = 3000;


http.createServer((req,res)=> {
    let fileName = null;
    if(req.method === "GET"){
        let pathname = url.parse(req.url).pathname;
        if(pathname === "/") {
            fileName = "index.html";
            readFile(fileName, res, req);
        }else if(pathname === "/save") {
            let params = querystring.parse(url.parse(req.url).query).text;
            console.log(params);
            dbController.save(params,(err,data)=>{
               if(err){
                   res.writeHead(500);
                   res.write('Unable to save text');
               } else{
                   res.writeHead(200);
                   res.write('Text saved');
               }
               res.end();
            });

        }else{
           // console.log(pathname);
            fileName = __dirname+pathname;
            readFile(fileName, res, req);
        }

    }else{
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end();
    }

}).listen(3000, "127.0.0.1", console.log(`server running on port : ${port}` ));

function readFile(fileName, res, req){
    fs.readFile(`${fileName}`, function (error, pgResp) {
        if (error) {
            console.log(error);
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgResp);
        }
        res.end();
    });
}