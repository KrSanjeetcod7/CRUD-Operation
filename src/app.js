const express = require('express');
const app = express();
const Router = require('./routers/router');

const PORT = process.env.PORT || 3000;
require('./db/conn');

app.use(express.json());
app.use(Router);

app.listen(PORT, () =>{
    console.log(`Server is Setup At PORT : ${PORT}`);
});