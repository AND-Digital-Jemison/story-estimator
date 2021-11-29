import styled from 'styled-components';

export const RoomContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');
  font-family: 'Poppins', sans-serif;
`;

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const RoomCode = styled.p`
  text-align: right;
  margin: 50px;
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

export const PointBox = styled.div`
  margin: 20px;
  border: 5px solid #2897ff;
  width: 44px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border-radius: 10px;
`;

export const CardBox = styled(PointBox)`
  height: 162px;
  width: 77px;
  font-size: 36px;
  line-height: 144px;
`;

export const CardContainer = styled.div`
  display: flex;
`;
