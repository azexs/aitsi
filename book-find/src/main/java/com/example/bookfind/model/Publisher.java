package com.example.bookfind.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "publisher")
public class Publisher {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long publisher_id;


    private String publisher_name;

    @OneToMany(
            mappedBy = "publisher",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonBackReference
    private Set<Book> bookList = new HashSet<>();

    public Long getPublisher_id() {
        return publisher_id;
    }

    public void setPublisher_id(Long publisher_id) {
        this.publisher_id = publisher_id;
    }

    public String getPublisher_name() {
        return publisher_name;
    }

    public void setPublisher_name(String publisher_name) {
        this.publisher_name = publisher_name;
    }

    public Set<Book> getBookList() {
        return bookList;
    }

    public void setBookList(Set<Book> bookList) {
        this.bookList = bookList;
    }
}
