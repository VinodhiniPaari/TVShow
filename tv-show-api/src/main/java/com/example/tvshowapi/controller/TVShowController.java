package com.example.tvshowapi.controller;

import com.example.tvshowapi.model.TVShow;
import com.example.tvshowapi.service.TVMazeService;
import com.example.tvshowapi.service.TVShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tvshows")
@Tag(name = "TV Show API", description = "Endpoints for fetching and listing TV shows")
public class TVShowController {

    private final TVMazeService tvMazeService;
    private final TVShowService tvShowService;

    public TVShowController(TVMazeService tvMazeService, TVShowService tvShowService) {
        this.tvMazeService = tvMazeService;
        this.tvShowService = tvShowService;
    }

    // Fetch and store all TV Shows
    @PostMapping("/load-from-file")
    @Operation(summary = "Fetch and store TV Shows from file", description = "Reads TV shows from a file and fetches details from TVMaze API")
    public List<TVShow> loadTVShowsFromFile() {
        return tvMazeService.fetchAndStoreAllTVShowsFromFile();
    }

    // Fetch a single TV Show by title
    @GetMapping("/{title}")
    @Operation(summary = "Get TV Show by Title", description = "Fetches TV show details from TVMaze API and stores in DB")
    public TVShow getTVShow(@PathVariable String title) {
        return tvMazeService.fetchTVShow(title);
    }

    // List all TV Show Names
    @GetMapping("/names")
    @Operation(summary = "List all TV Show Names", description = "Returns a list of all TV show names stored in the database")
    public List<String> getAllTVShowNames() {
        return tvShowService.getAllTVShowNames();
    }

    // Fetch TV Shows with Pagination, Sorting, and Filtering
    @GetMapping
    @Operation(summary = "Fetch TV Shows with Pagination and Sorting", description = "Fetch all TV shows with pagination, sorting, and filtering options")
    public ResponseEntity<Map<String, Object>> getAllTVShows(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(required = false) String filter) {

        Page<TVShow> tvShowPage = tvShowService.getAllTVShows(page, size, sortBy, filter);

        Map<String, Object> response = new HashMap<>();
        response.put("content", tvShowPage.getContent());
        response.put("totalElements", tvShowPage.getTotalElements());
        response.put("totalPages", tvShowPage.getTotalPages());
        response.put("currentPage", tvShowPage.getNumber());

        return ResponseEntity.ok(response);
    }
}
