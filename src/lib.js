// exports.name = 'Gary';
// exports.age = 29;
// console.log(`I'm ${exports.name},${exports.age} year's old~`);
// exports.move = function () {
//     console.log(`I will go to HangZhou~`);
// };
// console.log(`exports`, exports);
// module.exports = function () {
//     console.log(`exports`, exports);
// };
// module.exports = function (pick) {
//     const rock = 'rock',
//         scissors = 'scissors',
//         paper = 'paper';
//     function randomOptions() {
//         const computerOptions = Math.random() * 3;
//         if (computerOptions < 1) {
//             return rock;
//         } else if (computerOptions < 2) {
//             return scissors;
//         } else {
//             return paper;
//         }
//     }
//     const computer = randomOptions();
//     console.log(`电脑选择: ${computer}`);
//     if (computer === pick) {
//         console.log('平局!');
//         return 0;
//     } else if ((pick === rock && computer === scissors) || (pick === paper && computer === rock) || (pick === scissors && computer === paper)) {
//         console.log('你赢了!');
//         return 1;
//     } else {
//         console.log('你输了!');
//         return -1;
//     }
// }