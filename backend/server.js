const express = require('express')
let path = require('path')

// CONFIG APP AND DB
const app = express()

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

app.listen(process.env.PORT || 5000, console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT||5000}`))
