const express = require('express');
const app = express();
const userRoutes = require('./api/users');

app.use(express.json())
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
module.exports = app