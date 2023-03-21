package com.ssafy.mongttang.entity;

import com.ssafy.mongttang.dto.ReqSaveBookDto;
import com.ssafy.mongttang.dto.ReqTemporarySaveBookDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "book")
public class Book extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "book_challenge_id")
    private Challenge bookChallengeId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "book_user_id")
    private User bookUserId;

    private String bookContent;

    @NotNull
    private String bookTitle;

    @NotNull
    private String bookSummary;

    @NotNull
    private String bookStatus;

    @Builder
    public Book(Challenge challenge, User user, ReqSaveBookDto dto){
        this.bookChallengeId = challenge;
        this.bookUserId = user;
        this.bookTitle = dto.getBookTitle();
        this.bookSummary = dto.getBookSummary();
        this.bookContent = dto.getBookContent();
        this.bookStatus = dto.getIsComplete();
    }
    public void changeContent(ReqTemporarySaveBookDto dto) {
        this.bookTitle = dto.getBookTitle();
        this.bookSummary = dto.getBookSummary();
        this.bookContent = dto.getBookContent();
        this.bookStatus = dto.getIsComplete();
    }
}
