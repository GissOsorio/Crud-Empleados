const express=require('express');
const morgan=require('morgan');
const bodyParser = require('body-parser');
const app=express();

const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true
}
app.use(cors(corsOptions));

//settings
app.set('puerto',process.env.PORT|| 3000);
app.use(bodyParser.json());
app.set('nombreApp','Gestión de empleados');

app.use('/empleados',require('./routes/empleados.routes'));

app.use(morgan('dev'));


module.exports=app;