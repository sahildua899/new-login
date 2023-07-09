const http = require('http');
const app = require('./app');
const PORT  = process.env.PORT || 1030;
const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`Server is Running at Port ${PORT}`)
})