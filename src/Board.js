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

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  const createBoard = () => {
    let initialBoard = Array.from( { length: nrows }, () => ( 
      Array.from({ length: ncols }, () => Math.random() <= chanceLightStartsOn ? true: false)
    ));

    return initialBoard;
  }
  const [board, setBoard] = useState(createBoard());

  // Returns true if every column of every row is set to true
  const hasWon = () => {
    return board.every( (val, idx) => true === board[idx].every( bool => bool === true ) );
  }

  // flips every cell in contact with the specified coordinate
  const flipCellsAround = (y, x) => {
    setBoard(oldBoard => {
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };


      let newBoard = cloneDeep(oldBoard);

      flipCell(y, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);

      // TODO: return the copy
      return newBoard
    });
  }

  if (hasWon()) {
    return (
      <div>
        <h1>Congradulations!</h1>
      </div>
    )
  }
  return (
    <table className='gameBoard'>
      {board.map( (row, y) => (
        <tr>
          {row.map( (isLit, x) => (
            <Cell 
              flipCellsAroundMe={() => flipCellsAround(y,x)}
              isLit={isLit}
            />
          ))}  
        </tr>
      ))}
    </table>
  )
}

export default Board;
