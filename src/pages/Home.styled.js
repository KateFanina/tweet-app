import styled from 'styled-components';

const Title = styled.h1`
  font-weight: 500px;
  font-size: 52px;
  text-align: center;
  color: rgb(71, 28, 169);
`;

const Container = styled.div`
  min-height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Title, Container };
