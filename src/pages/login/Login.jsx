import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../api/instance";
import { API_CONSTANT } from "../../constant";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((pre) => ({ ...pre, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post(API_CONSTANT.login, loginForm);
      dispatch(addUser(response.data.data));
      navigate("/");
    } catch (error) {
      console.error(error, "Login Error");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl font-extrabold">
            Login
          </legend>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            value={loginForm.email}
            onChange={handleChange}
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-neutral mt-4">
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
