import React from "react";
import SidebarComponent from "./SidebarComponent";
import { Chart as ChartJS, defaults } from "chart.js/auto";
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

const DashboardTrendsComponent = () => {
  return (
    <div className="flex">
      <div>
        <SidebarComponent />
      </div>

      <div>
        <h1 className="header center"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trends</h1>
      </div>

      <div className="App">
        {/* <div dataCard revenueCard>
          <h1 className="header center">Track your Activity</h1>
        </div> */}

        {/* <div className="dataCard revenueCard">
          <Line
            data={{
              labels: userTrends.map((data) => data.label),
              datasets: [
                {
                  label: "Average User",
                  data: userTrends.map((data) => data.userAverage),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Current User",
                  data: userTrends.map((data) => data.user),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Current User vs Average User Comparision",
                },
              },
            }}
          />
        </div> */}

        <div className="dataCard customerCard">
          <Bar
            data={{
              labels: averageUser.map((data) => data.label),
              datasets: [
                {
                  label: "Average User",
                  data: averageUser.map((data) => data.userAverage),
                  backgroundColor: ["rgba(43, 63, 229, 0.8)"],
                  borderColor: "#064FF0",
                  borderRadius: 5,
                },
                {
                  label: "Current User",
                  data: averageUser.map((data) => data.userCurrent),
                  backgroundColor: ["rgba(253, 135, 135, 0.8)"],
                  borderColor: "#064FF0",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: " Average User vs Current User",
                },
              },
            }}
          />
        </div>
        <div className="dataCard categoryCard">
          <Doughnut
            data={{
              labels: commentsReviewsTrends.map((data) => data.label),
              datasets: [
                {
                  label: "Count",
                  data: commentsReviewsTrends.map((data) => data.value),
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
            }}
            options={{
              plugins: {
                title: {
                  text: "Reviews, Comments & Watchlists",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTrendsComponent;
