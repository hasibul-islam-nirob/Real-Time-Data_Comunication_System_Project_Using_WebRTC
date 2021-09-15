const expressJS = require('express');
const app = expressJS();
const http = require('http');
const expressServer = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(expressServer);
const port = 4000;
const path = require('path');

app.use(expressJS.static('client/build'));
app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})


app.get('/io',function (req, res){
    res.send('Our Client Site From Server');
})


io.on('connection', function (socket){
    console.log("New user Connected");



    socket.on('disconnect',function (){
        console.log("New user Disconnected");
    })
})


expressServer.listen(port,function (){
    console.log("Server Run Success On @4000 port");
})