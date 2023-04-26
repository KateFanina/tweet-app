import React from 'react';
import PropTypes from 'prop-types';
import poster from '../../resources/poster.png';

import {
  UserCard,
  PhotoUser,
  Content,
  Poster,
  Divide,
  Tweets,
  FollowButton,
  CardAction,
  WrapperForTweet,
  LogoType,
} from './TweetCard.styled';

const TweetCard = ({ toggleFollow, card }) => {
  return (
    <>
      <UserCard>
        <Content>
          <LogoType />
          <Poster src={poster} alt="sings"></Poster>
          <Divide />
          <PhotoUser alt={card.user} src={card.avatar} />
          <WrapperForTweet>
            <Tweets variant="body1" color="textSecondary" gutterBottom>
              Tweets: {card.tweets}
            </Tweets>
            <Tweets variant="body1" color="textSecondary" gutterBottom>
              Followers: {card.followers.toLocaleString('en-US')}
            </Tweets>
          </WrapperForTweet>
          <CardAction>
            <FollowButton
              style={{
                background: card.isFollowing ? '#5cd3a8' : '#ebd8ff',
              }}
              onClick={() => toggleFollow(!card.isFollowing)}
            >
              {card.isFollowing ? 'Following' : 'Follow'}
            </FollowButton>
          </CardAction>
        </Content>
      </UserCard>
    </>
  );
};

TweetCard.propTypes = {
  toggleFollow: PropTypes.func.isRequired,
  card: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    tweets: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }),
};

export default TweetCard;
