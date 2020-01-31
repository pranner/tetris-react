import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelper';

import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('YEEHAW');

  const movePlayerHorizontal = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }

  }

  const StartGame = () => {
    //Reset Game
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      //Game Over
      if (player.pos.y < 1) {
        console.log("OVER!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keystroke }) => {
    if !(gameOver) {
      if (keystroke === 37) { //left arrow on keyboard
        movePlayerHorizontal(-1);
      } else if (keystroke === 39) { //right arrow on keyboard
        movePlayerHorizontal(1)
      } else if (keystroke === 40) { //down arrow on keyboard
        dropPlayer();
      }
    }
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
              <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
              </div>
            )}
          <StartButton callback={StartGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
};

export default Tetris;