'use strict'
var websocket;
createWebSocket();

function createWebSocket(){
	websocket = new WebSocket('ws://10.0.3.152:12345');
}
function sendMessage(){
	if(document.getElementById('chat-message').value != ""){
		websocket.send(document.getElementById('chat-message').value);
		document.getElementById('chat-message').value = "";
	}
}

websocket.onopen = function(event){
	console.log('Connexion etablie');
	websocket.send("it works !");
};
websocket.onmessage = function(event){
	console.log('Message recue: ' + event.data);
	document.getElementById('chat-room')
	document.getElementById('chat-room').value += event.data + "\n";
	document.getElementById('chat-room').scrollTop = document.getElementById('chat-room').scrollHeight;

};