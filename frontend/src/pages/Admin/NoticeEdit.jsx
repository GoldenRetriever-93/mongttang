import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import Button from 'components/common/Button';

const CreateFormWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const ChallengeList = styled.div`
  width: 50vw;
`;
const Title = styled.span`
  ${tw`text-[32px]`}
`;
const TitleInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[50vw] h-[40px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ContentInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[50vw] h-[260px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;
function NoticeEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const noticeId = params.noticeId;
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');

  useEffect(() => {
    const get_notice_detail = async () => {
      try {
        const response = await authApi.get(
          requests.GET_NOTICE_DETAIL(noticeId),
        );
        setNoticeTitle(response.data.notice.noticeTitle);
        setNoticeContent(response.data.notice.noticeContent);

        return console.log(response.data.notice);
      } catch (error) {
        throw error;
      }
    };
    get_notice_detail();
  }, []);
  const canclehandler = () => {
    navigate('/admin/notice');
  };
  const submithandler = () => {
    // 공지사항 등록 api 호출
    const patch_notice = async () => {
      try {
        const response = await authApi.patch(requests.PATCH_NOTICE(noticeId), {
          noticeTitle: noticeTitle,
          noticeContent: noticeContent,
        });

        return console.log(response.data);
      } catch (error) {
        throw error;
      }
    };
    patch_notice();
    navigate('/admin/notice');
  };
  return (
    <div className="ml-[279px] flex">
      <CreateFormWrapper>
        <ChallengeList>
          <div className="flex justify-between items-center">
            <PageTitle>공지사항 수정</PageTitle>
          </div>
          <Title>제목</Title>
          <form action="submit">
            <TitleInputContainer
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              name="Challenge Title"
            />
          </form>

          <Title>내용</Title>
          <form action="submit">
            <ContentInputContainer
              type="text"
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              name="Challenge Content"
            />
          </form>
          <ButtonContainer>
            <div className="mx-1" onClick={submithandler}>
              <Button title="등록" buttonType="black" className="" />
            </div>
            <div onClick={canclehandler}>
              <Button title="취소" buttonType="black" className="" />
            </div>
          </ButtonContainer>
        </ChallengeList>
      </CreateFormWrapper>
    </div>
  );
}

export default NoticeEdit;
