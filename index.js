const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/public`));

const server = app.listen(4500, () => {
	console.log('App listening on port 4500');
});

const io = socket(server);

io.on('connection', socket => {
	console.log(`a user connected with ${socket.id}`);
	// step #2 Receive data from the client
	socket.on('chat', data => {
		// step #3 Send data to all connected socket
		io.sockets.emit('chat', data);
	});

	socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
	});

	// socket.on('disconnect', () => {
	// 	console.log('A user disconnected');
	// });
});
