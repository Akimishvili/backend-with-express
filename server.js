const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

// logger package
const morgan = require('morgan')
// import middleware
const logger = require('./middlewares/loggerMiddleware')
const errorHandler = require('./middlewares/errorMiddleware')

// route files
const authRoutes = require('./routes/authRoutes')
// Load env vars

dotenv.config({ path: './config/config.env'})

// database connection
const connectDB = require('./config/db')
connectDB()


// create server
const app = express();

// set body parser
app.use(express.json())

// set cookie parser
app.use(cookieParser())

// mount middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/auth', authRoutes)


// mount middleware
app.use(errorHandler)

// sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet())

// prevent xss attacks
app.use(xss())

// rate limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// prevent http param pollution
app.use(hpp())

// enable cors access headers
app.use(cors()); 


// check port value
const PORT = process.env.PORT || 3000;

// run server
const server = app.listen(PORT,() => { 
    console.log(`Server is running on port ${PORT}`)
});

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server and exit process 
    server.close(() => process.exit(1));
})