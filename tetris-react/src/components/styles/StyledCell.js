import styled from 'styled-components';

export const StyledCell = styled.div`
  width: auto;
  background: rgba(${props => props.color}, 0.7);
  border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
  boder-bottom-color: rgba(${props => props.color}, 0.1);
  boder-right-color: rgba(${props => props.color}, 1);
  boder-left-color: rgba(${props => props.color}, 0.3);
  boder-top-color: rgba(${props => props.color}, 1);
`