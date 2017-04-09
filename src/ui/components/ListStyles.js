import styled, { keyframes } from 'styled-components';

const topValues = [
    '-406.5px',
    '-113.5px',
    '159.5px',
    '432.5px',
    '705.5px',
    '978.5px',
    '1251.5px'
]
const ListItemMove = (itemNum, direction) => keyframes`
  from {
    top: ${direction === 'Up' ? topValues[itemNum - 1] : topValues[itemNum + 1]}
  }

  to {
    top: ${topValues[itemNum]}
  }
`;

export const ListItem = styled.div`
    position: absolute;
    top: ${props => topValues[props.num]};
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    animation: ${props => ListItemMove(props.num, props.direction)} 300ms ease 0s 1;
`;
