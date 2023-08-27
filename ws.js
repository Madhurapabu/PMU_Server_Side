const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
app.use(express.json());
const wss = new WebSocket.Server({ server: server });



const cors = require('cors');
const http = require("http");

//const app = express()
//const server = http.createServer(app)
app.use(express.json());

app.use(cors())

wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');

    ws.on('message', function incoming(message) {
        //  console.log('received: %s', message);
        console.log(message)

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});

app.get('/', (req, res) => res.send('Hello World!'))


server.listen(4000, () => console.log(`Lisening on port :3000`))