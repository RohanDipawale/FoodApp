const express  = require('express')
const colors = require("colors")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDb = require('./config/db')


//dot env confrigation
dotenv.config();

//connection
connectDb();

// rest object
const app = express()

//middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/test', require("./routes/testRoute"));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/restaurent', require("./routes/restaurentRoutes"));
app.use('/api/v1/category', require("./routes/categoryRoute"));
app.use('/api/v1/food', require("./routes/foodRouted"));

//route
app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.white.bgMagenta);
});