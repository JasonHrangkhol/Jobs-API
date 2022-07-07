require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

//router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

// extra packages
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//Routes
app.get('/',(req,res)=>{
  res.send('Jobs API')
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)

const port = process.env.PORT || 3000;

const start = async () => {

  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
   }
   
};

start();
