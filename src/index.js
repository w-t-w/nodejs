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