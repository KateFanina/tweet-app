import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(NavLink)`
  display: inline-block;
  color: #ffffff;
  font-size: 26px;
  font-weight: 700;
  padding: 20px;
  text-decoration: none;
  transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
  &.active {
    color: #5cd3a8;
  }
  &:hover{
    /* color: rgb(219, 187, 252); */
    -webkit-text-stroke-color: rgb(228 190 14);
    -webkit-text-stroke-width: 1px;
  /* color: #5cd3a8; */
  }
`;
export { Link };
