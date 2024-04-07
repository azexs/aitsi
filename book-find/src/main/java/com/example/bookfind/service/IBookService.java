package com.example.bookfind.service;


import com.example.bookfind.model.*;
import com.example.bookfind.payload.response.BookCommentsResponse;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IBookService {

    Page<Book> findAllBooksByExample(Date from, Date to, Example<Book> exampleQuery, Pageable pageable);

    Optional<Book> findBookById(Long id);

    Double findBookAvarageRating(Long book_id);

    Integer findBookCountRating(Long book_id);

    Integer findUserBookRating(Long book_id, Long user_id);

    BookRating saveRating(BookRating rating);

    BookComment saveComment(BookComment comment);

    List<Language> findAllLanguages();

    List<Category> findAllCategories();

    List<Publisher> findAllPublishers();

    List<BookCommentsResponse> findAllBookComments(Long bookId);


}
