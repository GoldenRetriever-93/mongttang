import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import ProfileImg2 from 'components/common/ProfileImg2';
import moveToEdit from 'assets/icons/moveToEdit.svg';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[80px]`}
`;
const InfoTitle = styled.span`
  ${tw`justify-start text-[30px]`}
`;
const InputContainer = styled.div`
  ${tw`flex-col pt-2 pb-2 px-4 mx-[200px]`}

  & {
    input {
      ${tw`w-full rounded-lg mb-1 p-1 box-border text-[30px] text-main`}
      font-size: 30px;
      ${(props) =>
        props.isValid
          ? tw`focus:outline focus:outline-primary`
          : tw`focus:outline focus:outline-secondary`}
    }
    p {
      ${tw`text-secondary `}
    }
  }
`;
const ButtonContainer = styled.div`
  ${tw`w-full h-[40px] my-[12px] bg-btnBlack text-whiteText rounded-lg flex justify-center items-center`}
`;

function NicknameEdit() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [verify, setVerify] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const onChangeNicknameInput = useCallback((e) => {
    setNickname(e.target.value);
    setIsNicknameTouched(true);

    if (e.target.value.trim() === '') {
      setIsNicknameValid(false);
      setNicknameMessage('닉네임을 입력해주세요.');
      return;
    } else if (
      e.target.value.trim().length < 2 ||
      e.target.value.trim().length > 10
    ) {
      setIsNicknameValid(false);
      setNicknameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      return;
    } else {
      setNicknameMessage('');
      setIsNicknameValid(true);
    }
  }, []);
  const onClickVerifyingHandler = () => {
    setVerify('success');
  };
  useEffect(() => {
    if (verify === 'success') {
      setVerifyMessage('중복확인이 완료되었습니다');
    } else if (verify === 'fail') {
      setVerifyMessage('중복확인이 실패했습니다');
    }
  }, [verify]);
  const submitHandler = () => {
    //닉네임 변경 API 추가
    if (verify === 'success') {
      navigate('/myprofile/edit');
    }
  };
  const isValidName = isNicknameTouched && isNicknameValid;

  //프로필조회API사용
  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 />
      </ProfileContainer>
      <form action="submit">
        <InputContainer disabled={isValidName ? false : true}>
          <InfoTitle>닉네임</InfoTitle>
          <p>{verifyMessage}</p>
          <input
            type="text"
            onChange={onChangeNicknameInput}
            placeholder="오성과 한음"
            name="Username"
          />
          <p>{nicknameMessage}</p>
          <ButtonContainer onClick={onClickVerifyingHandler}>
            중복확인
          </ButtonContainer>
          {/* 저장 클릭시 API호출하는 onClick 함수 선언 필요 */}
          {verify === 'success' ? (
            <ButtonContainer onClick={submitHandler}>저장</ButtonContainer>
          ) : (
            ''
          )}
        </InputContainer>
      </form>
    </div>
  );
}

export default NicknameEdit;