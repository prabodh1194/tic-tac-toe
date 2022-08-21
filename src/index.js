import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const winnerComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const Square = ({value, onClick, highlight}) => {
    return (
        <div className={`square ${highlight ? 'highlight': null}`} onClick={onClick}>
            {value}
        </div>
    );
};

const Board = (props) => {
    const [square, updateSquareState] = useState(Array(9).fill(null));
    const [xIsNext, updateX] = useState(true);
    const [winner, setWinner] = useState(false);
    const [khichdi, setKhichdi] = useState(false);
    const [highlight, setHighlight] = useState(new Set());

    useEffect(() => {
        for (let comb of winnerComb) {
            const [a, b, c] = comb;
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                setWinner(square[a]);
                setHighlight(new Set(Object.values({a, b, c})));
            }
        }

        let _khichdi = true;
        for (let el of square)
            if (!el) {
                _khichdi = false;
                break;
            }
        setKhichdi(_khichdi);
    }, [square]);

    const handleClick = (i) => {
        if (square[i] || winner)
            return;

        square[i] = xIsNext ? 'X' : 'O';

        updateSquareState([...square]);
        updateX(!xIsNext);
    };

    let squares = [];

    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            const k = 3 * i + j;
            row.push(
                <Square
                    value={square[k]} 
                    onClick={() => handleClick(k)}
                    key={k + square[k]}
                    highlight={highlight.has(k)}
                />
            );
        }

        squares.push(
            <div key={`row-${i}`} className='board-row'>{row}</div>
        );
    }

    return (
        <div>
            <div className='status'>
                {winner ? `Winner is ${winner}` : (khichdi ? 'Khichdi pak gayi' : `Next player: ${xIsNext? 'X' : 'O'}`)}
            </div>
            {squares}
        </div>
    );
}

const Game = () => (
    <Board />
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);