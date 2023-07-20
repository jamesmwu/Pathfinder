const emailModule = require("./email.js");
const User = require("./models/User");
const Chat = require("./models/Chat");
const { callbackPromise } = require("nodemailer/lib/shared/index.js");

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
                    console.log(user.connections[i].chatId);
                }

            } catch (err) {
                console.log("Initialize Room error");
                console.log(err);
            }
        }

        socket.on("initialize rooms", async (id, callback) => {
            await initializeRooms(id);
            callback();
        });

        socket.on("private message", async ({ content, roomId, recipientId }) => {
            console.log(`private message received: ${content}`);

            try {
                const chat = await Chat.findById(roomId);
                const recipient = await User.findById(recipientId);
                console.log(recipientId);
                const newMessage = { body: content, date: Date.now(), sender: user._id.toString() };
                const connectionIndex = recipient.connections.findIndex(connection => connection.chatId === roomId);
                if (io.sockets.adapter.rooms.get(roomId).size <= 1 && !recipient.connections[connectionIndex].newMessage) {//recipient is not in the app and new message
                    emailModule.sendNewMessageAlert(recipient.email, content, user.username);
                }
                io.sockets.in(roomId).emit('private message', newMessage, roomId);
                await chat.updateOne({ $push: { messages: newMessage } });
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
                const curUser = await User.findById(userId);
                const connectionIndex = curUser.connections.findIndex(connection => connection.chatId === roomId);
                curUser.connections[connectionIndex].newMessage = false;
                user = curUser;
                curUser.save();

            } catch (err) {
                console.log("read message Error");
                console.log(err);
            }
        });

        socket.on('process_new_connection', async ({ chatId }) => {
            console.log(`processing new connection ${chatId}`);
            io.sockets.in(chatId).emit('process_new_connection');
        });

        // socket.on('process_remove_connection', async ({ chatId }) => {
        //     console.log(`processing disconnection ${chatId}`);
        //     io.sockets.in(chatId).emit('process_remove_connection');
        // });


        socket.on('msg_from_client', function (from, msg) {
            console.log('Message is ' + from, msg);
        });
        socket.on('disconnect', function (msg) {
            console.log('Disconnected');
        });
    });
};