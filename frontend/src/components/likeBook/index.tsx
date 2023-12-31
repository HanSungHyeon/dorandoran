import styled from "styled-components";
import likeBook from "@/assets/img/likeBook.png";
import { ButtonEffect } from "@/styles/buttonEffect";

const Container = styled.div`
  padding: 1.2vh;
  margin: 2vh;
  background-color: #fff;
  border-radius: 10vh;
  width: 9vh;
  height: 9vh;

  ${ButtonEffect}
`;

const StyledImage = styled.img`
  width: 6vh;
`;

const LikeBook = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Container onClick={onClick}>
      <StyledImage src={likeBook} alt="Background" />
    </Container>
  );
};

export default LikeBook;
