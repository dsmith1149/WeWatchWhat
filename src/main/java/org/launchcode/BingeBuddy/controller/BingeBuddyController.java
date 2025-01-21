package org.launchcode.BingeBuddy.controller;


import org.launchcode.BingeBuddy.config.APIConfiguration;
import org.launchcode.BingeBuddy.data.*;
import org.launchcode.BingeBuddy.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class BingeBuddyController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ReviewRepository reviewRepository;

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
    @GetMapping("/watchlist/{watchlistId}")
    public ResponseEntity<List<Watchlist>> getWatchlist() {
        List<Watchlist> watchlist = watchlistRepository.findAll();
        return ResponseEntity.ok(watchlist);
    }

    // Endpoint: Remove a movie from the watchlist
    @DeleteMapping("/watchlist/{watchlistId}")
    public ResponseEntity<String> removeFromWatchlist(@RequestParam Integer watchlistId) {
        Optional<Watchlist> watchlistEntry = watchlistRepository.findById(watchlistId);
        if (watchlistEntry.isPresent()) {
            watchlistRepository.delete(watchlistEntry.get());
            return ResponseEntity.ok("Watchlist entry removed.");
        } else {
            return ResponseEntity.badRequest().body("Watchlist entry not found.");
        }
    }


    @PostMapping("/review")
    public ResponseEntity<String> createReview(@RequestParam Integer movieId, @RequestBody Review review) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty()) {
            return ResponseEntity.badRequest().body("Movie not found.");
        }

        review.setMovie(movie.get());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        reviewRepository.save(review);

        return ResponseEntity.ok("Review created successfully.");
    }

    // Read all reviews for a movie
    @GetMapping("/review")
    public ResponseEntity<List<Review>> getReviews(@RequestParam Integer movieId) {
        List<Review> reviews = reviewRepository.findByMovieId(movieId);
        return ResponseEntity.ok(reviews);
    }

    // Read a single review by ID
    @GetMapping("review/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer reviewId) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        return review.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a review
    @PutMapping("review/{reviewId}")
    public ResponseEntity<String> updateReview(@PathVariable Integer reviewId, @RequestBody Review updatedReview) {
        Optional<Review> existingReview = reviewRepository.findById(reviewId);
        if (existingReview.isEmpty()) {
            return ResponseEntity.badRequest().body("Review not found.");
        }

        Review review = existingReview.get();
        review.setContent(updatedReview.getContent());
        review.setRating(updatedReview.getRating());
        review.setUpdatedAt(LocalDateTime.now());

        reviewRepository.save(review);
        return ResponseEntity.ok("Review updated successfully.");
    }

    // Delete a review
    @DeleteMapping("review/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Integer reviewId) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if (review.isEmpty()) {
            return ResponseEntity.badRequest().body("Review not found.");
        }

        reviewRepository.delete(review.get());
        return ResponseEntity.ok("Review deleted successfully.");
    }

    @PostMapping("/comments")
    public ResponseEntity<String> createComment(@RequestParam Integer reviewId, @RequestBody Comment comment) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if (review.isEmpty()) {
            return ResponseEntity.badRequest().body("Review not found.");
        }

        comment.setReview(review.get());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        commentRepository.save(comment);

        return ResponseEntity.ok("Comment added successfully.");
    }

    // Get all comments for a specific review
    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getCommentsByReview(@RequestParam Integer reviewId) {
        List<Comment> comments = commentRepository.findByReview_Id(reviewId);
        return ResponseEntity.ok(comments);
    }

    // Get a single comment by ID
    @GetMapping("comments/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Integer commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        return comment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a comment
    @PutMapping("comments/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable Integer commentId, @RequestBody Comment updatedComment) {
        Optional<Comment> existingComment = commentRepository.findById(commentId);
        if (existingComment.isEmpty()) {
            return ResponseEntity.badRequest().body("Comment not found.");
        }

        Comment comment = existingComment.get();
        comment.setContent(updatedComment.getContent());
        comment.setUpdatedAt(LocalDateTime.now());
        commentRepository.save(comment);

        return ResponseEntity.ok("Comment updated successfully.");
    }

    // Delete a comment
    @DeleteMapping("comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isEmpty()) {
            return ResponseEntity.badRequest().body("Comment not found.");
        }

        commentRepository.delete(comment.get());
        return ResponseEntity.ok("Comment deleted successfully.");
    }

}

