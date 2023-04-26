import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(NavLink)`
  display: inline-block;
  color: #ffffff;
  font-size: 26px;
  font-weight: 700;
  padding: 20px;
  text-decoration: none;
  &.active {
    color: #5cd3a8;
  }
`;
export { Link };
