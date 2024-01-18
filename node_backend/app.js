const express =require('express');
const products=require('./routes/productRoute');
const errorMiddleware =require('./middleware/error');

const app =express();


app.use(express.json())

//route imports
app.use('/api/v1',products)

//middleware for error handling

app.use(errorMiddleware)



module.exports =app