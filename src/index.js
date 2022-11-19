// nodejs 指的是一种基于 Chrome V8 引擎的运行环境
// 是一种非阻塞 I/O

// 1. 基本用法
// console.log('stack');
// console.log(Date);
// console.log(Math);
// console.log(__filename);
// console.log(__dirname);
// console.log(document, window);
// console.log(global);
// console.log(setTimeout, setInterval, setImmediate);
// console.log(process);
// console.log(process.argv, process.platform, process.hrtime, process.cpuUsage(), process.memoryUsage());

// 2. 石头、剪刀、布游戏
// const options = process.argv;
// const pickOptions = options.slice(2);
// let rock = 'rock',
//     scissors = 'scissors',
//     paper = 'paper';
// const pick = pickOptions[0];
// function randomOptions() {
//     const randomMe = Math.random() * 3;
//     if (randomMe < 1) {
//         return rock;
//     } else if (randomMe < 2) {
//         return scissors;
//     } else {
//         return paper;
//     }
// }
// const computerPick = randomOptions();
// console.log(`电脑出示: ${computerPick}`);
// if (computerPick === pick) {
//     console.log('平局!');
// } else if ((computerPick === rock && pick === scissors) || (computerPick === scissors && pick === paper) || (computerPick === paper && pick === rock)) {
//     console.log('你输了!');
// } else {
//     console.log('你赢了!');
// }

// 3. commonjs 规范
// commonjs commonjs2
// console.log('hello');
// const gary = require('./lib');
// console.log('I love computer~');
// gary.hobby = 'computer';
// console.log('exports gary:', gary);

// 4. process 应用
// const pick = require('./lib');
// let count = 0;
// console.log('请你出示手势:');
// process.stdin.on('data', (e) => {
//     const input = e.toString().trim(),
//         result = pick(input);
//     if (result === 1) {
//         count++;
//     }
//     if (count === 3) {
//         console.log('我不玩了!你太厉害了!');
//         process.exit();
//     }
// });

// 5. npm
// const giveBook = require('./npm');
// giveBook.addListener('book', function (price) {
//     console.log(`price: ${price}`);
// });

// 6. 非阻塞 I/O callback
// 非阻塞 I/O 指的是当系统接收输入与输出之间时,依然可以处理其他输入
// try {
// interview(function (err, result) {
//     if (err) {
//         return console.log('cry');
//     }
//     console.log(result);
// });
// } catch (e) {
//     console.log(`cry: ${e}`);
// }
// function interview(callback) {
//     const random = Math.random();
//     setTimeout(() => {
//         if (random < 0.4) {
//             callback(null, 'smile');
//         } else {
//             callback(new Error('fail'));
//         }
//     }, 300);
// }

// 7. 非阻塞 I/O
// const glob = require('glob');
// console.time('glob');
// const paths = glob.sync(`${process.cwd()}/**/*`);
// console.log(paths);
// console.timeEnd('glob');
// console.log('end glob~');
// const glob = require('glob');
// console.time('glob');
// glob(`${process.cwd()}/**/*`, (err, res) => {
//     console.log(res);
// });
// console.timeEnd('glob');
// console.log('end glob~');

// 8. 非阻塞 I/O 事件循环
// class EventsLoop {
//     queue = [];
//     loop() {
//         let callback;
//         while (callback = this.queue.shift()) {
//             callback();
//         }
//         setTimeout(this.loop.bind(this), 50);
//     }
//     addEventListener(callback) {
//         return this.queue.push(callback);
//     }
// }
// const eventsLoop = new EventsLoop();
// eventsLoop.loop();
// setTimeout(() => {
//     eventsLoop.addEventListener(function () {
//         console.log('gary');
//     });
// }, 2000);
// setTimeout(() => {
//     eventsLoop.addEventListener(function () {
//         console.log('abby');
//     });
// }, 3000);

