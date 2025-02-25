package com.example.tvshowapi.service;

import com.example.tvshowapi.model.TVShow;
import com.example.tvshowapi.repository.TVShowRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TVShowService {

    private final TVShowRepository tvShowRepository;

    public TVShowService(TVShowRepository tvShowRepository) {
        this.tvShowRepository = tvShowRepository;
    }

    // Fetch only TV Show Names
    public List<String> getAllTVShowNames() {
        return tvShowRepository.findAll()
                .stream()
                .map(TVShow::getName)
                .toList();
    }

    // Fetch TV Shows with Pagination, Sorting, and Filtering
    public Page<TVShow> getAllTVShows(int page, int size, String sortBy, String filter) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        if (filter != null && !filter.isEmpty()) {
            return tvShowRepository.findByNameContainingIgnoreCase(filter, pageable);
        }
        return tvShowRepository.findAll(pageable);
    }
}
