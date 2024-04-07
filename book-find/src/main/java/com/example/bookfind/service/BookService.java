package com.example.bookfind.service;

import com.example.bookfind.model.*;
import com.example.bookfind.payload.response.BookCommentsResponse;
import com.example.bookfind.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService implements IBookService {

        @Autowired
        private BookRepository repository;

        @Autowired
        private BookRatingRepository bookRatingRepository;

        @Autowired
        private BookCommentRepository bookCommentRepository;

        @Autowired
        private LanguageRepository languageRepository;

        @Autowired
        private CategoryRepository categoryRepository;

        @Autowired
        private PublisherRepository publisherRepository;

        @Autowired
        private UserRepository userRepository;

        public static double round(double value, int places) {
                if (places < 0) throw new IllegalArgumentException();

                BigDecimal bd = BigDecimal.valueOf(value);
                bd = bd.setScale(places, RoundingMode.HALF_UP);
                return bd.doubleValue();
        }

        @Override
        public BookRating saveRating(BookRating rating) {
                Optional<BookRating> one = bookRatingRepository.findBookRatingByBookIdAndAndUserId(rating.getBookId(), rating.getUserId());
                if (one.isPresent()) {
                        rating.setId(one.get().getId());

                }
                return bookRatingRepository.save(rating);
        }

        @Override
        public BookComment saveComment(BookComment comment) {
                return bookCommentRepository.save(comment);
        }

        @Override
        public List<Language> findAllLanguages() {
                return (List<Language>) languageRepository.findAll();
        }

        @Override
        public Optional<Book> findBookById(Long id) {
                return repository.findById(id);
        }

        @Override
        public List<Publisher> findAllPublishers() {
                return (List<Publisher>) publisherRepository.findAll();
        }

        @Override
        public List<Category> findAllCategories() {
                return (List<Category>) categoryRepository.findAll();
        }

        @Override
        public List<BookCommentsResponse> findAllBookComments(Long bookId) {
                List<BookComment> bookComments = bookCommentRepository.findAllByBookId(bookId);
                return bookComments.stream().map(e -> {
                        String _username = null;
                        if (e.getUser_id() != null) {
                                Optional<User> username = userRepository.findById(e.getUser_id());
                                _username = username.get().getUsername();
                        }
                        return new BookCommentsResponse(_username, e.getTitle(), e.getComment());
                }).collect(Collectors.toList());
        }

        @Override
        public Page<Book> findAllBooksByExample(Date from, Date to, Example<Book> exampleQuery, Pageable pageable) {
                return repository.findAll(getSpecFromDatesAndExample(from, to, exampleQuery), pageable);

        }

        public Specification<Book> getSpecFromDatesAndExample(
                Date from, Date to, Example<Book> example) {

                return (Specification<Book>) (root, query, builder) -> {
                        final List<Predicate> predicates = new ArrayList<>();

                        if (from != null) {

                                predicates.add(builder.greaterThan(root.get("publication_date"), from));
                        }
                        if (to != null) {
                                predicates.add(builder.lessThan(root.get("publication_date"), to));
                        }
                        predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));

                        return builder.and(predicates.toArray(new Predicate[predicates.size()]));
                };
        }

        @Override
        public Double findBookAvarageRating(Long book_id) {
                Double avgRating = bookRatingRepository.findBookAvarageRating(book_id);
                if (avgRating == null) return avgRating;
                return round(avgRating, 2);
        }

        @Override
        public Integer findBookCountRating(Long book_id) {
                return bookRatingRepository.findBookCountRating(book_id);
        }

        @Override
        public Integer findUserBookRating(Long book_id, Long user_id) {
                Optional<BookRating> rating = bookRatingRepository.findBookRatingByBookIdAndAndUserId(book_id, user_id);
                if (rating.isPresent()) {
                        return rating.get().getRating();
                }
                return null;
        }
}
