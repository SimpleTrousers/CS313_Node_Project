var http = require('http');

http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {

    console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        req.on('end', function () {
            console.log("Body: " + body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('post received');
    }
    else if (req.method == 'GET')
    {
        console.log("GET");
        //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
        var html = fs.readFileSync('test.txt');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
    else
    {
       console.log("No method found");
    }

});

port = 8080;
host = 'localhost';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
