package com.example.bookfind.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "book_language")
public class Language {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long language_id;

    private String language_name;

    private String language_code;

    @OneToMany(
            mappedBy = "language",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonBackReference
    private Set<Book> bookList = new HashSet<>();

    public String getLanguage_name() {
        return language_name;
    }

    public void setLanguage_name(String language_name) {
        this.language_name = language_name;
    }

    public String getLanguage_code() {
        return language_code;
    }

    public void setLanguage_code(String language_code) {
        this.language_code = language_code;
    }

    public Long getLanguage_id() {
        return language_id;
    }

    public void setLanguage_id(Long language_id) {
        this.language_id = language_id;
    }

    public Set<Book> getBookList() {
        return bookList;
    }

    public void setBookList(Set<Book> bookList) {
        this.bookList = bookList;
    }
}
