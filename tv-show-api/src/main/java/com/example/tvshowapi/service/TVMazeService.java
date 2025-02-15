package com.example.tvshowapi.service;

import com.example.tvshowapi.model.*;
import com.example.tvshowapi.repository.TVShowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import com.example.tvshowapi.exception.TVShowExceptions;

@Service
public class TVMazeService {
    private static final Logger logger = LoggerFactory.getLogger(TVMazeService.class);

    private final RestTemplate restTemplate;
    private final TVShowRepository repository;
    private final ExecutorService executor = Executors.newFixedThreadPool(10);

    @Value("classpath:tvtitles.txt") // Load file from resources
    private Resource tvShowFile;

    public TVMazeService(RestTemplate restTemplate, TVShowRepository repository) {
        this.restTemplate = restTemplate;
        this.repository = repository;
    }

    public List<TVShow> fetchAndStoreAllTVShowsFromFile() {
        try (InputStream inputStream = tvShowFile.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            
            List<String> tvShowNames = reader.lines().collect(Collectors.toList());
            logger.info("Loaded {} TV Show names from file", tvShowNames.size());

            List<CompletableFuture<TVShow>> futures = tvShowNames.stream()
                    .map(name -> CompletableFuture.supplyAsync(() -> fetchTVShowDetails(name.trim()), executor))
                    .collect(Collectors.toList());

            List<TVShow> tvShows = futures.stream()
                    .map(CompletableFuture::join)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            repository.saveAll(tvShows);
            logger.info("Saved {} TV Shows to DB", tvShows.size());

            return tvShows;
        } catch (IOException e) {
            logger.error("Error reading TV show names from file", e);
            return Collections.emptyList();
        }
    }

    private TVShow fetchTVShowDetails(String title) {
        try {
            String apiUrl = "http://api.tvmaze.com/singlesearch/shows?q="
                    + URLEncoder.encode(title, StandardCharsets.UTF_8);
            TVShow response = restTemplate.getForObject(apiUrl, TVShow.class);

            if (response != null) {
                return repository.save(response);
            }
        } catch (Exception e) {
            logger.warn("No details found for TV Show: {}", title);
        }

        TVShow emptyTVShow = new TVShow();
        emptyTVShow.setName(title);
        return emptyTVShow;
    }

    public TVShow fetchTVShow(String title) {
        return repository.findByName(title).orElseThrow(() -> {
            logger.warn("TV Show not found in DB: {}", title);
            return new TVShowExceptions("TV Show not found: " + title);
        });
    }
}
