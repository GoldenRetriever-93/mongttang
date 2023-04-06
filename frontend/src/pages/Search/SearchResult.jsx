import React from 'react';
import tw, { styled } from 'twin.macro';

import { useEffect } from 'react';
import BookShelf from 'components/common/BookShelf';
import { searchStore } from 'store/searchStore';
import { useState } from 'react';
import { authApi } from 'api/axios';
import requests from 'api/config';

const BodyContainer = styled.div`
  ${tw`flex flex-col items-center pt-[5%]`}
`;

const BookTitleContainer = styled.div`
  ${tw`flex items-baseline`}
`;

const BookTitleWrapper = styled.div`
  ${tw`text-3xl pl-[2%] pt-[5%] whitespace-nowrap`}
`;

const BookContainer = styled.div`
  ${tw`p-48 pt-8`}
`;

const RecentBookContainer = styled.div`
  // ${tw`flex flex-wrap`}
`;

const ResultWrapper = styled.div`
  ${tw`flex justify-center py-2 text-2xl`}
`;

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function SearchResult() {
  const { searchKeyword, searchResult } = searchStore((state) => state);
  const [recommendBooks, setRecommendBooks] = useState([]);

  //검색어에 따른 필터링
  useEffect(() => {
    searchStore.subscribe((state) => state);
  }, [searchKeyword, searchResult]);

  authApi(requests.GET_CHALLENGES()).then((response) =>
    setRecommendBooks(response.data.thisWeekChallenge?.bookList),
  );
  const books = searchResult.data?.searchList;
  const chunkedBooks = chunkArray(books, 5);
  const chunkedRecommendBooks = chunkArray(recommendBooks, 5);
  return (
    <BodyContainer>
      {searchResult?.length !== 0 ? (
        <BookContainer>
          <BookTitleContainer>
            <BookTitleWrapper>
              "{searchKeyword}"에 대한 동화 검색결과
            </BookTitleWrapper>
          </BookTitleContainer>

          <RecentBookContainer>
            {chunkedBooks?.map((chunkedBook, index) => {
              return (
                <BookShelf
                  key={index}
                  books={chunkedBook}
                  width="w-40"
                  height="h-48"
                  size="b-16"
                />
              );
            })}
          </RecentBookContainer>
        </BookContainer>
      ) : (
        <BookContainer>
          <BookTitleContainer>
            <BookTitleWrapper>
              "{searchKeyword}"에 대한 동화 검색결과
            </BookTitleWrapper>
          </BookTitleContainer>
          <ResultWrapper>검색결과가 없습니다.</ResultWrapper>
          <ResultWrapper>이런 책은 어떠신가요?</ResultWrapper>
          {chunkedRecommendBooks.map((chunkedBook, index) => {
            return (
              <BookShelf
                key={index}
                books={chunkedBook}
                width="w-40"
                height="h-48"
                size="b-16"
              />
            );
          })}
        </BookContainer>
      )}
    </BodyContainer>
  );
}

export default SearchResult;
