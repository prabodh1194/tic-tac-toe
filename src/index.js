import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = () => (
    <div className='square'></div>
);

const Board = (props) => {
    const squares = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(<Square />)
        }

        squares.push(
            <div className='board-row'>{row}</div>
        );
    }

    return <>{squares}</>
}

const Game = () => (
    <Board />
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);