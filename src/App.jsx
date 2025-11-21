import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./components/Body";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Feed from "./pages/feed/Feed";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
