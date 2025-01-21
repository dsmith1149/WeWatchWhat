package org.launchcode.BingeBuddy.data;

import org.launchcode.BingeBuddy.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByMovieId(Integer movieId);

    List<Review> findByUser_Id(Integer userId);
}
