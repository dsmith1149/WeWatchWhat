import React, { useEffect, useRef, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { Chart as ChartJS, defaults, registerables } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import userTrends from "../data/userTrends.json";
import averageUser from "../data/AverageUser.json";
import commentsReviewsTrends from "../data/CommentsReviewsTrends.json";
import commentsReviewsTrend from "../data/CommentsReviewsTrends.json";
import { data } from "react-router-dom";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

ChartJS.register(...registerables);

const DashboardTrendsComponent = () => {
  const [reviews, setReviews] = useState();
  const [comments, setComments] = useState();
  const [watchlists, setWatchlists] = useState();

  const [error, setError] = useState();

  // const [chartData, setChartData] = useState({
  //   labels: ["Reviews", "Comments", "Watchlists"],
  //   datasets: [
  //     {
  //       label: "User Activity Stats",
  //       data: [12, 19, 3],
  //       backgroundColor: [
  //         "rgba(43, 63, 229, 0.8)",
  //         "rgba(250, 192, 19, 0.8)",
  //         "rgba(253, 135, 135, 0.8)",
  //       ],
  //       borderColor: [
  //         "rgba(43, 63, 229, 0.8)",
  //         "rgba(250, 192, 19, 0.8)",
  //         "rgba(253, 135, 135, 0.8)",
  //       ],
  //     },
  //   ],
  // });

  const chartRef = useRef(null);

  function loadStats() {
    setReviews({ reviews });
    setComments({ comments });
    setWatchlists({ watchlists });
  }

  useEffect(() => {
    // if (chartRef.current) {
    //   chartRef.current.Chart.update();
    // }

    loadReviews();
    loadComments();
    loadWatchlists();

    // loadStats();
  }, []);
  // }, [chartData]);

  const handleDataChange = ({ reviews, comments, watchlists }) => {
    setChartData({
      labels: ["Reviews", "Comments", "Watchlists"],
      datasets: [
        {
          label: "User Activity Stats",
          data: [{ reviews }, { comments }, { watchlists }],
          backgroundColor: [
            "rgba(43, 63, 229, 0.8)",
            "rgba(250, 192, 19, 0.8)",
            "rgba(253, 135, 135, 0.8)",
          ],
          borderColor: [
            "rgba(43, 63, 229, 0.8)",
            "rgba(250, 192, 19, 0.8)",
            "rgba(253, 135, 135, 0.8)",
          ],
        },
      ],
    });
  };

  const loadReviews = async (e) => {
    const response = await axios
      .get("http://localhost:8080/user-reviews-count/1")
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  };

  const loadComments = async (e) => {
    const response = await axios
      .get("http://localhost:8080/user-reviews-count/1")
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  };

  const loadWatchlists = async (e) => {
    const response = await axios
      .get("http://localhost:8080/user-reviews-count/1")
      .then((response) => {
        setWatchlists(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the data", error);
      });
  };

  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>

      <div className="container">
        <div className="App-card">
          <h1 className="center">
            Your Trends : Reviews, Comments & Watchlists
          </h1>
          {/* {loadStats}
        <Doughnut data={data} options={options}></Doughnut> */}

          <div className="dataCard categoryCard">
            <Doughnut
              data={{
                labels: ["Reviews", "Comments", "Watchlists"],
                datasets: [
                  {
                    label: "User Activity Stats",
                    // data: commentsReviewsTrends.map((data) => data.value),
                    data: [10, 20, 30],
                    // data: [{ reviews }, { comments }, { watchlists }],
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                      "rgba(253, 135, 135, 0.8)",
                    ],
                    borderColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(250, 192, 19, 0.8)",
                      "rgba(253, 135, 135, 0.8)",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "",
                    // text: "Reviews, Comments & Watchlists",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <label>{error}</label>
      </div>
      {/* <div>
        <Doughnut ref={chartRef} data={chartData} />
        <button onClick={handleDataChange}> Change Data</button>
      </div> */}

      <div></div>
    </div>
  );
};

export default DashboardTrendsComponent;
