import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);

// Only render cell when it has changed
export default React.memo(cell);