import { Title, Container } from './Home.styled';

export default function Home() {
  return (
    <Container>
      <Title>
        Welcome to your tweets.app{' '}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </Title>
    </Container>
  );
}
