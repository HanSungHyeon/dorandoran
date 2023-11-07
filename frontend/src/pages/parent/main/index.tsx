import styled from "styled-components";
import { useState, useEffect } from "react";

import LikeBook from "@/components/likeBook";
import ProfileCircle from "@/components/profileCircle";
import ParentCard from "@/components/parentCard";
import Album from "@/components/album";
import letterEffect from "@/assets/img/gif/letter.json";
import Lottie from "lottie-react";
import LikeBookList from "@/components/likeBookList";
import letterImage from "@/assets/img/letter/letterImage.png";
import exitBtn from "@/assets/img/exitBtn.png";
import letterTest from "@/assets/img/letterTest.png";
import arrowLeft from "@/assets/img/fairytale/arrowLeft.png";
import arrowRight from "@/assets/img/fairytale/arrowRight.png";
import { useGetLetterList } from "@/apis/common/letter/Queries/useGetLetter";
import { useNavigate } from "react-router-dom";
import { profileState } from "@/states/children/info";
import { useRecoilValue } from "recoil";

import background from "@/assets/img/background/backgroundMain.jpg";

import photo from "@/assets/img/photo.png";
import tape from "@/assets/img/tape.png";
import post from "@/assets/img/post.png";

import Logo from "@/assets/img/Logo.png";
import { usePostLetterRead } from "@/apis/common/letter/Mutations/usePostLetterRead";

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: cover;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.5vh;
`;

const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10vh;
`;

const Image = styled.img`
  width: 45%;
  padding-bottom: 7vh;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 검은색 배경
  z-index: 0; // 모달보다 낮은 z-index를 가지게 하여, 모달 뒤에 위치하게 합니다.
`;

const LetterGif = styled.div<{ isLetter: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 8;
  display: ${(props) => (props.isLetter ? "block" : "none")};
`;

const BlackGround = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 25%);
  position: absolute;
  z-index: 7;
`;

const LetterImg = styled.img`
  top: 20%;
  left: 28%;
  width: 50%;
  height: 50%;
  position: absolute;
  z-index: 7;
`;

const LetterRead = styled.img`
  top: 10%;
  left: 12%;
  width: 80%;
  height: 80%;
  position: absolute;
  z-index: 8;
`;

const ArrowBox = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1%;
  z-index: 999;
`;

const ArrowLeft = styled.img`
  position: absolute;
  left: 2vh;
  width: 20vh;
`;

const ExitBtn = styled.img`
  width: 15vh;
`;

const ArrowRight = styled.img`
  position: absolute;
  right: 2vh;
  width: 20vh;
`;

const ParentMainPage = () => {
  const navigate = useNavigate();
  const profileData = useRecoilValue(profileState);
  const LetterList = useGetLetterList();
  const letterSize = LetterList.data.size;
  const letterContent = LetterList.data.letterResDtoList;
  const readLetterList = usePostLetterRead();
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [isOpenAlbum, setIsOpenAlbum] = useState(false);
  const [isOpenLikeBook, setIsOpenLikeBook] = useState(false);
  const [isLetter, setIsLetter] = useState(false);
  const [isEnvelope, setIsEnvelope] = useState(false);
  const [readLetter, setReadLetter] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isLetterPage, setIsLetterPage] = useState(0);

  const handleOpenAlbum = () => {
    setIsOpenAlbum(true);
  };

  const handleCloseAlbum = () => {
    setIsOpenAlbum(false);
  };

  const handleOpenLikeBook = () => {
    setIsOpenLikeBook(true);
  };

  const handleCloseLikeBook = () => {
    setIsOpenLikeBook(false);
  };

  const goProfile = () => {
    navigate("/parent/profile");
  };

  const goRecord = () => {
    navigate("/parent/record");
  };

  const openLetter = () => {
    setIsLetter(true);
    setIsEnvelope(true);

    setTimeout(() => {
      setIsLetter(false);
    }, 3000);
  };

  const clickLetter = () => {
    setIsEnvelope(false);
    setReadLetter(true);
  };

  const CloseLetter = () => {
    setIsLetter(false);
    setIsEnvelope(false);
    setReadLetter(false);
    readLetterList.mutateAsync();
  };

  console.log(letterContent);

  useEffect(() => {
    if (letterSize !== 0 && !flag) {
      setHasFetchedData(true);
      openLetter();
    }
    setFlag(true);
  }, [letterSize, flag, readLetterList]);

  const handleLeftClick = () => {
    if (isLetterPage > 0) {
      setIsLetterPage(isLetterPage - 1);
    }
  };

  const handleRightClick = () => {
    if (isLetterPage < letterSize) {
      setIsLetterPage(isLetterPage + 1);
    }
  };

  return (
    <>
      {(isLetter || isEnvelope || readLetter) && <BlackGround />}
      <LetterGif isLetter={isLetter}>
        {isLetter && <Lottie animationData={letterEffect} />}
      </LetterGif>
      {isEnvelope && <LetterImg src={letterImage} onClick={clickLetter} />}
      {readLetter && (
        <>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: 0,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex",
              margin: "4vh",
              zIndex: "999",
            }}
            onClick={CloseLetter}
          >
            <ExitBtn src={exitBtn}></ExitBtn>
            <p style={{ fontSize: "7vh" }}>나가기</p>
          </div>
          <LetterRead src={letterContent[isLetterPage].contentUrl} />
          <ArrowBox>
            {isLetterPage === 0 && (
              <ArrowRight src={arrowRight} onClick={handleRightClick} />
            )}
            {isLetterPage === letterSize - 1 && (
              <ArrowLeft src={arrowLeft} onClick={handleLeftClick} />
            )}
            {isLetterPage !== 0 && isLetterPage !== letterSize - 1 && (
              <>
                <ArrowLeft src={arrowLeft} onClick={handleLeftClick} />
                <ArrowRight src={arrowRight} onClick={handleRightClick} />
              </>
            )}
          </ArrowBox>
        </>
      )}
      <Container>
        <Header>
          <ProfileCircle
            onClick={goProfile}
            profileImage={profileData.animal.imgUrl}
            profileName={profileData.name}
          />
          <LikeBook onClick={handleOpenLikeBook} />
        </Header>
        <Image src={Logo} alt="Background" />
        <Content>
          <ParentCard
            img={tape}
            backgroundColor="#78BFFC"
            text="목소리 녹음"
            onClick={goRecord}
          />
          <ParentCard
            img={photo}
            backgroundColor="#FC7292"
            text="사진 보기"
            onClick={handleOpenAlbum}
          />
          <ParentCard
            img={post}
            backgroundColor="#4FCDC7"
            text="편지 쓰기"
            onClick={openLetter}
          />
        </Content>
      </Container>
      {isOpenAlbum && <Overlay onClick={handleCloseAlbum} />}
      {isOpenAlbum && <Album onClose={handleCloseAlbum} />}
      {isOpenLikeBook && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LikeBookList />
        </div>
      )}
      {isOpenLikeBook && <Overlay onClick={handleCloseLikeBook} />}
    </>
  );
};

export default ParentMainPage;
