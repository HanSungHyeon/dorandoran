import React, { useState } from "react";
import styled from "styled-components";
import { usePostMessage } from "@/apis/parents/profile/Mutations/usePostMessage";
import { usePostAlarmMessage } from "@/apis/parents/record/Mutations/usePostAlarmMessage";
import { useNavigate } from "react-router-dom";
import { ButtonEffect } from "@/styles/buttonEffect";
import { useSoundEffect } from "@/components/sounds/soundEffect";

interface ModalProps {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  bgColor: string;
  buttonColor: string;
  showInput?: boolean;
  onClose: () => void;
  onNameChange?: (name: string) => void;
  onButtonClick?: () => void;
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor || "#fc7292"};
  width: 100vh;
  padding: 4vh;
  border-radius: 2vh;
  position: relative;
`;

const Title = styled.h1`
  font-size: 8vh;
  color: #fff;
  margin: 1vh 0;
`;

const Subtitle = styled.p`
  width: 100%;
  line-height: 8vh;
  font-size: 4vh;
  color: #fff;
  margin: 3vh 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 3vh;
  width: 70%;
  border: none;
  border-radius: 1vh;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  font-size: 4vh;
  font-family: "Katuri";
`;

const Button = styled.div`
  padding: 2.5vh 3.5vh;
  background-color: ${(props) => props.color || "#78bff0"};
  color: #fff;
  font-size: 4.8vh;
  margin-left: 1vh;
  border-radius: 1vh;

  ${ButtonEffect}
`;

const CloseIcon = styled.svg`
  position: absolute;
  top: 3vh;
  right: 3vh;

  ${ButtonEffect}
`;

const Modal = ({
  title,
  subtitle,
  placeholder,
  buttonText,
  bgColor,
  buttonColor,
  showInput = true,
  onClose,
  onNameChange = (name: string) => {},
  onButtonClick,
}: ModalProps) => {
  const formattedSubtitle = subtitle.split("\n").map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      {idx !== subtitle.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
  const [phone, setPhone] = useState("");
  const { playSound } = useSoundEffect();

  const navigate = useNavigate();
  const sendMessage = usePostMessage();
  const sendAlarm = usePostAlarmMessage();

  const handleSendMessage = () => {
    playSound();
    const regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (buttonText === "보내기" && regExp2.test(phone)) {
      sendMessage.mutateAsync({
        tel: phone,
      });
      onClose();
    } else if (buttonText === "알림받기" && regExp2.test(phone)) {
      sendAlarm.mutateAsync({
        tel: phone,
      });
      navigate("/parent/main");
    }
  };

  return (
    <Container>
      <ModalWrapper bgColor={bgColor}>
        <Title>{title}</Title>
        <Subtitle>{formattedSubtitle}</Subtitle>
        {showInput && (
          <InputContainer>
            {buttonText === "보내기" || buttonText === "알림받기" ? (
              <>
                <Input
                  type="text"
                  placeholder={placeholder}
                  onChange={(e) => setPhone(e.target.value)} // Call the onNameChange callback
                />
                <Button color={buttonColor} onClick={handleSendMessage}>
                  {buttonText}
                </Button>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder={placeholder}
                  maxLength={5} // 최대 글자 수 (예: 50 글자)
                  onChange={(e) => onNameChange(e.target.value)} // Call the onNameChange callback
                />
                <Button color={buttonColor} onClick={onButtonClick}>
                  {buttonText}
                </Button>
              </>
            )}
          </InputContainer>
        )}
        <CloseIcon
          onClick={() => {
            onClose();
            playSound();
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 62 62"
          fill="none"
        >
          <path
            d="M43.8478 0H18.1522L0 18.1522V43.8478L18.1522 62H43.8478L62 43.8478V18.1522L43.8478 0ZM48.2222 43.8822L43.8822 48.2222L31 35.34L18.1178 48.2222L13.7778 43.8822L26.66 31L13.7778 18.1178L18.1178 13.7778L31 26.66L43.8822 13.7778L48.2222 18.1178L35.34 31L48.2222 43.8822Z"
            fill="white"
          />
        </CloseIcon>
      </ModalWrapper>
    </Container>
  );
};

export default Modal;