// 9. 非阻塞 I/O Promise
// interview().then(() => {
//     return interview(1);
// }).then(() => {
//     return interview(2);
// }).then(() => {
//     return interview(3);
// }).then(() => {
//     console.log('smile');
// }).catch(error => {
//     console.log(`cry: down at round ${error.round ? error.round : 0}~`);
// });
// Promise.all([interview(1), interview(2), interview(3)]).then(() => {
//     console.log('smile');
// }).catch(err => {
//     console.log(`cry: down at round ${err.round ? err.round : 0}~`);
// });
// function interview(round) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const random = Math.random();
//             if (random < 0.8) {
//                 resolve('success');
//             } else {
//                 const error = new Error('fail');
//                 error.round = round;
//                 reject(error);
//             }
//         }, 500);
//     });
// }

// 10. 非阻塞 I/O Async/Await
// async function interview(round) {
//     if (Math.random() < .8) {
//         await 'smile';
//     } else {
//         const error = new Error('fail');
//         error.round = round;
//         await Promise.reject(error);
//     }
// }
// async function getResult() {
//     await interview(1);
//     await interview(2);
//     await interview(3);
//     console.log('smile');
// }
// getResult().catch((err) => {
//     console.log(`cry: down at round ${err.round ? err.round : 0}~`);
// });

// 11. HTTP 服务器
// const http = require('http');
// const fs = require('fs');
// const server = http.createServer(function (req, res) {
//     if (req.url === '/favicon.ico') {
//         res.writeHead(200, 'OK');
//         res.end();
//         return;
//     }
//     res.writeHead(200, 'OK');
//     fs.createReadStream(`${process.cwd()}/src/index.html`).pipe(res);
// });
// server.listen(4000);

// 12. HTTP 服务器实现网页版石头剪刀布
// const {createServer} = require('http');
// const {createReadStream} = require('fs');
// const {parse} = require('url');
// const querystring = require('querystring');
//
// const game = require('./server');
//
// const PORT = 3000;
// let count = 0,
//     sameCount = 0,
//     lastPick = null;
//
// const server = createServer(function (request, response) {
//     const {pathname, query} = parse(request.url);
//
//     if (pathname === '/favicon.ico') {
//         response.writeHead(200, 'ok');
//         response.end();
//         return;
//     }
//
//     if (count >= 3) {
//         response.writeHead(500);
//         response.end('我不跟你再玩儿了!');
//         return;
//     }
//
//     if (sameCount >= 2) {
//         response.writeHead(400);
//         response.end('你作弊!');
//         count = 3;
//         return;
//     }
//
//     if (pathname === '/game') {
//         const {action} = querystring.parse(query);
//         const gameResult = game(action);
//         if (lastPick && lastPick === action) {
//             sameCount++;
//         } else {
//             sameCount = 0;
//         }
//         lastPick = action;
//
//         response.writeHead(200, 'ok');
//         if (gameResult === 0) {
//             response.end('平局!');
//         } else if (gameResult === 1) {
//             count++;
//             response.end('你赢了!');
//         } else {
//             response.end('你输了!');
//         }
//     }
//
//     if (pathname === '/') {
//         createReadStream(`${process.cwd()}/src/index.html`).pipe(response);
//     }
// });
//
// server.listen(PORT, function () {
//     console.log(`Server is running at localhost:${PORT}~`);
// });

// 13. Express 改进网页版石头剪刀布
// Express 的特性:
// 1. 强大的路由分发
// 2. 对于 http 方面有自己的一套封装,简化 http 操作,比如 302 重定向机制
// 3. 可配合多种强大的模板引擎
// const express = require('express');
// const {resolve} = require('path');
// const {readFileSync} = require('fs');
// const game = require('./server');
// const app = express();
// const PORT = 3000;
// let count = 0,
//     sameCount = 0,
//     lastPick = null;
// app.get('/favicon.ico', function (req, res) {
//     res.status(200);
//     res.send();
// });
// app.get('/game', function (req, res, next) {
//     if (count >= 3) {
//         res.status(500);
//         res.send('我再也不跟你玩儿了!');
//     }
//     next();
//     if (res.won) {
//         count++;
//     }
// }, function (req, res, next) {
//     if (sameCount >= 2) {
//         res.status(400);
//         res.send('你作弊!');
//         count = 3;
//     }
//     next();
// }, function (req, res, next) {
//     const {action} = req.query;
//     const gameResult = game(action);
//     if (lastPick && lastPick === action) {
//         sameCount++;
//     } else {
//         sameCount = 0;
//     }
//     lastPick = action;
//     res.gameResult = gameResult;
//     next();
// }, function (req, res) {
//     const {gameResult} = res;
//     setTimeout(function () {
//         res.status(200);
//         if (gameResult === 0) {
//             res.send('平局!');
//         } else if (gameResult === -1) {
//             res.send('你输了!');
//         } else {
//             res.send('你赢了!');
//             res.won = true;
//         }
//     }, 100);
// });
// app.get('/', function (req, res) {
//     res.send(readFileSync(resolve(process.cwd(), './src/index.html'), 'utf-8'));
// });
// app.listen(3000, function () {
//     console.log(`Server is running at localhost:${PORT}`);
// });

