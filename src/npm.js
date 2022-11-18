// const EventEmitter = require('events').EventEmitter;
// class GeekBangBook extends EventEmitter {
//     constructor() {
//         super();
//         setInterval(() => {
//             const bookRandom = Math.random() * 100;
//             if (bookRandom < 80) {
//                 this.emit('book', bookRandom);
//             }
//         }, 500);
//     }
// }
// const giveBook = new GeekBangBook();
// module.exports = giveBook;