function game(pick) {
    const rock = 'rock',
        paper = 'paper',
        scissors = 'scissors',
        computerRandom = Math.random() * 3;
    let computerPick;

    if (computerRandom < 1) {
        computerPick = rock;
    } else if (computerRandom < 2) {
        computerPick = scissors;
    } else {
        computerPick = paper;
    }

    if (pick === computerPick) {
        return 0;
    } else if ((pick === rock && computerPick === paper) || (pick === scissors && computerPick === rock) || (pick === paper && computerPick === scissors)) {
        return -1;
    } else {
        return 1;
    }
}

module.exports = game;