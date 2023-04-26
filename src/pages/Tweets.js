import { Helmet } from 'react-helmet';
import TweetList from 'components/tweetList/TweetList';

export default function Tweets() {
  return (
    <div>
      <Helmet>
        <title>Tweets</title>
      </Helmet>
      <TweetList />
    </div>
  );
}
