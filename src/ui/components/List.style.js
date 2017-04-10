import styled, { keyframes } from "styled-components";

const topValues = itemNum => 432.5 + (itemNum - 4) * 273 + "px";

const ListItemMove = (itemNum, direction) => keyframes`
  from {
    top: ${direction === "Up" ? topValues(itemNum - 1) : topValues(itemNum + 1)}
  }

  to {
    top: ${topValues(itemNum)}
  }
`;

export const ListItem = styled.div`
    position: absolute;
    top: ${({ num }) => topValues(num)};
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    
    animation:
      // Movement animation
      ${({ num, direction }) => ListItemMove(num, direction)} 300ms ease 0s 1,

      // Active Item glow
      ${({ active }) => active && ActiveItem} 500ms infinite alternate ease-in;
`;

const ActiveItem = keyframes`
    0%   {
      box-shadow: 
        0 19px 38px rgba(0,0,0,0.30),
        0 15px 12px rgba(0,0,0,0.22),
        0px 0px 22px 10px rgba(255, 0, 69, 1)
    }
    
    100% {
      box-shadow: 
        0 19px 38px rgba(0,0,0,0.30),
        0 15px 12px rgba(0,0,0,0.22),
        0px 0px 22px 10px rgba(255, 0, 69, 0.6)
    }
`;
