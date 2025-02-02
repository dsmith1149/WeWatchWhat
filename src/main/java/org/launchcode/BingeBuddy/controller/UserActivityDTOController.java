package org.launchcode.BingeBuddy.controller;

import org.launchcode.BingeBuddy.data.UserActivityDTORepository;
import org.launchcode.BingeBuddy.dto.UserActivityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import org.json.*;

@RestController
@RequestMapping("/stat")
public class UserActivityDTOController {

    @Autowired
    private UserActivityDTORepository userActivityDTORepository;

    // http://localhost:8080/stat/activity/8
    @GetMapping("/activity/{id}")
    public String getAverages(@PathVariable int id) {
        List<JSONObject> jsonList = new ArrayList<>();
        UserActivityDTO activityDTO = new UserActivityDTO();

        //todo call repository to get data from query instead of this hard coding
        //activityDTO = userActivityDTORepository.getCurrentUserActivity(id);


//        activityDTO.setComments(String.valueOf(userActivityDTORepository.getCurrentUserCommentCount(id)));
//        activityDTO.setReviews(String.valueOf(userActivityDTORepository.getCurrentUserReviewCount(id)));
//        activityDTO.setWatchlists(String.valueOf(userActivityDTORepository.getCurrentUserWatchlistCount(id)));



        activityDTO.setComments("10");
        activityDTO.setReviews("15");
        activityDTO.setWatchlists("20");

        jsonList.add(createObject("Comments", activityDTO.getComments()));
        jsonList.add(createObject("Reviews", activityDTO.getReviews()));
        jsonList.add(createObject("Watchlist", activityDTO.getWatchlists()));
        return jsonList.toString();
    }


    private static JSONObject createObject(String label, String value)
    {
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("Label",label);
        jsonObj.put("Value",value);
        return jsonObj;
    }

}
