package com.example.bookfind.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;



@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long book_id;


    @ManyToOne
    @JoinColumn(name = "publisher_id")
    @JsonManagedReference
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @JsonManagedReference
    private Language language;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    private Category category;

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    private String isbn13;


    private String title;

    private String description;

    private Date publication_date;

    private Integer num_pages;

    private Double avg;

    public Book(Long languageId, Long publisherId, String title, String isbn, Long categoryId) {
        if (languageId != null) {
            Language language = new Language();
            language.setLanguage_id(languageId);
            language.getBookList().add(this);
            this.language = language;
        }
        if (publisherId != null) {
            Publisher publisher = new Publisher();
            publisher.setPublisher_id(publisherId);
            publisher.getBookList().add(this);
            this.publisher = publisher;
        }
        if (categoryId != null) {
            Category category = new Category();
            category.setCategoryId(categoryId);
            this.category = category;
        }

        this.title = title;
        this.isbn13 = isbn;
    }

    public Book() {

    }

    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }

/*    public Long getPublisher_id() {
        return publisher_id;
    }

    public void setPublisher_id(Long publisher_id) {
        this.publisher_id = publisher_id;
    }*/

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getIsbn13() {
        return isbn13;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPublication_date() {
        return publication_date;
    }

    public void setPublication_date(Date publication_date) {
        this.publication_date = publication_date;
    }

    public Integer getNum_pages() {
        return num_pages;
    }

    public void setNum_pages(Integer num_pages) {
        this.num_pages = num_pages;
    }

    public Double getAvg() {
        return avg;
    }

    public void setAvg(Double avg) {
        this.avg = avg;
    }
}
