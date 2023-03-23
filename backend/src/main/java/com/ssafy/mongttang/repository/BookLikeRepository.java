package com.ssafy.mongttang.repository;

import com.ssafy.mongttang.entity.Book;
import com.ssafy.mongttang.entity.BookLike;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookLikeRepository extends JpaRepository<BookLike,Integer>, BookLikeRepositoryCustom {
    BookLike findByBooklikeBookIdAndBooklikeUserId(Book book,int userId);
    int countByBooklikeBookId_BookId(int bookId);
}
