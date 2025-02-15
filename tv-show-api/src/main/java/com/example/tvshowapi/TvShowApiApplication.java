package com.example.tvshowapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.tvshowapi") 
public class TvShowApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(TvShowApiApplication.class, args);
    }
}
