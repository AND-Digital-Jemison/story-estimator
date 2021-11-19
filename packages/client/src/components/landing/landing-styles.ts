import styled from 'styled-components';

export const Body = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');
  background-color: #2897ff;
  margin: auto;
  height: 1000px;
  padding: 100px;
  font-family: 'Poppins', sans-serif;
  color: #2897FF;
`;

export const Main = styled.div`
  background-color: #fff;
  padding: 10px 10px ;
  width: 698px;
  border-radius: 43px;
  text-align: center;
  margin: auto;
`;

export const Title = styled.h1`
  color: #2897ff;
  font-size: 48px;
  font-weight: 700;
  margin: 50px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const ValidationLabel = styled.label`
  padding-left: 10px;
  font-size: 18px;
  font-weight: 400;
  color: #FF323C;
`;

export const Input = styled.input`
  width: ${props => (props.roomcode ? '260px' : '441px')};
  height: 77px;
  font-size: 24px;
  font-weight: 600;
  color: #2897FF;
  border-radius: 10px;
  border: 2px solid #2897FF;
  padding-left: 10px;
  margin-bottom: 5px;
`;

export const PathContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.button`
  width: 200px;
  height: 83px;
  border-radius: 5px;
  background: #2897FF;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 5px 5px 8px #888888;
`;

export const JoinButton = styled(Button)`
  width: 150px;
  margin-left: 30px;
`;

export const CreateButton = styled(Button)`
  width: 233px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
`;
