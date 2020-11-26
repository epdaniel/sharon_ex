const http = require('http')
const fs = require("fs")

   

http.createServer(function(req, response) {  
    if(req.url === "/"){
        fs.readFile('./src/index.html', function (err, html) {
            if (err) {
                throw err; 
            } 
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        }); 
    }else if(req.url === '/get'){
        fs.readFile('./file1.txt', function (err, file) {
            if (err) {
                throw err; 
            } 
            response.writeHeader(200, {"Content-Type": "text/html", "Content-disposition": 'attachment; filename=file1.txt'});  
            response.write(file);  
            response.end();  
        });
    }else {
        fs.readFile('./src/404.html', function (err, html) {
            if (err) {
                throw err; 
            } 
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
        });   
    }
}).listen(9090);
