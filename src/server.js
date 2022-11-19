// function game(pick) {
//     const rock = 'rock',
//         paper = 'paper',
//         scissors = 'scissors',
//         computerRandom = Math.random() * 3;
//     let computerPick;
//
//     if (computerRandom < 1) {
//         computerPick = rock;
//     } else if (computerRandom < 2) {
//         computerPick = scissors;
//     } else {
//         computerPick = paper;
//     }
//
//     if (pick === computerPick) {
//         return 0;
//     } else if ((pick === rock && computerPick === paper) || (pick === scissors && computerPick === rock) || (pick === paper && computerPick === scissors)) {
//         return -1;
//     } else {
//         return 1;
//     }
// }
// module.exports = game;

// Socket 单工通信
// const net = require('net');
// const PORT = 4000;
// const server = net.createServer(function (socket) {
//     socket.on('data', function (buffer) {
//         console.log(buffer, buffer.toString().trim());
//     });
// });
// server.listen(PORT);

// Socket 半双工通信
// const net = require('net');
// const PORT = 4000;
// const server = net.createServer(function (socket) {
//     socket.on('data', function (buffer) {
//         setTimeout(() => {
//             socket.write(Buffer.from(data[buffer.readInt32BE()]));
//         }, 1000);
//     });
// });
// server.listen(PORT);
// const data = {
//     136797: "01 | 课程介绍",
//     136798: "02 | 内容综述",
//     136799: "03 | Node.js是什么？",
//     136800: "04 | Node.js可以用来做什么？",
//     136801: "05 | 课程实战项目介绍",
//     136803: "06 | 什么是技术预研？",
//     136804: "07 | Node.js开发环境安装",
//     136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
//     136807: "09 | 模块：CommonJS规范",
//     136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
//     136809: "11 | 模块：npm",
//     141994: "12 | 模块：Node.js内置模块",
//     143517: "13 | 异步：非阻塞I/O",
//     143557: "14 | 异步：异步编程之callback",
//     143564: "15 | 异步：事件循环",
//     143644: "16 | 异步：异步编程之Promise",
//     146470: "17 | 异步：异步编程之async/await",
//     146569: "18 | HTTP：什么是HTTP服务器？",
//     146582: "19 | HTTP：简单实现一个HTTP服务器"
// };

// Socket 全双工通信
// const net = require('net');
// const PORT = 4000;
// const server = net.createServer(function (socket) {
//     socket.on('data', function (buffer) {
//         const seqBuffer = buffer.slice(0, 2),
//             idBuffer = buffer.readInt32BE(2);
//         setTimeout(() => {
//             socket.write(Buffer.concat([seqBuffer, Buffer.from(data[idBuffer])]));
//         }, 10 + Math.random() * 1000);
//     });
// });
// server.listen(PORT);
// const data = {
//     136797: "01 | 课程介绍",
//     136798: "02 | 内容综述",
//     136799: "03 | Node.js是什么？",
//     136800: "04 | Node.js可以用来做什么？",
//     136801: "05 | 课程实战项目介绍",
//     136803: "06 | 什么是技术预研？",
//     136804: "07 | Node.js开发环境安装",
//     136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
//     136807: "09 | 模块：CommonJS规范",
//     136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
//     136809: "11 | 模块：npm",
//     141994: "12 | 模块：Node.js内置模块",
//     143517: "13 | 异步：非阻塞I/O",
//     143557: "14 | 异步：异步编程之callback",
//     143564: "15 | 异步：事件循环",
//     143644: "16 | 异步：异步编程之Promise",
//     146470: "17 | 异步：异步编程之async/await",
//     146569: "18 | HTTP：什么是HTTP服务器？",
//     146582: "19 | HTTP：简单实现一个HTTP服务器"
// };

// Socket 全双工通信粘包、包不完整
// const net = require('net');
// const PORT = 4000;
// const server = net.createServer(function (socket) {
//     let oldBuffer = null;
//     socket.on('data', function (buffer) {
//         if (oldBuffer) {
//             buffer = Buffer.concat([oldBuffer, buffer]);
//         }
//         let packageLength = 0;
//         while (packageLength = checkComplete(buffer)) {
//             const package = buffer.slice(0, packageLength);
//             buffer = buffer.slice(packageLength);
//             const {seq, data} = decode(package);
//             socket.write(encode(data, seq));
//         }
//         oldBuffer = buffer;
//     });
// });
// function decode(buffer) {
//     const seqBuffer = buffer.slice(0, 2),
//         idBuffer = buffer.slice(6);
//     const seq = seqBuffer.readInt16BE(),
//         id = idBuffer.readInt32BE();
//     return {
//         seq,
//         data: data[id]
//     }
// }
// function encode(data, seq) {
//     const body = Buffer.from(data);
//     const header = Buffer.alloc(6);
//     header.writeInt16BE(seq);
//     header.writeInt32BE(body.length, 2);
//     return Buffer.concat([header, body]);
// }
// function checkComplete(buffer) {
//     if (buffer.length < 6) {
//         return 0;
//     }
//     const bodyLength = buffer.readInt32BE(2);
//     return 6 + bodyLength;
// }
// server.listen(PORT, function () {
//     console.log(`Socket Server is running at ${PORT}~`);
// });
// const data = {
//     136797: "01 | 课程介绍",
//     136798: "02 | 内容综述",
//     136799: "03 | Node.js是什么？",
//     136800: "04 | Node.js可以用来做什么？",
//     136801: "05 | 课程实战项目介绍",
//     136803: "06 | 什么是技术预研？",
//     136804: "07 | Node.js开发环境安装",
//     136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
//     136807: "09 | 模块：CommonJS规范",
//     136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
//     136809: "11 | 模块：npm",
//     141994: "12 | 模块：Node.js内置模块",
//     143517: "13 | 异步：非阻塞I/O",
//     143557: "14 | 异步：异步编程之callback",
//     143564: "15 | 异步：事件循环",
//     143644: "16 | 异步：异步编程之Promise",
//     146470: "17 | 异步：异步编程之async/await",
//     146569: "18 | HTTP：什么是HTTP服务器？",
//     146582: "19 | HTTP：简单实现一个HTTP服务器"
// };