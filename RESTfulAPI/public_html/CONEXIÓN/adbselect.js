var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

oracledb.getConnection (
    {
        user: dbConfig.dbuser,
        password: dbConfig.dbpassword,
        connectString: dbConfig.connectString
    },
    function(err, connection) 
    {
        if (err) 
        {
            console.error(err.message);
            return;
        }
    
        connection.execute (
            'SELECT CUST_ID, CUST_FIRST_NAME, CUST_LAST_NAME FROM sh.customers WHERE CUST_ID = 5993',
            {},
            { outFormat: oracledb.OBJECT },                 
            function(err, result) 
            {
                if (err) 
                {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log('We are specifically looking for customer ID 5992');
                console.log(result.rows);
                doRelease(connection);
            }
        );
    }
);

function doRelease (connection) 
{
    connection.close (
        function(err) 
        {
            if (err) 
            {
                console.error(err.message);
            } 
        }
    );
}