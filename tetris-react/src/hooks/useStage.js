import { useState, useEffect } from 'react';
import { createStage } from '../gameHelper';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  useEffect(() => {
    const updateStage = prevStage => {
      // Have to clear stage before updating
      const newStage = prevStage.map(row =>
        // Use for loop for improved perfomance
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );

      // Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      return newStage;
    };

    setStage(prev => updateStage(prev))
  }, [player]);
  return [stage, useStage];
}