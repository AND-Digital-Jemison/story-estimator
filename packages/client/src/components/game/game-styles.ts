import styled from 'styled-components';
import { Button } from '~/components/landing/landing-styles';

export const RoomContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&family=Roboto:wght@300&display=swap');
  font-family: 'Poppins', sans-serif;
`;

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const RoomCode = styled.p`
  font-family: 'Roboto', sans-serif;
  text-align: right;
  margin: 50px 50px 10px 10px;
  font-size: 24px;
  font-weight: 100;
`;

export const Title = styled.h1`
  color: #2897ff;
  font-size: 48px;
  font-weight: 700;
  margin: 30px;
  text-align: center;
`;

export const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const ResultBox = styled.div`
  margin: 20px;
  border: 3px solid #2897ff;
  width: 44px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border-radius: 10px;
`;

export const CardBox = styled(ResultBox)`
  height: 120px;
  width: 77px;
  font-size: 36px;
  font-weight: 300;
  margin: 20px 40px;
  line-height: 120px;
  border: 3px solid #2897ff;
  box-shadow: 0px 4px 5px #888888;
  background: ${props =>
    props.hasVoted && !props.isRevealed ? '#2897FF' : 'none'};
`;

export const PointBox = styled(CardBox)`
  margin: 10px 20px;
  border: 3px solid ${props => props.borderColor};
  cursor: pointer;
  transform: ${props =>
    props.num === props.clickedNum ? 'translateY(-50px)' : '0'};
`;

export const VoteCount = styled.div`
  display: flex;
  justify-content: end;
  transform: translateY(40px);
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 600;
    background: ${props =>
      props.voteCount ? (props.isMostVoted ? 'red' : '#2897ff') : '#0000'};
    color: #fff;
  }
`;
export const CardContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

export const PlayerCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Name = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
`;

export const GameButton = styled(Button)`
  background: ${props => (props.disabled ? '#cfd4dd' : '#ff323c')};
  color: ${props => (props.disabled ? '#313131' : '#fffff')};
  width: 139px;
  height: 76px;
  margin-top: 35px;
  margin-bottom: 100px;
`;
