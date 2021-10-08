const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');

const shuffle = require('shuffle-array');

let players = {};
let readyCheck = 0;
let gameState = "Initializing";

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
});

// const io = require('socket.io')(http, {
//     cors: {
//         origin: 'https://phaser3-tabletop-card-game-2021.herokuapp.com/',
//         methods: ["GET", "POST"]
//     }
// });

server.use(cors());
server.use(serveStatic(__dirname + "/client/dist"));

io.on('connection', function (socket) {
    console.log("A user connected:" + socket.id);

    players[socket.id] = {
        inDeck: [],
        inHand: [],
        isPlayerA: false
    }

    if (Object.keys(players).length < 2) {
        players[socket.id].isPlayerA = true;
        io.emit('firstTurn');
    }

    socket.on('disconnect', () => {
        console.log('A user disconnected.');

        delete players[socket.id];

        if (Object.keys(players).length === 1) {
            players[Object.keys(players)[0]].isPlayerA = true;
            io.emit('firstTurn');
        }

        console.log(players);
    })

    socket.on('dealDeck', function (socketId) {
        players[socketId].inDeck = shuffle(["boolean", "ping"]);
        console.log(players);
        if (Object.keys(players).length < 2) return;
        io.emit('changeGameState', "Initializing");
    })

    socket.on('dealCards', function (socketId) {
        for (let i = 0; i < 5; i++) {
            if (players[socketId].inDeck.length === 0) {
                players[socketId].inDeck = shuffle(["boolean", "ping"]);
            }

            players[socketId].inHand.push(players[socketId].inDeck.shift());
        }
        console.log(players);
        io.emit('dealCards', socketId, players[socketId].inHand);
        readyCheck++;
        if (readyCheck >= 2) {
            gameState = "Ready";
            io.emit('changeGameState', "Ready");
        }
    })

    socket.on('cardPlayed', function (cardName, socketId) {
        io.emit('cardPlayed', cardName, socketId);
        io.emit('changeTurn');
    })
})

const port = process.env.PORT || 3000;

console.log('port: ' + port);

http.listen(port, function () {
    console.log('Server started!');
})