package com.example.bookfind.repository;

import com.example.bookfind.model.BookRating;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BookRatingRepository extends CrudRepository<BookRating, Long> {

    @Query("SELECT AVG(br.rating) FROM BookRating AS br WHERE br.bookId = ?1")
    Double findBookAvarageRating(Long book_id);

    @Query("SELECT count(br) FROM BookRating AS br WHERE br.bookId = ?1")
    Integer findBookCountRating(Long book_id);

    @Modifying
    @Query("update BookRating u set u.rating = ?1 where u.id = ?2")
    int setRating(int rating, Long userId);


    Optional<BookRating> findBookRatingByBookIdAndAndUserId(Long bookId, Long userId);


}
