const socket = io();

const message = document.querySelector('#message');
const handle = document.querySelector('#handle');
const btn = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

btn.addEventListener('click', () => {
	// step #1 sending data to the server with emit
	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
	});
	handle.value = '';
	message.value = '';
});

message.addEventListener('keypress', () => {
	socket.emit('typing', handle.value);
});

// step #4 Receive back data from the server
socket.on('chat', data => {
	feedback.innerHTML = '';
	output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}<p>`;
});

socket.on('typing', data => {
	feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});
