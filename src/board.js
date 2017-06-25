import React from 'react';
import './index.css';
import Square from './square';

// Can I make Board into a functional component? Does it have to be aware of its state?
// It doesn't have a constructor()...
class Board extends React.Component {
// const Board = (props) => {
    renderSquare(i) {
        // console.log('i: ', i);
        return (
            <Square
                value={this.props.squares[i]}
                // will make square a controlled component
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
