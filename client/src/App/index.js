/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import HeaderPage from "../components/HeaderPage";

import TaskListPage from "../containers/TaskListPage";
import LoginPage from "../containers/LoginPage";
import HomePage from "../containers/HomePage";
import RegisterPage from "../containers/RegisterPage";
import ProfilePage from "../containers/ProfilePage";
import CreateTaskPage from "../containers/CreateTaskPage";

function App() {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <HeaderPage user={user} />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route
          exact
          path="/profile"
          element={user ? <ProfilePage /> : <LoginPage />}
        />
        <Route
          exact
          path="/taskList"
          element={user ? <TaskListPage /> : <LoginPage />}
        />
        <Route
          exact
          path="/createTask"
          element={user ? <CreateTaskPage /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
