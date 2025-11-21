import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import apiInstance from "../api/instance";
import { API_CONSTANT } from "../constant";
import { addUser } from "../store/slices/user";
import { useCallback, useEffect } from "react";

export const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUser = useCallback(async () => {
    if (user) return;
    try {
      const response = await apiInstance.get(API_CONSTANT.viewProfile);
      dispatch(addUser(response.data.data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, user]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <div className="flex flex-1 w-full p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
