import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./components/Body";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Feed from "./pages/feed/Feed";
import { ROUTE_CONSTANT } from "./constant";
import Connections from "./pages/connections/Connections";
import Requests from "./pages/requests/Requests";
import { Chat } from "./pages/Chat/Chat";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path={ROUTE_CONSTANT.login} element={<Login />} />
            <Route path={ROUTE_CONSTANT.profile} element={<Profile />} />
            <Route
              path={ROUTE_CONSTANT.connections}
              element={<Connections />}
            />
            <Route path={ROUTE_CONSTANT.requests} element={<Requests />} />
            <Route path={ROUTE_CONSTANT.chat} element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
