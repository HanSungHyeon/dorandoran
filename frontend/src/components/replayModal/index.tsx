import styled from "styled-components";
import replayImg from "@/assets/img/fairytale/replay.png";
import bookImg from "@/assets/img/fairytale/book.png";
import { useNavigate } from "react-router-dom";
import { ButtonEffect } from "@/styles/buttonEffect";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 60%);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReImgContainer = styled.img`
  margin: 5vh 10vh;
  height: 30vh;
  width: 25vh;
`;

const BookImgContainer = styled.img`
  margin: 5vh 10vh;
  height: 30vh;
  width: 40vh;
`;

const TextContainer = styled.div`
  font-size: 7.5vh;
  color: white;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${ButtonEffect}
`;

const ReplayModal = () => {
  const navigate = useNavigate();

  const goRead = () => {
    navigate("/children/read");
  };

  const goFairytale = () => {
    navigate("/children/fairytale");
  };

  return (
    <Background>
      <ContentContainer>
        <IconContainer>
          <ReImgContainer src={replayImg} onClick={goRead} />
          <TextContainer>다시 볼래요</TextContainer>
        </IconContainer>
        <IconContainer>
          <BookImgContainer src={bookImg} onClick={goFairytale} />
          <TextContainer>다른 책 볼래요</TextContainer>
        </IconContainer>
      </ContentContainer>
    </Background>
  );
};

export default ReplayModal;
