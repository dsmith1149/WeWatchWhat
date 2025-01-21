package org.launchcode.BingeBuddy.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.launchcode.BingeBuddy.config.APIConfiguration;
import org.launchcode.BingeBuddy.data.MovieRepository;
import org.launchcode.BingeBuddy.data.UserRepository;
import org.launchcode.BingeBuddy.data.WatchlistRepository;
import org.launchcode.BingeBuddy.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class BingeBuddyController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private APIConfiguration apiConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    // Endpoint: Search for movies
    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String query) {
        String apiUrl = String.format("%s?s=%s&apikey=%s", apiConfig.getApiUrl(), query, apiConfig.getApiKey());
        SearchResponse response = restTemplate.getForObject(apiUrl, SearchResponse.class);

        if (response != null && response.getMovies() != null) {
            return ResponseEntity.ok(response.getMovies());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint: Get movie details by IMDb ID
    @GetMapping("/movie")
    public ResponseEntity<Movie> getMovieDetails(@RequestParam String imdbId) {
        Optional<Movie> existingMovie = movieRepository.findByApiId(imdbId);
        if (existingMovie.isPresent()) {
            return ResponseEntity.ok(existingMovie.get());
        }

        String apiUrl = String.format("%s?i=%s&apikey=%s", apiConfig.getApiUrl(), imdbId, apiConfig.getApiKey());
        Movie movie = restTemplate.getForObject(apiUrl, Movie.class);

        if (movie != null) {
            movie.setApiId(imdbId);
            movieRepository.save(movie);
            return ResponseEntity.ok(movie);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint: Add or update a movie in the watchlist
    @PostMapping("/watchlist")
    public ResponseEntity<String> addToWatchlist(
            @RequestParam String apiId,
            @RequestParam Integer userId,
            @RequestParam WatchlistStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate scheduledDate) {

        // Fetch movie by apiId
        Optional<Movie> movie = movieRepository.findByApiId(apiId);
        if (movie.isEmpty()) {
            // Fetch movie from external API
            String apiUrl = String.format("%s?i=%s&apikey=%s", apiConfig.getApiUrl(), apiId, apiConfig.getApiKey());
            Movie fetchedMovie = restTemplate.getForObject(apiUrl, Movie.class);

            if (fetchedMovie != null) {
                fetchedMovie.setApiId(apiId);
                movieRepository.save(fetchedMovie);
                movie = Optional.of(fetchedMovie);
            } else {
                return ResponseEntity.badRequest().body("Movie not found in database or external API.");
            }
        }


        // Fetch user by userId
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found. Please provide a valid user ID.");
        }

        // Create and save the watchlist entry
        Watchlist watchlistEntry = new Watchlist();
        watchlistEntry.setMovie(movie.get());
        watchlistEntry.setUser(user.get());
        watchlistEntry.setStatus(status);
        watchlistEntry.setScheduledDate(scheduledDate);

        watchlistRepository.save(watchlistEntry);

        // Return success response
        return ResponseEntity.ok("Movie added to watchlist with status: " + status +
                (scheduledDate != null ? " and scheduled for: " + scheduledDate : ""));
    }



    // Endpoint: View all watchlist items
    @GetMapping("/watchlist")
    public ResponseEntity<List<Watchlist>> getWatchlist() {
        List<Watchlist> watchlist = watchlistRepository.findAll();
        return ResponseEntity.ok(watchlist);
    }

    // Endpoint: Remove a movie from the watchlist
    @DeleteMapping("/watchlist")
    public ResponseEntity<String> removeFromWatchlist(@RequestParam Integer watchlistId) {
        Optional<Watchlist> watchlistEntry = watchlistRepository.findById(watchlistId);
        if (watchlistEntry.isPresent()) {
            watchlistRepository.delete(watchlistEntry.get());
            return ResponseEntity.ok("Watchlist entry removed.");
        } else {
            return ResponseEntity.badRequest().body("Watchlist entry not found.");
        }
    }

    @PostMapping("/watchlist/event")
    public ResponseEntity<String> createEvent(
            @RequestParam Integer userId,
            @RequestParam String imdbId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate scheduledDate) {

        Optional<Movie> movie = movieRepository.findByApiId(imdbId);
        if (movie.isEmpty()) {
            return ResponseEntity.badRequest().body("Movie not found.");
        }

        Watchlist watchlistEntry = new Watchlist();
        watchlistEntry.setMovie(movie.get());
        watchlistEntry.setUser(new User(userId));
        watchlistEntry.setStatus(WatchlistStatus.PLANNED);
        watchlistEntry.setScheduledDate(scheduledDate);

        watchlistRepository.save(watchlistEntry);
        return ResponseEntity.ok("Event created for movie: " + movie.get().getTitle());
    }

    @PutMapping("/calendar/event")
    public ResponseEntity<String> updateEvent(
            @RequestParam Integer watchlistId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate newDate) {

        Optional<Watchlist> watchlistEntry = watchlistRepository.findById(watchlistId);
        if (watchlistEntry.isEmpty()) {
            return ResponseEntity.badRequest().body("Event not found.");
        }

        Watchlist entry = watchlistEntry.get();
        entry.setScheduledDate(newDate);
        watchlistRepository.save(entry);
        return ResponseEntity.ok("Event updated to new date: " + newDate);
    }

    @DeleteMapping("/calendar/event")
    public ResponseEntity<String> deleteEvent(@RequestParam Integer watchlistId) {
        Optional<Watchlist> watchlistEntry = watchlistRepository.findById(watchlistId);
        if (watchlistEntry.isPresent()) {
            watchlistRepository.delete(watchlistEntry.get());
            return ResponseEntity.ok("Event deleted.");
        } else {
            return ResponseEntity.badRequest().body("Event not found.");
        }
    }

    @GetMapping("/calendar/event")
    public ResponseEntity<Watchlist> getEvent(@RequestParam Integer watchlistId) {
        Optional<Watchlist> watchlistEntry = watchlistRepository.findById(watchlistId);
        return watchlistEntry.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body(null));
    }

}

