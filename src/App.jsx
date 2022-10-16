import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { AuthProvider } from "./contexts/authContext";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const PostUpdate = React.lazy(() => import("./module/post/PostUpdate"));
const UserUpdate = React.lazy(() => import("./module/user/UserUpdate"));
const CategoryUpdate = React.lazy(() =>
  import("./module/category/CategoryUpdate")
);
const UserProfile = React.lazy(() => import("./module/user/UserProfile"));
const UserAddNew = React.lazy(() => import("./module/user/UserAddNew"));
const UserManage = React.lazy(() => import("./module/user/UserManage"));
const CategoryAddNew = React.lazy(() =>
  import("./module/category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("./module/category/CategoryManage")
);
const DashboardLayout = React.lazy(() =>
  import("./module/dashboard/DashboardLayout")
);
const PostAddNews = React.lazy(() => import("./module/post/PostAddNews"));
const PostManage = React.lazy(() => import("./module/post/PostManage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const PostDetailsPage = React.lazy(() => import("./pages/PostDetailsPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Suspense>
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
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
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
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
