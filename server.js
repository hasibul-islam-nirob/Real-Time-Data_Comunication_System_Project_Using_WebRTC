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


let UserList = [];
io.on('connection', function (socket){
    console.log("User Join");
    // Create New User
    socket.on('NewUserCreator',function (user){
        UserList.push(user); // New User Add on UserList Array
        io.emit('NewUserJoinerAlert', user['Name']);
        io.emit('UserList',UserList);
        socket.PeerID = user['PeerID'];
    })


    socket.on('disconnect',function (){
        // Delete or Left New User
        UserList.map((list, i)=> {
            if ( socket.PeerID === list['PeerID'] ){
                UserList.splice(i, 1);
                io.emit('UserList', UserList);
                io.emit('UserLeftAlert', list['Name']);
            }
        });
        console.log("User Left");
    })
})


expressServer.listen(port,function (){
    console.log("Server Run Success On @4000 port");
})