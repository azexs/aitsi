package com.example.bookfind.controller;

import com.example.bookfind.model.*;
import com.example.bookfind.payload.response.BookCommentsResponse;
import com.example.bookfind.security.services.UserDetailsImpl;
import com.example.bookfind.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class MainController {

    @Autowired
    private IBookService bookService;

    @GetMapping(path = "/books")
    public @ResponseBody
    ResponseEntity<Map<String, Object>> getAllBooks(@RequestParam(required = false) Long languageId, @RequestParam(required = false) Long categoryId,
                                                    @RequestParam(required = false) Long publisherId,
                                                    @RequestParam(required = false) String title, @RequestParam(required = false) String isbn,
                                                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy") Date from,
                                                    @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy") Date to,
                                                    @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "20") Integer size) throws ParseException {

        Pageable paging = PageRequest.of(page, size);

        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues()
                .withMatcher("title", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("publication_date", ExampleMatcher.GenericPropertyMatchers.startsWith());
        Example<Book> exampleQuery = Example.of(new Book(languageId, publisherId, title, isbn, categoryId), matcher);

        Page<Book> result = bookService.findAllBooksByExample(from, to, exampleQuery, paging);

        result.getContent().forEach(book -> {
            book.setAvg(bookService.findBookAvarageRating(book.getBook_id()));
        });

        Map<String, Object> response = new HashMap<>();
        response.put("books", result.getContent());
        response.put("currentPage", result.getNumber());
        response.put("totalItems", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/languages")
    public @ResponseBody
    List<Language> getAllLanguages() {
        return bookService.findAllLanguages();
    }

    @GetMapping(path = "/categories")
    public @ResponseBody
    List<Category> getAllCategories() {
        return bookService.findAllCategories();
    }

    @GetMapping(path = "/publishers")
    public @ResponseBody
    List<Publisher> getAllPublishers() {
        return bookService.findAllPublishers();
    }


    @GetMapping("/books/{id}")
    public @ResponseBody
    ResponseEntity<Map<String, Object>> getBookById(@PathVariable("id") long id) {
        Optional<Book> tutorialData = bookService.findBookById(id);

        Object userDetails = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (tutorialData.isPresent()) {
            tutorialData.get().setAvg(bookService.findBookAvarageRating(tutorialData.get().getBook_id()));
            Map<String, Object> response = new HashMap<>();
            response.put("book", tutorialData.get());
            response.put("allRating", bookService.findBookCountRating(tutorialData.get().getBook_id()));
            if (userDetails instanceof UserDetailsImpl) {
                response.put("userRating", bookService.findUserBookRating(tutorialData.get().getBook_id(), ((UserDetailsImpl) userDetails).getId()));
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/books/{id}/comments")
    public @ResponseBody
    ResponseEntity<List<BookCommentsResponse>> getBookComments(@PathVariable("id") Long id) {
        List<BookCommentsResponse> bookComments = bookService.findAllBookComments(id);
        if (bookComments != null) {
            return new ResponseEntity<>(bookComments, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("/ratings")
    public ResponseEntity<BookRating> addRating(@RequestBody BookRating tutorial) {
        try {
            BookRating _tutorial = bookService.saveRating(tutorial);
            return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/comments")
    public ResponseEntity<BookComment> addComment(@RequestBody BookComment comment) {
        try {
            BookComment _comment = bookService.saveComment(comment);
            return new ResponseEntity<>(_comment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}