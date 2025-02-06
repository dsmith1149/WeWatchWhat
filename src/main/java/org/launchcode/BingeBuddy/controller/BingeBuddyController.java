package org.launchcode.BingeBuddy.controller;

import org.launchcode.BingeBuddy.config.APIConfiguration;
import org.launchcode.BingeBuddy.data.*;
import org.launchcode.BingeBuddy.model.*;
import org.launchcode.BingeBuddy.data.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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
    private UserEntityRepository userEntityRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private UserActivityDTORepository userActivityDTORepository;

    @Autowired
    private APIConfiguration apiConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    // /movie/:movieId)
    @GetMapping("/movies/{imdbID}")
    public ResponseEntity<Movie> getMovieDetails(@PathVariable String imdbID) {
        Optional<Movie> existingMovie = movieRepository.findByImdbId(imdbID);

        if (existingMovie.isPresent()) {
            return ResponseEntity.ok(existingMovie.get());
        }


        String apiUrl = String.format("%s?i=%s&apikey=%s", apiConfig.getApiUrl(), imdbID, apiConfig.getApiKey());
        Movie movie = restTemplate.getForObject(apiUrl, Movie.class);

        if (movie != null) {
            movieRepository.save(movie); // ✅ Ensure movie is saved before returning
            return ResponseEntity.ok(movie);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    // /search-movie)
    @GetMapping("/search-movie")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String query) {
        String apiUrl = String.format("%s?s=%s&apikey=%s", apiConfig.getApiUrl(), query, apiConfig.getApiKey());
        SearchResponse response = restTemplate.getForObject(apiUrl, SearchResponse.class);

        if (response != null && response.getMovies() != null) {
            return ResponseEntity.ok(response.getMovies());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // /user-reviews/:userId)
    @GetMapping("/user-reviews/{userId}")
    public ResponseEntity<List<Review>> getAllReviewsByUserID(@PathVariable Integer userId) {
        List<Review> reviewList = reviewRepository.findByUserId(userId);
        return ResponseEntity.ok(reviewList);
    }

    // /user-comments/:userId)
    @GetMapping("/user-comments/{userId}")
    public ResponseEntity<List<Comment>> getAllCommentsByUserID(@PathVariable Integer userId) {
        List<Comment> commentList = commentRepository.findByUserId(userId);
        return ResponseEntity.ok(commentList);
    }

    // /user-watchlists/:userId)
    @GetMapping("/user-watchlists/{userId}")
    public ResponseEntity<List<Watchlist>> getAllWatchlistsByUserID(@PathVariable Integer userId) {
        List<Watchlist> watchlistList = watchlistRepository.findAllByUserId(userId);
        return ResponseEntity.ok(watchlistList);
    }

    // /user-watchlists/:userId)
    @PostMapping("/user-watchlists/{userId}")
    public ResponseEntity<String> addToWatchlist(
            @PathVariable Integer userId,
            @RequestParam String imdbId,
            @RequestParam WatchlistStatus status) {

        Optional<Movie> movie = movieRepository.findByImdbId(imdbId);
        if (movie.isEmpty()) {
            return ResponseEntity.badRequest().body("Movie not found.");
        }

        Optional<User> user = userEntityRepository.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        Watchlist watchlistEntry = new Watchlist();
        watchlistEntry.setMovie(movie.get());
        watchlistEntry.setUser(user.get());
        watchlistEntry.setStatus(status);

        watchlistRepository.save(watchlistEntry);
        return ResponseEntity.ok("Movie added to watchlist.");
    }

    // /single-movie/:movieId/reviews)
    @GetMapping("/movies/{imdbId}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable String imdbId) {
        Optional<Movie> movie = movieRepository.findByImdbId(imdbId);  // ✅ Find Movie by imdbId

        if (movie.isEmpty()) {
            return ResponseEntity.notFound().build();  // ❌ Movie not found, return 404
        }

        List<Review> reviews = reviewRepository.findByMovie(movie.get());  // ✅ Fetch Reviews
        return ResponseEntity.ok(reviews);
    }

    // /single-movie/:movieId/reviews)
    @PostMapping("/movies/{imdbId}/reviews")
    public ResponseEntity<String> createReview(
            @PathVariable String imdbId,
            @RequestBody Review review) {

        Optional<Movie> movie = movieRepository.findByImdbId(imdbId);
        if (movie.isEmpty()) {
            return ResponseEntity.badRequest().body("Movie not found.");
        }

        Optional<User> user = userEntityRepository.findById(review.getUser().getId());
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        review.setMovie(movie.get());
        review.setUser(user.get());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        reviewRepository.save(review);
        return ResponseEntity.ok("Review created successfully.");
    }

    // /reviews/:reviewId/comments)
    @GetMapping("/reviews/{reviewId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByReview(@PathVariable Integer reviewId) {
        List<Comment> comments = commentRepository.findByReview_Id(reviewId);
        return ResponseEntity.ok(comments);
    }

    // /reviews/:reviewId/comments)
    @PostMapping("/reviews/{reviewId}/comments")
    public ResponseEntity<String> createComment(@PathVariable Integer reviewId, @RequestBody Comment comment) {
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

    // /review-rate/:reviewId)
    @GetMapping("/review-rate/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer reviewId) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        return review.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // /comments/:commentId)
    @GetMapping("/comments/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Integer commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        return comment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // /reviews/:reviewId)
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Integer reviewId) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if (review.isEmpty()) {
            return ResponseEntity.badRequest().body("Review not found.");
        }

        reviewRepository.delete(review.get());
        return ResponseEntity.ok("Review deleted successfully.");
    }

    // /comments/:commentId)
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isEmpty()) {
            return ResponseEntity.badRequest().body("Comment not found.");
        }

        commentRepository.delete(comment.get());
        return ResponseEntity.ok("Comment deleted successfully.");
    }
}