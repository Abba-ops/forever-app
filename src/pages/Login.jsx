import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Login") {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error("Invalid email or password.");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful! Welcome.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/");
      toast.info("You are already logged in.");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <input
          required
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
        />
      )}
      <input
        required
        type="email"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
      />
      <input
        required
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer">
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