// 14. Koa 改进网页版石头剪刀布
// const Koa = require('koa');
// const {readFileSync} = require('fs');
// const path = require('path');
// const mount = require('koa-mount');
// const game = require('./server');
// const PORT = 3000;
// let count = 0,
//     sameCount = 0,
//     lastPick = null;
// const koa = new Koa();
// const gameKoa = new Koa();
// koa.use(mount('/favicon.ico', function ({response}) {
//     response.status = 200;
//     response.body = '';
// }));
// koa.use(mount('/game', gameKoa));
// koa.use(mount('/', function ({response}) {
//     response.status = 200;
//     response.body = readFileSync(path.resolve(process.cwd(), './src/index.html'), 'utf-8');
// }));
// gameKoa.use(async function (ctx, next) {
//     const {response} = ctx;
//     if (count >= 3) {
//         response.status = 500;
//         response.body = '再也不跟你玩儿了!';
//         return;
//     }
//
//     await next();
//
//     if (ctx.won) {
//         count++;
//     }
// });
// gameKoa.use(async function (ctx, next) {
//     const {response} = ctx;
//     if (sameCount >= 2) {
//         response.status = 400;
//         response.body = '你作弊!';
//         count = 3;
//         return;
//     }
//     await next();
// });
// gameKoa.use(async function (ctx, next) {
//     const {action} = ctx.request.query;
//     const gameResult = game(action);
//     if (lastPick && lastPick === action) {
//         sameCount++;
//     } else {
//         sameCount = 0;
//     }
//     lastPick = action;
//     ctx.gameResult = gameResult;
//     await next();
// });
// gameKoa.use(async function (ctx) {
//     const {response, gameResult} = ctx;
//     await new Promise(resolve => {
//         setTimeout(() => {
//             response.status = 200;
//             if (gameResult === 0) {
//                 response.body = '平局!'
//             } else if (gameResult === -1) {
//                 response.body = '你输了!';
//             } else {
//                 response.body = '你赢了!'
//                 ctx.won = true;
//             }
//             resolve();
//         }, 500);
//     });
// });
// koa.listen(3000, function () {
//     console.log(`Server is running at ${PORT}`);
// });

// 15. Buffer
// const buffer_nodejs = Buffer.from('I love nodejs~');
// const buffer_array = Buffer.from([1, 2, 3, 4]);
// const buffer_alloc = Buffer.alloc(20);
// buffer_array.writeInt16LE(12, 2);
// buffer_array.writeInt16BE(12, 2);
// buffer_alloc.writeInt32LE(512, 1);
// console.log(buffer_nodejs);
// console.log(buffer_array);
// console.log(buffer_alloc);

// 16. Socket 单工通信
// const Socket = require('net').Socket;
// const PORT = 4000;
// const socket = new Socket({});
// socket.connect({
//     host: '127.0.0.1',
//     port: PORT
// });
// socket.write(Buffer.from('I love nodejs!!!!'));

