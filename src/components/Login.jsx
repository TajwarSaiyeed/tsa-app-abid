import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";

const Login = () => {
  const { signInUser, user, loader } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        form.reset();
        console.log("Succesfully sign in");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loader) {
    return (
      <button
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        className="btn btn-square loading"
      ></button>
    );
  }
  if (user && user.uid) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="flex flex-col glass justify-center items-center gap-2 m h-screen">
      <h2>Please Register</h2>
      <form
        onSubmit={handleSignIn}
        className="border p-5 rounded-lg w-96 items-center flex justify-center flex-col"
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Type Your Email..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Type Your Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mt-5">
          <button className="btn glass text-white bg-cyan-600" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
