import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ListUserComponent from "./components/ListUserComponent";
// import UserComponent from "./components/UserComponent";
// import FooterComponent from "./components/FooterComponent";
// import HomePageComponent from "./components/HomePageComponent";
// import NavBarComponent from "./components/NavBarComponent";
// import LoginPageComponent from "./components/LoginPageComponent";
// import SearchMovieComponent from "./components/SearchMovieComponent";
// import SearchUserComponent from "./components/SearchUserComponent";
// import SignUpPageComponent from "./components/SignUpPageComponent";
// import DashboardMainComponent from "./components/DashboardMainComponent";
// import DashboardProfileComponent from "./components/DashboardProfileComponent";
// import DashboardReviewComponent from "./components/DashboardReviewComponent";
// import DashboardSettingsComponent from "./components/DashboardSettingsComponent";
// import DashboardTrendsComponent from "./components/DashboardTrendsComponent";
// import DashboardWatchlistsComponent from "./components/DashboardWatchlistsComponent";
// import CommentsComponent from "./components/CommentsComponent";
// import ReviewsRatingsComponent from "./components/ReviewsRatingsComponent";
// import DashboardCommentsComponent from "./components/DashboardCommentsComponent";
// import SingleMovieComponent from "./components/SingleMovieComponent";

import ListUserComponent from "./components/ListUserComponent";
import UserComponent from "./components/UserComponent";
import FooterComponent from "./components/FooterComponent";
import HomePageComponent from "./components/HomePageComponent";
import NavBarComponent from "./components/NavBarComponent";
import LoginPageComponent from "./components/LoginPageComponent";
import SearchMovieComponent from "./components/SearchMovieComponent";
import SearchUserComponent from "./components/SearchUserComponent";
import SignUpPageComponent from "./components/SignUpPageComponent";
import DashboardMainComponent from "./components/DashboardMainComponent";
import DashboardProfileComponent from "./components/DashboardProfileComponent";
import DashboardReviewComponent from "./components/DashboardReviewComponent";
import DashboardSettingsComponent from "./components/DashboardSettingsComponent";
import DashboardTrendsComponent from "./components/DashboardTrendsComponent";
import DashboardWatchlistsComponent from "./components/DashboardWatchlistsComponent";
import CommentsComponent from "./components/CommentsComponent";
import ReviewsRatingsComponent from "./components/ReviewsRatingsComponent";
import DashboardCommentsComponent from "./components/DashboardCommentsComponent";
import SingleMovieComponent from "./components/SingleMovieComponent";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const [user, setUser] = useState(null);
  // const login = (userData) => {
  //   setUser(userData);
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <NavBarComponent /> */}
          <Routes>
            <Route path="/" element={<LoginPageComponent />}></Route>
            <Route path="/signup" element={<SignUpPageComponent />}></Route>

            {/* <Route path='/' element={<HomePageComponent />}></Route> */}
            {/* <Route path='/login' element={<LoginPageComponent />}></Route> */}

            <Route
              path="/search-movie"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <SearchMovieComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/search-user"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <SearchUserComponent />
                </ProtectedRoute>
              }
            ></Route>
            {/* <Route path="/list-users" element={<ListUserComponent />}></Route> */}
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <ListUserComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/add-user"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <UserComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/update-user/:id" element={<UserComponent />}></Route>
            <Route path="/comments/1" element={<CommentsComponent />}></Route>
            <Route
              path="/review-rate/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <ReviewsRatingsComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/dashboard-main/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <DashboardMainComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/user-profile/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <DashboardProfileComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/user-reviews/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <DashboardReviewComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/user-comments/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <DashboardCommentsComponent />
                </ProtectedRoute>
              }
            ></Route>
            {/* <Route
              path="/user-settings/1"
              element={<DashboardSettingsComponent />}
            ></Route> */}
            <Route
              path="/user-trends/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <DashboardTrendsComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/user-watchlists/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <DashboardWatchlistsComponent />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="single-movie/1"
              element={
                <ProtectedRoute>
                  <NavBarComponent />
                  <SingleMovieComponent />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
