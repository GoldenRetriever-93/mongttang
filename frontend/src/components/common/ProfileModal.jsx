import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import tw, { styled, css } from 'twin.macro';
import { authApi } from 'api/axios';
import requests from 'api/config';
import { removeCookie } from 'utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { userStore } from 'store/userStore';
import ProfileImg2 from './ProfileImg2';
import ProfileBtn from '../../assets/icons/ProfileBtn.svg';
import WalletBtn from '../../assets/icons/WalletBtn.svg';
import EditBtn from '../../assets/icons/EditBtn.svg';
import useOutsideClick from 'hooks/useOutsideClick';

const ModalOverlay = styled.div`
  ${tw`flex items-center justify-center z-50 bg-neutral-400/80 h-full w-full fixed`}
`;

const ModalWrapper = styled.div`
  ${tw`bg-white flex flex-col items-center absolute border-solid rounded-xl h-auto w-auto shadow mt-[50%] mb-[50%] font-sans`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col justify-center items-center p-1 text-lg `}
`;
const ProfileContainer = styled.div`
  ${tw`flex flex-col justify-center items-center p-1 font-edu`}
`;

const ProfileImgWrapper = styled.div``;
const ProfileInfoContainer = styled.div`
  ${tw`flex flex-col justify-center items-center mt-2`}
`;
const UserNameWrapper = styled.div`
  ${tw`text-2xl pb-1`}
`;

const FollowContainer = styled.div`
  ${tw`flex space-x-2`}
`;
const FollowWrapper = styled.div``;
const FollowingWrapper = styled.div``;

const BtnContainer = styled.div`
  ${tw`flex flex-row pl-1`}
`;

const ProfileBtnContainer = styled.div`
  ${tw`m-1 p-0`}
`;
const WalletBtnContainer = styled.div`
  ${tw`m-1 p-0 pl-1`}
`;
const EditBtnContainer = styled.div`
  ${tw`m-1 p-0`}
`;

const BtnWrapper = styled.div`
  ${tw`flex flex-col m-1 py-1`}
`;

function ProfileModal({ onClose }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { resetUser } = userStore((state) => state);
  const wallet = userStore((state) => state.userWallet);

  const [userImg, setUserImg] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [numOfFollower, setNumOfFollower] = useState(0);
  const [numOfFollowing, setNumOfFollowing] = useState(0);

  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  //모달 외부 클릭시 모달창 꺼짐
  useOutsideClick(modalRef, handleClose);

  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';

    authApi(requests.GET_PROFILE(userId)).then((response) => {
      if (response.status === 200) {
        setUserImg(response.data.profile.profileImgURL);
        setUserNickname(response.data.profile.userNickname);
        setNumOfFollower(response.data.profile.numOfFollower);
        setNumOfFollowing(response.data.profile.numOfFollowing);
        console.log(response);
      }
    });

    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  const logout = () => {
    authApi(requests.GET_LOGOUT(userId))
      .then((response) => {
        localStorage.clear();
        removeCookie('refreshToken');
        resetUser();
      })
      .finally(() => onClose());
    navigate('/home');
  };

  const openProfile = () => {
    onClose();
    navigate('/myprofile');
  };

  const openWallet = () => {
    onClose();
    window.open(
      `http://j8a308.p.ssafy.io:3333/?key=${wallet}`,
      'MyWallet',
      'toolbar=no, menubar=no, width=550, height=780',
    );
  };

  const openEdit = () => {
    onClose();
    navigate('/myprofile/edit');
  };

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ProfileContainer>
          <ProfileImgWrapper>
            <ProfileImg2 userImg={userImg} />
          </ProfileImgWrapper>
          <ProfileInfoContainer>
            <UserNameWrapper>{userNickname}님</UserNameWrapper>
            <FollowContainer>
              <FollowWrapper>팔로워 {numOfFollower}명</FollowWrapper>
              <FollowingWrapper>팔로잉 {numOfFollowing}명</FollowingWrapper>
            </FollowContainer>
          </ProfileInfoContainer>
        </ProfileContainer>
        <hr />
        <ContentContainer>
          <BtnContainer>
            <ProfileBtnContainer>
              <button onClick={openProfile} stlye>
                <img src={ProfileBtn} alt="profile" />
              </button>
            </ProfileBtnContainer>
            <WalletBtnContainer>
              <button onClick={openWallet}>
                <img src={WalletBtn} alt="wallet" />
              </button>
            </WalletBtnContainer>
            <EditBtnContainer>
              <button onClick={openEdit}>
                <img src={EditBtn} alt="edit" />
              </button>
            </EditBtnContainer>
          </BtnContainer>
        </ContentContainer>
        <hr />
        <BtnWrapper>
          <button onClick={logout}>로그아웃</button>
        </BtnWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
}

export default ProfileModal;
