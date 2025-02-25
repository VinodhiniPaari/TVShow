package com.example.tvshowapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tvshowapi.model.TVShow;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TVShowRepository extends JpaRepository<TVShow, Long> {
    Page<TVShow> findByNameContainingIgnoreCase(String name, Pageable pageable);
    boolean existsByName(String name);
    Optional<TVShow> findByName(String name);
    Optional<TVShow> findById(Long id);
}
