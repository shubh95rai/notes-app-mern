import { useState } from "react";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { setToken } from "../../utils/auth";
import LoadingButton from "@/components/LoadingButton";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setName(name);
    setEmail(email);
    setPassword(password);

    setError(null);

    //sign up API call
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/create-account", {
        name,
        email,
        password,
      });

      if (!response.data.success) {
        setError(response.data.message);
        return;
      }

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
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-96  rounded-lg border px-7 py-10  bg-white">
          <form onSubmit={handleSignUp}>
            <h4 className=" mb-7 text-2xl font-medium">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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

            {error && <p className="text-red-500 text-xs  mb-2">{error}</p>}

            {/* <button className="btn-primary" type="submit">
              Create Account
            </button> */}

            <LoadingButton pending={isLoading}>Create Account</LoadingButton>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-2 text-my-primary font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
