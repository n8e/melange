// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

// open connection
const connection = new WebSocket('ws://127.0.0.1:1337');

export default connection;
