const boxes = Array.from(document.getElementsByClassName("box"));
const playText = document.getElementById("playText");
const restartBtn = document.getElementById("restartBtn");
//           0   1   2   3   4   5   6   7   8   9
let board = ["", "", "", "", "", "", "", "", "", ""];

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer;
let playerTurn = true;

const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid var(--purple);`;
        }
        if (index % 3 === 0) {
            styleString += `border-right: 3px solid var(--purple);`;
        }
        if (index % 3 === 2) {
            styleString += `border-left: 3px solid var(--purple);`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid var(--purple);`;
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked);
    })
}

const isPosFree = (pos) => {
    return board[pos] === null;
}

const isBoardFull = () => {
    let count = 0;
    for (let i = 1; i < board.length; i++) {
        if (board[i] === null) {
            count++;
        }
    }
    if (count >= 1) {
        return false;
    } else {
        return true;
    }
}

const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const isWinner = (posit, ch) => {
    return (
        (posit[7] === ch && posit[8] === ch && posit[9] === ch) ||
        (posit[4] === ch && posit[5] === ch && posit[6] === ch) ||
        (posit[1] === ch && posit[2] === ch && posit[3] === ch) ||
        (posit[1] === ch && posit[4] === ch && posit[7] === ch) ||
        (posit[2] === ch && posit[5] === ch && posit[8] === ch) ||
        (posit[3] === ch && posit[6] === ch && posit[9] === ch) ||
        (posit[1] === ch && posit[5] === ch && posit[9] === ch) ||
        (posit[3] === ch && posit[5] === ch && posit[7] === ch)
    );
}

const compMove = () => {
    if (!playerTurn) {

        possibleMoves = [];
        for (let i = 1; i < board.length; i++) {
            if (board[i] === null) {
                possibleMoves.push(i);
            }
        }

        let move = 0;
        // for (let letter of [X_TEXT, O_TEXT]) {
        for (let letter of [O_TEXT, X_TEXT]) {
            for (let m of possibleMoves) {
                boardCopy = [];
                for (let i = 0; i < board.length; i++) {
                    boardCopy[i] = board[i];
                }
                boardCopy[m] = letter;

                if (isWinner(boardCopy, letter)) {
                    move = m;
                    return move;
                }
            }
        }

        let cornersOpen = [];
        for (let i of possibleMoves) {
            if ([1, 3, 7, 9].includes(i)) {
                cornersOpen.push(i);
            }
        }

        if (cornersOpen.length > 0) {
            move = getRandomElement(cornersOpen);
            return move;
        }

        if (possibleMoves.includes(5)) {
            move = 5;
            return move;
        }

        let edgesOpen = [];
        for (let i of possibleMoves) {
            if ([2, 4, 6, 8].includes(i)) {
                edgesOpen.push(i);
            }
        }

        if (edgesOpen.length > 0) {
            move = getRandomElement(edgesOpen);
        }
        return move;
    }
}

const boxClicked = (e) => {
    const id = e.target.id;
    // console.log(`Box ${id} was clicked.`);

    if (!board[id] && playerTurn) {
        board[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        playerTurn = false;

        if (isBoardFull() && !isWinner(board, currentPlayer)) {
            playText.innerText = `It's a Tie!`;
            playerTurn = true;
            return;
        }

        if (isWinner(board, currentPlayer)) {
            playText.innerText = `${currentPlayer} wins!!`;
            playerTurn = true;
            return;
        }

        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;

        moveReturned = compMove();
        board[moveReturned] = currentPlayer;
        // console.log(moveReturned);

        let element = document.getElementById(moveReturned);

        element.innerText = currentPlayer;
        playerTurn = true;

        if (isWinner(board, currentPlayer)) {
            playText.innerText = `${currentPlayer} wins!!`;
            playerTurn = true;
            return;
        }

        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
    // console.log(board);
}

const restart = () => {
    board.forEach((space, index) => {
        board[index] = null;
    })
    boxes.forEach((box) => {
        box.innerText = '';
    })
    playText.innerText = "Let's Play!";
    currentPlayer = X_TEXT;
}

restartBtn.addEventListener('click', restart);

restart();
drawBoard();
