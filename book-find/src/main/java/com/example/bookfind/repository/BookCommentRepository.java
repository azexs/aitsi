package com.example.bookfind.repository;

import com.example.bookfind.model.BookComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookCommentRepository extends CrudRepository<BookComment, Long> {
    List<BookComment> findAllByBookId(Long bookId);
}
