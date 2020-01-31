import React, { useState } from 'react';
import { createStage } from '../gameHelper';

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

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });

  }

  const StartGame = () => {
    //Reset Game
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })

  }

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keystroke }) => {
    if !(gameOver) {
      if (keystroke === 37) { //left arrow on keyboard
        movePlayer(-1);
      } else if (keystroke === 39) { //right arrow on keyboard
        movePlayer(1)
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