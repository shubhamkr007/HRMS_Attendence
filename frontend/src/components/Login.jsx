import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userData = {
        name: payload.employee_id,
        email: "",
        role: payload.role
      };
      dispatch(updateUser(userData));
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          employee_id: employeeId,
          password: password
        }
      );

      const token = response.data.access_token;

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      const userData = {
        name: payload.employee_id,
        email: "",
        role: payload.role
      };

      dispatch(updateUser(userData));
      console.log(userData)

      navigate("/");

    } catch (error) {
        console.log(error)
      alert("Invalid Credentials");

    }
  };

  return (
    <div className="bg-gray-800 h-screen w-full flex flex-col justify-center">
      <form
        onSubmit={handleLogin}
        className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
      >

        <h2 className="text-4xl text-white font-bold text-center">
          SIGN IN
        </h2>

        <div className="flex flex-col text-gray-400 py-2">
          <label>Employee ID</label>
          <input
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="text"
          />
        </div>

        <div className="flex flex-col text-gray-400 py-2">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
            type="password"
          />
        </div>

        <button className="cursor-pointer w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
          SIGN IN
        </button>

      </form>
    </div>
  );
};

export default Login;