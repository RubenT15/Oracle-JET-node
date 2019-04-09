define(['oracledb'],function(){

cns = {
    user:"ruben",
    password:"practicas",
    connectString:"10.0.2.2:1521/HRDESA"
};

function error(err,rs,cn){
    if(err){
        console.log(err.message);
        rs.contentType('application/json').status(500);
        rs.send(err.message);
        if(cn!=null) close(cn);
        return -1;
    }
else return 0;
    }

function open(sql,binds,dml){
        getConnection(cns,function(err,cn){
        if(error(err,null)==-1) return;
        cn.execute(sql,binds,{autoCommit:dml},function(err,result){
            if(error(err,cn)==-1) return "Error en la conexión";
            if(dml) return result.rowsAffected;
            else{

                return result.rows;
            }
            close(cn);
        });   
    });
}

function close(cn){
    cn.release(
            function(err){
                if(err) console.error(err.message);
            }
            );
}
});
