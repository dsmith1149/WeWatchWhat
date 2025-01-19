package org.launchcode.BingeBuddy.controller;

import jakarta.validation.Valid;
import org.launchcode.BingeBuddy.model.Comment;
import org.launchcode.BingeBuddy.model.Movie;
import org.launchcode.BingeBuddy.model.Review;
import org.launchcode.BingeBuddy.model.Watchlist;
//import org.launchcode.BingeBuddy.utils.JWTUtility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/")
public class BingeBuddyController {


    // Movies
    @GetMapping("/movies/{apiId}")
    public ResponseEntity<Movie> getMovieByApiId(@PathVariable String apiId) {
        return null;
    }

    @PostMapping("/movies/details")
    public ResponseEntity<Movie> postMovieDetails(@RequestParam String apiId) {
        return null;
    }


    @PostMapping("/movies/associate")
    public ResponseEntity<String> associateMovieWithUser(@RequestParam String apiId, @RequestParam String userId) {
        return null;
    }

    @GetMapping("/movies/fromToken")
    public ResponseEntity<Movie> getMovieFromToken(@RequestParam String token) {
return null;

    }
}
