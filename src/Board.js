import React, { useState } from "react";
import * as cloneDeep from  'lodash/cloneDeep';
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       0  0  0
 *       1  1  0     (where 0 is off, and 1 is on)
 *       0  0  0
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows, ncols, chanceLightStartsOn=0.50}) => {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  const createBoard = () => {
    let initialBoard = Array.from( { length: 10 }, () => ( 
      Array.from({ length: 10 }, () => Math.random() <= chanceLightStartsOn ? true: false)
    ));

    return initialBoard;
  }

  // Returns true if every column of every row is set to true
  const hasWon = () => {
    return board.every( (val, idx) => true === board[idx].every( bool => bool === true ) );
  }
  // coord is a string in the form of 'y-x'
  const flipCellsAround = (coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = cloneDeep(oldBoard);
      // TODO: in the copy, flip this cell and the cells around it
      flipCellsAround(y, x, newBoard);
      flipCellsAround(y, x-1, newBoard);
      flipCellsAround(y, x+1, newBoard);
      flipCellsAround(y-1, x, newBoard);
      flipCellsAround(y+1, x, newBoard);

      // TODO: return the copy
      return newBoard
    });
  }

  // TODO
  // if the game is won, just show a winning msg & render nothing else

  // make table board
  if (hasWon()) {
    return (
      <div>
        <h1>Congradulations!</h1>
      </div>
    )
  }
  return (
    <div>
      <Cell />
    </div>
  )
}

export default Board;
