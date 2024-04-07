package com.example.bookfind.payload.response;

public class BookCommentsResponse {

    private String author;
    private String comment;
    private String title;

    public BookCommentsResponse(String author, String title, String comment) {
        this.author = author;
        this.comment = comment;
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
