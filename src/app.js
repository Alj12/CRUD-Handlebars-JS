const express = require('express');
//{variable} si aparece entre llaves solo se escoge esa variable en específico
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');

require("dotenv").config();    

const app = express();//se inicia express
app.set('port',4000);//se elige el puerto
app.set('views',__dirname + '/views');//'views' las escoge de la carpeta /views
app.engine('.hbs',engine({//se escoge que motor de plantilla se va a usar
    extname: 'hbs'
}));

app.set('view engine', 'hbs');//se aplica el motor de pantilla escogido

//con esto se busca que el servido pueda "entender" los datos del formulario
app.use(bodyParser.urlencoded({
    extended:true
}));

//sirve para poder hacer el parse en json
app.use(bodyParser.json());

app.use(myconnection(mysql,{
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
},'single'));

app.listen(app.get('port'),()=>{//se escoge en que puerto va a estar escuchando
    console.log('Escuchando en el puerto ',app.get('port'));
});


//tasksRoutes = require('./routes/tasks');
//todas las taskRoutes deben de emnpezar por '/'
app.use('/', tasksRoutes);


app.get('/',(req,res)=>{
    res.render('home');//renderiza la plantilla del archivo home.hbs
});


//archivos estáticos, estos se usan para implementar css,script,imagenes,codigos fuente...
app.use(express.static("dist"));

