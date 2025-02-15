package com.example.tvshowapi.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TVShowExceptions extends RuntimeException {
    public TVShowExceptions(String message) {
        super(message);
    }
}
