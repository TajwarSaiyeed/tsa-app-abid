import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";

const Signup = () => {
  const { createNewUser, updateUser, user, loader } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // eslint-disable-next-line no-unused-vars
    const cPassword = form.cPassword.value;

    // console.log(createNewUser, name, email, password, cPassword);
    createNewUser(email, password)
      .then((result) => {
        updateUser(name)
          .then(() => {
            console.log("Successfully register and name : ", name);
            form.reset();
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });

        console.log(result.user);
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
      <h2 className="text-2xl font-bold uppercase">Please Register</h2>
      <form
        onSubmit={handleSignUp}
        className="border  p-5 rounded-lg w-96 items-center flex justify-center flex-col"
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Type Your Email..."
            className="input input-bordered w-full max-w-xs"
            required
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
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            name="cPassword"
            type="password"
            placeholder="Retype Your Password"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="my-2">
          <button className="btn glass gap-2" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
