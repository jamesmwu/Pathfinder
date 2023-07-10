const User = require("./models/User");
const Chat = require("./models/Chat");

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log("user connected!");
        var user = null;
        var userId;
        initializeRooms(socket.handshake.query.userId);

        async function initializeRooms(id) {
            try {
                userId = id;
                console.log(`initialize rooms for: ${id}`);
                user = await User.findById(id);
                for (let i = 0; i < user.connections.length; i++) {
                    socket.join(user.connections[i].chatId);
                }

            } catch (err) {
                console.log("Initialize Room error");
                console.log(err);
            }
        }

        socket.on("initialize rooms", async ({ id }) => {
            initializeRooms(id);
        });

        socket.on("private message", async ({ content, roomId, recipientId }) => {
            console.log(`private message received: ${content}`);

            try {
                const chat = await Chat.findById(roomId);
                const recipient = await User.findById(recipientId);
                const newMessage = { body: content, date: Date.now(), sender: user._id.toString() };
                // if(io.sockets.adapter.rooms.get(chatId).size<=1){//recipient is not in the app 

                // }
                io.sockets.in(roomId).emit('private message', newMessage, roomId);
                await chat.updateOne({ $push: { messages: newMessage } });
                const connectionIndex = recipient.connections.findIndex(connection => connection.chatId === roomId);
                recipient.connections[connectionIndex].newMessage = true;
                chat.save();
                recipient.save();

            } catch (err) {
                console.log("Private Message Error");
                console.log(err);
            }
        });

        socket.on("read message", async ({ roomId }) => {
            console.log(`message read`);
            try {
                const connectionIndex = user.connections.findIndex(connection => connection.chatId === roomId);
                user.connections[connectionIndex].newMessage = false;
                user.save();
                user = await User.findById(userId);
            } catch (err) {
                console.log("read message Error");
                console.log(err);
            }
        });


        socket.on('msg_from_client', function (from, msg) {
            console.log('Message is ' + from, msg);
        });
        socket.on('disconnect', function (msg) {
            console.log('Disconnected');
        });
    });
};