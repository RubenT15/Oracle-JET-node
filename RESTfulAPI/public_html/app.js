var express= require("express");
var cors=require("cors");
var bodyParser=require("body-parser");
var methodOverride = require("method-override");
const fileUpload = require('express-fileupload');
var dao = require("./dao");
const dateformat = require("dateformat");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(fileUpload());

var router=express.Router();

router.get('/data',function(request,response){
    var opc=parseInt(request.query.opc);
    switch(opc){
        case 1:
            sql="SELECT cod,nombre,pu,fecfab FROM producto";
            console.log(sql);
            dao.open(sql,[],false,response);
            break;
        case 2:
            sql="Select nombre,avatar,titulo,telefono,correo FROM EMPLEADOS";
            dao.open(sql,[],false,response);
            break;
        default:
            response.contentType('application/json').status(200);
            response.send(JSON.stringify("Opcion no valida."));
            
    }
    response.end;
});
router.post('/insertar',function(request,response){
            console.log(request.body);
            sql="INSERT INTO producto(nombre,pu,fecfab) "
                    +"VALUES (:nombre,:pu,TO_DATE(:fecfab,'DDMMYYYY'))";
            var nombre=request.body.nombre;
            var pu=parseFloat(request.body.pu);
            var fecha=new Date(request.body.fecfab);
            var fecfab=dateformat(fecha,"ddmmyyyy");
            console.log(fecfab);
            console.log(sql);
            dao.open(sql,[nombre,pu,fecfab],true,response);
            response.end;
    });
    router.post('/registrar',function(request,response){
            
            sql="INSERT INTO EMPLEADOS(nombre,titulo,telefono,correo,avatar) "
                    +"VALUES (:nombre,:titulo,:tlf,:correo,:avatar)";
            var nombre=request.body.nombre;
            var titulo=request.body.titulo;
            var tlf=parseInt(request.body.tlf);
            var correo=request.body.correo;

            var ruta=null;
            console.log(request.files);
            if(request.files){
            let file=request.files.file;
            ruta='images/'+file.name.replace(/ /g, "");
            file.mv(ruta, function(err) {
                if (err)
                  return response.status(500).send(err);
              });
        }
            console.log(ruta);
            dao.open(sql,[nombre,titulo,tlf,correo,ruta],true,response);
            response.end;
    });

app.use(router);
app.listen(3000,function(){
    console.log("Servidor Web");
});
