package com.ssafy.mongttang.controller;

import com.ssafy.mongttang.dto.ReqSaveBookDto;
import com.ssafy.mongttang.dto.ReqTemporarySaveBookDto;
import com.ssafy.mongttang.service.BookService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final BookService bookService;

    @ApiOperation(value = "동화 저장(작성 완료 + 임시저장)", notes = "그림 작가가 처음 작성한 그림을 저장한다.", response = Map.class)
    @PostMapping("/draw/{userId}")
    public ResponseEntity<Map<String,Object>> createBook(@ApiParam(value = "등록된 사진 리스트", required = true, example = "0")
                                                           @RequestPart(value = "imgList", required = false) ArrayList<MultipartFile> imgList,
                                                           @Valid @ApiParam(value = "챌린지 아이디, 동화 제목, 줄거리, 내용, 작가, 완료여부", required = true, example = "0")
                                                           @RequestPart(value = "BookContent", required = false) ReqSaveBookDto reqSaveBookDto,
                                                           @ApiParam(value = "작가 아이디", required = true, example = "0")
                                                           @PathVariable int userId){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            int bookId = bookService.createBook(userId,reqSaveBookDto,imgList);
            if(bookId > 0){
                resultMap.put(MESSAGE,SUCCESS);
                resultMap.put("bookId",bookId);
                status = HttpStatus.OK;
            }else{
                resultMap.put(MESSAGE, FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (IOException e) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @ApiOperation(value = "동화 수정(작성 완료 + 임시저장)", notes = "그림 작가가 임시저장한 그림을 저장한다.", response = Map.class)
    @PatchMapping("/draw/{userId}")
    public ResponseEntity<Map<String,Object>> updateBook(@ApiParam(value = "등록된 사진 리스트", required = true, example = "0")
                                                         @RequestPart(value = "imgList", required = false) ArrayList<MultipartFile> imgList,
                                                         @Valid @ApiParam(value = "챌린지 아이디, 동화 아이디, 동화 제목, 줄거리, 내용, 작가", required = true, example = "0")
                                                         @RequestPart(value = "BookContent", required = false) ReqTemporarySaveBookDto reqTemporarySaveBookDto,
                                                         @ApiParam(value = "작가 아이디", required = true, example = "0")
                                                         @PathVariable int userId){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        try {
            int bookId = bookService.updateBook(userId,reqTemporarySaveBookDto,imgList);
            if(bookId > 0){
                resultMap.put(MESSAGE,SUCCESS);
                resultMap.put("bookId",bookId);
                status = HttpStatus.OK;
            }else{
                resultMap.put(MESSAGE, FAIL);
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (IOException e) {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}
