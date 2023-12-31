import React, { useState, useEffect } from "react";
import styled from "styled-components";
import momRead from "@/assets/img/momRead.png";
import FatherRead from "@/assets/img/FatherRead.png";
import { FaCheck } from "react-icons/fa"; // Import the check icon from React Icons
import { useGetReadCheck } from "@/apis/children/fairytale/Queries/useReadCheck";
import exitBtn from "@/assets/img/exitBtn.png";
import { ButtonEffect } from "@/styles/buttonEffect";
import { useSoundEffect } from "@/components/sounds/soundEffect";
import { useNavigate } from "react-router-dom";

const Container = styled.div<{ selectedOption: string }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.selectedOption === "엄마"
      ? "#d3a6ae"
      : props.selectedOption === "아빠"
      ? "#509b49"
      : "#757599"};
  z-index: 99;
  transition: background-color 0.5s;
`;

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const H2 = styled.h2`
  margin: 5vh 0 3vh 0;
  color: #fff;
  font-size: 10vh;
  font-weight: 300;
`;

const RadioButtonsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const CustomRadioInput = styled.input`
  display: none;
`;

const RadioBtn = styled.span`
  margin: 10px;
  width: 50vh;
  height: 63vh;
  border: 3px solid transparent;
  display: inline-block;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  text-align: center;
  box-shadow: 0 0 20px #c3c3c367;
  cursor: pointer;
`;

const RadioBtnIcon = styled(FaCheck)`
  color: #ffffff;
  background-color: #ffdae9;
  font-size: 20px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%) scale(2);
  border-radius: 50px;
  padding: 3px;
  transition: 0.5s;
  pointer-events: none;
  opacity: 0;
`;

const HobbiesIcon = styled.div`
  padding: 3vh;
`;

const HobbiesIconImage = styled.img<{ isGray: boolean }>`
  width: 100%;
  border-radius: 2vh;
  margin-bottom: 20px;
  filter: ${(props) => (props.isGray ? "grayscale(100%)" : "none")};
`;

const HobbiesIconText = styled.h3`
  color: #757599;
  font-size: 10vh;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CustomRadio = styled.label`
  position: relative;

  ${CustomRadioInput}:checked + ${RadioBtn} {
    border: 2px solid #ffdae9;
  }

  ${CustomRadioInput}:checked + ${RadioBtn} ${RadioBtnIcon} {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
`;

const CloseButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4vh;
  cursor: pointer;
  ${ButtonEffect}
`;

const ExitBtn = styled.img`
  width: 30vh;
`;

interface GenderModalProps {
  onGenderSelected: (selectedOption: string) => void;
  type?: string;
}

const GenderModal = ({ onGenderSelected, type }: GenderModalProps) => {
  const ReadCheck = useGetReadCheck();
  const genderBoolean = ReadCheck.data;
  const [isOption, setIsOption] = useState([
    { value: "엄마", image: momRead, visible: true },
    { value: "아빠", image: FatherRead, visible: true },
  ]);

  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    onGenderSelected(event.target.value);

    // Close the modal after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (type === "children") {
      setIsOption([
        { value: "엄마", image: momRead, visible: genderBoolean.femaleAble },
        { value: "아빠", image: FatherRead, visible: genderBoolean.maleAble },
      ]);
    } else {
      setIsOption([
        { value: "엄마", image: momRead, visible: true },
        { value: "아빠", image: FatherRead, visible: true },
      ]);
    }
  }, [genderBoolean.femaleAble, genderBoolean.maleAble, type]);

  const goMain = () => {
    playSound();
    navigate("/children/main");
  };

  return (
    <>
      {isModalOpen && (
        <Container selectedOption={selectedOption}>
          <MainContainer>
            {genderBoolean.femaleAble ||
            genderBoolean.maleAble ||
            type === "parent" ? (
              <H2>누가 동화책을 읽어줄까요?</H2>
            ) : (
              <H2>부모님 목소리를 담아주세요</H2>
            )}
            <RadioButtonsContainer>
              {genderBoolean.femaleAble ||
              genderBoolean.maleAble ||
              type === "parent" ? (
                isOption.map(
                  (option) =>
                    option.visible && (
                      <CustomRadio key={option.value}>
                        <CustomRadioInput
                          type="radio"
                          name="radio"
                          value={option.value}
                          checked={selectedOption === option.value}
                          onChange={handleRadioChange}
                          disabled={Boolean(selectedOption)}
                        />
                        <RadioBtn>
                          <RadioBtnIcon size={50} color="#ffffff" />
                          <HobbiesIcon>
                            <HobbiesIconImage
                              src={option.image}
                              alt={option.value}
                              isGray={selectedOption !== option.value}
                            />
                            <HobbiesIconText>{option.value}</HobbiesIconText>
                          </HobbiesIcon>
                        </RadioBtn>
                      </CustomRadio>
                    )
                )
              ) : (
                <CloseButton onClick={goMain}>
                  <ExitBtn src={exitBtn}></ExitBtn>
                  <p
                    style={{
                      fontSize: "10vh",
                      marginTop: "2vh",
                      color: "#f25222",
                      textShadow: "2px 4px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    돌아가기
                  </p>
                </CloseButton>
              )}
            </RadioButtonsContainer>
          </MainContainer>
        </Container>
      )}
    </>
  );
};

export default GenderModal;
