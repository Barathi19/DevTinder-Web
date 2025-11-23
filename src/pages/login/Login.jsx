import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../api/instance";
import { API_CONSTANT, ROUTE_CONSTANT } from "../../constant";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hydrate, setHydrate] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formField, setFormField] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((pre) => ({ ...pre, [name]: value }));
  };

  const handleLogin = async () => {
    setError("");
    try {
      const { emailId, password } = formField;
      const response = await apiInstance.post(API_CONSTANT.login, {
        emailId,
        password,
      });
      dispatch(addUser(response.data.data));
      setHydrate(true);
      navigate("/");
    } catch (error) {
      console.error(error, "Login Error");
      setError(error.response.data.error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await apiInstance.post(API_CONSTANT.signUp, formField);
      setHydrate(true);
      dispatch(addUser(response.data.data));
      navigate(ROUTE_CONSTANT.profile);
    } catch (error) {
      console.error(error, "Signup Error");
      setError(error.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  useEffect(() => {
    if (!hydrate && user) {
      navigate("/");
    }
  }, [navigate, user, hydrate]);

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl font-extrabold">
            {isLogin ? "Login" : "Signup"}
          </legend>
          {!isLogin && (
            <>
              <label className="label">First Name</label>
              <input
                className="input"
                placeholder="First name"
                name="firstName"
                value={formField.firstName}
                onChange={handleChange}
                required
              />
              <label className="label">Last Name</label>
              <input
                className="input"
                placeholder="Last name"
                name="lastName"
                value={formField.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="emailId"
            value={formField.emailId}
            onChange={handleChange}
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={formField.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button type="submit" className="btn btn-neutral mt-2">
            {isLogin ? "Login" : "Signup"}
          </button>
          <p
            className="cursor-pointer hover:text-blue-300 mx-auto my-2"
            onClick={() => setIsLogin((pre) => !pre)}
          >
            {isLogin ? "New user? Signup here" : "Existing user? Login here"}
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
