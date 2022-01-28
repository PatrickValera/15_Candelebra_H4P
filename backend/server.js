const express = require('express')
const cors = require('cors')
let path = require('path')
const http = require('http')
const {Server} = require('socket.io')
const dotenv = require('dotenv')
const connectDb = require('./config/dataBase.js')

//ROUTE IMPORTS
const userRoutes = require('./routes/userRoutes.js')
const stockRoutes = require('./routes/stockRoutes.js')
const transactionRoutes = require('./routes/transactionRoutes.js')

// EXPRESS AND SOCKETIO IO
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on('connection', (socket) => {
    console.log('connected')
})
// EXPRESS CONFIG
dotenv.config()
connectDb(io)
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors());


//EXPRESS ROUTES
app.use('/api/users',userRoutes)
app.use('/api/stock',stockRoutes)
app.use('/api/transaction',transactionRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../','frontend', 'build', 'index.html'))
    })
} else {
    app.get('/api', (req, res) => {
        res.send("api")
    })
}


server.listen(process.env.PORT || 5000, console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT||5000}`))
