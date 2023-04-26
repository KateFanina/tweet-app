import styled from 'styled-components';
import { ReactComponent as Logo } from '../../resources/logo.svg';

const UserCard = styled.div`
  background: linear-gradient(
    114.99deg,
    #471ca9 -0.99%,
    #5736a3 54.28%,
    #4b2a99 78.99%
  );
  box-shadow: -2.5777px 6.87386px 20.6216px rgba(0, 0, 0, 0.23);
  border-radius: 20px;
  height: 460px;
  margin-bottom: 16px;
  width: 380px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const AvatarData = styled.div`
  align-items: center;
  background: #ebd8ff;
  border-radius: 50%;
  box-shadow: 0 4.39163px 4.39163px rgba(0, 0, 0, 0.06),
    inset 0 -2.19582px 4.39163px #ae7be3, inset 0 4.39163px 3.29372px #fbf8ff;
  display: flex;
  height: 80px;
  justify-content: center;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
`;

const PhotoUser = styled.img`
  border-radius: 50%;
  margin-top: -46px;
  border-radius: 50%;
  box-shadow: 0 4.39163px 4.39163px rgba(0, 0, 0, 0.06),
    rgba(0, 0, 0, 0.23) -2.5777px 6.87386px 20.6216px,
    inset 0 -2.19582px 4.39163px #ae7be3, inset 0 4.39163px 3.29372px #fbf8ff;
  position: relative;
  left: 40%;
  top: 50%;
  border: 8px solid #ebd8ff;
  width: 80px;
`;

const Tweets = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: #ebd8ff;
  margin: 0;
`;

const Poster = styled.img`
  margin-top: 28px;
  margin-bottom: 18px;
  padding-left: 36px;
  padding-right: 36px;
`;

const Divide = styled.div`
  background: #ebd8ff;
  box-shadow: 0 3.43693px 3.43693px rgba(0, 0, 0, 0.06),
    inset 0 -1.71846px 3.43693px #ae7be3, inset 0 3.43693px 2.5777px #fbf8ff;
  height: 8px;
`;

const FollowButton = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  text-transform: uppercase;
  color: #373737;
  padding: 14px 28px;
  width: 196px;
  box-shadow: 0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25);
  border-radius: 10.3108px;
  cursor: pointer;
  border: none;
`;

const CardAction = styled.div`
  display: flex;
  justify-content: center;
  padding: 0;
`;
const WrapperForTweet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px 0;
`;

const LogoType = styled(Logo)`
  position: absolute;
  margin-top: 20px;
  margin-left: 20px;
`;

export {
  UserCard,
  AvatarData,
  Content,
  Poster,
  Divide,
  PhotoUser,
  Tweets,
  FollowButton,
  CardAction,
  WrapperForTweet,
  LogoType,
};
