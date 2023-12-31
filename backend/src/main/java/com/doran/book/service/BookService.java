package com.doran.book.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.doran.book.dto.req.BookInsertDto;
import com.doran.book.dto.res.BookListDto;
import com.doran.book.dto.res.BookResDto;
import com.doran.book.entity.Book;
import com.doran.book.mapper.BookMapper;
import com.doran.book.repository.BookRepository;
import com.doran.utils.bucket.dto.InsertDto;
import com.doran.utils.bucket.mapper.BucketMapper;
import com.doran.utils.bucket.service.BucketService;
import com.doran.utils.exception.dto.CustomException;
import com.doran.utils.exception.dto.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookService {
    private final BucketService bucketService;
    private final BucketMapper bucketMapper;
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    //책 예외 체킹
    public Book findBookById(int bookId) {
        return bookRepository.findById(bookId)
            .orElseThrow(() -> new CustomException(ErrorCode.BOOK_NOT_FOUND));
    }

    // 책 등록
    public Book insertBook(BookInsertDto bookInsertDto) {
        //버킷 업로드 (imgUrl)
        InsertDto insertDto = bucketMapper.bookInsertToBucket(bookInsertDto);
        String imgUrl = bucketService.insertFile(insertDto);

        //버킷 업로드 (imgUrl2)
        insertDto = bucketMapper.bookInsertToBucket(bookInsertDto.getMultipartFile2(),
            bookInsertDto.getTitle());
        String imgUrl2 = bucketService.insertFile(insertDto);

        // DB 업로드
        return bookRepository.save(bookMapper.bookInsertToBook(bookInsertDto, imgUrl, imgUrl2));
    }

    //책 조회
    public BookListDto getBookList() {
        List<BookResDto> bookResDtoList = bookRepository.findBookWithPageCnt();
        return new BookListDto(bookResDtoList.size(), bookResDtoList);
    }
}
