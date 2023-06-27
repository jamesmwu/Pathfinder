const User = require("./models/User");
const Chat = require("./models/Chat");

module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log("user connected!");
        var user = null;
        socket.on("initialize rooms", async ({ id }) => { //must be called first to initialize user!
            try{
                console.log(id);
                user = await User.findById(id);
                for(let i = 0; i< user.connections.length; i++){
                    socket.join(user.connections[i].chatId);
                }
            } catch (err){
                console.log("Initialize Room error");
                console.log(err)
            }
        });

        socket.on("private message", async ({ content, to }) => {
            socket.to(to).emit("private message", {
              content,
              from: socket.id,
            });
            const chat = await Chat.findById(to)
            await chat.updateOne({ $push: { messages: {body:content, date:Date.now, sender:user._id}}});
            chat.save()
        });

        socket.on('msg_from_client', function(from,msg){
            console.log('Message is '+from, msg);
        })
        socket.on('disconnect', function(msg){
            console.log('Disconnected');
        })
    });
};