import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Board from './board';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        console.log('i: ', i);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        console.log('history: ', history);
        console.log('current: ', current);
        console.log('squares: ', squares);

        // if winner isn't null or square isn't null (we don't want people changing a square with value)
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // squares now becomes the array which you sliced
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            // xIsNext gets flipped from whatever it was before (true/false) to the opposite (false/true)
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        console.log('history: ', history);
        const moves = history.map((step, move) => {
            console.log('step: ', step);
            console.log('move: ', move);
            const desc = move ? 'Move #' + move : 'Game start';

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
        console.log('moves: ', moves);

        let status;
        // if winner isn't null
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// SECTION: HELPER FUNCTIONS
function calculateWinner(squares) {
    console.log('squares: ', squares);
 // these are the winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {

    // what's the name of this technique?!
    const [a, b, c] = lines[i];
    // console.log('lines[i]: ', lines[i]);
    // console.log('squares[a]: ', squares[a]);
    // console.log('squares[b]: ', squares[b]);
    // console.log('squares[c]: ', squares[c]);
    // if that place in the squares array isn't empty, and you have three matching letters, you have the winner.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // return the letter that is in that place, either 'x' or 'o'
        return squares[a];
    }
  }
  // if you didn't return above, then you return 'null'
  return null;
}

// ========================================

ReactDOM.render(
    <Game/>, document.getElementById('root'));
