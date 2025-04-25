import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import { setToken } from "../../utils/auth";
import axiosInstance from "../../utils/axiosInstance";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters long");
    //   return;
    // }

    setEmail(email);
    setPassword(password);

    setError(null);

    //login API call
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data.success && response.data.accessToken) {
        setToken(response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An expected error occurred. Please try again.");
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-96  rounded-lg border px-7 py-10  bg-white">
          <form onSubmit={handleLogin}>
            <h4 className=" mb-7 text-2xl font-medium">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

            <button className="btn-primary" type="submit">
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="underline underline-offset-2 text-my-primary font-medium"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