// 17. Socket 半双工通信
// const Socket = require('net').Socket;
// const PORT = 4000;
// const socket = new Socket({});
// socket.connect({
//     host: '127.0.0.1',
//     port: PORT
// });
// const lessonIds = [
//     136797,
//     136798,
//     136799,
//     136800,
//     136801,
//     136803,
//     136804,
//     136806,
//     136807,
//     136808,
//     136809,
//     141994,
//     143517,
//     143557,
//     143564,
//     143644,
//     146470,
//     146569,
//     146582
// ];
// let id = Math.floor(Math.random() * lessonIds.length);
// function encode(id) {
//     const buffer = Buffer.alloc(4);
//     buffer.writeInt32BE(lessonIds[id]);
//     return buffer;
// }
// socket.write(encode(id));
// socket.on('data', function (buffer) {
//     console.log(lessonIds[id], buffer.toString());
//     id = Math.floor(Math.random() * lessonIds.length);
//     socket.write(encode(id));
// });

// 18. Socket 全双工通信
// const Socket = require('net').Socket;
// const PORT = 4000;
// const socket = new Socket({});
// const lessonIds = [
//     136797,
//     136798,
//     136799,
//     136800,
//     136801,
//     136803,
//     136804,
//     136806,
//     136807,
//     136808,
//     136809,
//     141994,
//     143517,
//     143557,
//     143564,
//     143644,
//     146470,
//     146569,
//     146582
// ];
// socket.connect({
//     host: '127.0.0.1',
//     port: PORT
// });
// let id,
//     seq = 0;
// for (let i = 0; i < 100; i++) {
//     id = Math.floor(Math.random() * lessonIds.length);
//     socket.write(encode(id));
// }
// socket.on('data', function (buffer) {
//     const seqBuffer = buffer.slice(0, 2),
//         resultBuffer = buffer.slice(2);
//     console.log(seqBuffer.readInt16BE(), resultBuffer.toString());
//     id = Math.floor(Math.random() * lessonIds.length);
//     socket.write(encode(id));
// });
// function encode(id) {
//     const buffer = Buffer.alloc(6);
//     buffer.writeInt16BE(seq);
//     buffer.writeInt32BE(lessonIds[id], 2);
//     console.log(seq, lessonIds[id]);
//     seq++;
//     return buffer;
// }

// 19. Socket 全双工通信粘包、包不完整
// const Socket = require('net').Socket;
// const PORT = 4000;
// const socket = new Socket({});
// let oldBuffer = null;
// socket.connect({
//     host: '127.0.0.1',
//     port: PORT
// });
// const lessonIds = [
//     136797,
//     136798,
//     136799,
//     136800,
//     136801,
//     136803,
//     136804,
//     136806,
//     136807,
//     136808,
//     136809,
//     141994,
//     143517,
//     143557,
//     143564,
//     143644,
//     146470,
//     146569,
//     146582
// ];
// let id,
//     seq = 0;
// for (let i = 0; i < 100; i++) {
//     id = Math.floor(Math.random() * lessonIds.length);
//     socket.write(encode(id));
// }
// socket.on('data', function (buffer) {
//     if (oldBuffer) {
//         buffer = Buffer.concat([oldBuffer, buffer]);
//     }
//     let packageLength = 0;
//     while (packageLength = checkComplete(buffer)) {
//         const package = buffer.slice(0, packageLength);
//         buffer = buffer.slice(packageLength);
//         const {seq, data} = decode(package);
//         console.log(`包 ${seq} 获取的课程数据为: ${data}`);
//     }
//     oldBuffer = buffer;
// });
// function encode(id) {
//     const body = Buffer.alloc(4);
//     body.writeInt32BE(lessonIds[id]);
//     const header = Buffer.alloc(6);
//     header.writeInt16BE(seq);
//     header.writeInt32BE(body.length, 2);
//     console.log(`包 ${seq} 发送的课程 ID 为: ${lessonIds[id]}`);
//     seq++;
//     return Buffer.concat([header, body]);
// }
// function decode(buffer) {
//     const seqBuffer = buffer.slice(0, 2),
//         resultBuffer = buffer.slice(6);
//     const seq = seqBuffer.readInt16BE(),
//         result = resultBuffer.toString().trim();
//     return {
//         seq,
//         data: result
//     }
// }
// function checkComplete(buffer) {
//     if (buffer.length < 6) {
//         return 0;
//     }
//     const bodyLength = buffer.readInt32BE(2);
//     return 6 + bodyLength;
// }
