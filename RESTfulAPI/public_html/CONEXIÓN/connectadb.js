var http = require('http');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
let error;
let user;

oracledb.getConnection (
    { 
    user: dbConfig.dbuser,
    password: dbConfig.dbpassword,
    connectString: dbConfig.connectString 
    },
    function(err, connection) 
    {
        if (err) { error = err; return; }
        connection.execute (
            "SELECT * from producto", [], 
            function(err, result) 
            {
                if (err) {cerror = err; return; }
                console.log(result);
                console.log(`Check to see if your database connection worked at  http://localhost:3050/`);
                error = null;
                connection.close(
                    function(err) {
                        if (err) { console.log(err); }
                    }
                );
            }
        )
    }
);

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text plain' });
    if (error === null) 
    {
        response.end('Connection test succeeded. You connected to ADB as ' + user + '!');
    } 
    else if (error instanceof Error) 
    {
        response.write('Connection test failed. Check the settings and redeploy app!\n');
        response.end(error.message);
    } 
    else 
    {
        response.end('Connection test pending. Refresh after a few seconds...');
    }
}).listen(3050);