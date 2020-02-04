import { useState, useCallback } from 'react';

import { randomTetromino, TETROMINOS } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelper';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (tetroMatrix, direction) => {
    // Transpose the rows to be columns
    const rotatedTetro = tetroMatrix.map((_, index) => tetroMatrix.map(col => col[index]),
    );

    // Reverse each row to get a roated tetroMatrix
    if (direction > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

    const pos = clonedPlayer.pos.x;
    var offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction);
        clonedPlayer.pos.x = pos;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])
  return [player, updatePlayerPos, resetPlayer, playerRotate];
}
