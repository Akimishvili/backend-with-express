const express = require('express')
const dotenv = require('dotenv')

// Load env vars

dotenv.config({ path: './config/config.env'})

// create server
const app = express();

const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT,() => { 
    console.log(`Server is running on port ${PORT}`)
});