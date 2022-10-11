import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { AuthProvider } from "./contexts/authContext";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import PostManage from "./module/post/PostManage";
import PostAddNews from "./module/post/PostAddNews";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import CategoryManage from "./module/category/CategoryManage";
import CategoryAddNew from "./module/category/CategoryAddNew";
import UserManage from "./module/user/UserManage";
import UserAddNew from "./module/user/UserAddNew";
import UserProfile from "./module/user/UserProfile";
import CategoryUpdate from "./module/category/CategoryUpdate";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNews></PostAddNews>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
