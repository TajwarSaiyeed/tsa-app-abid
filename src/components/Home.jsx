import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/UserContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { photoURL, displayName, emailVerified } = user;
  const photo = photoURL;
  const mycards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (emailVerified !== true) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div className="min-h-screen ">
      <div className="flex lg:flex-row md:fled-row sm:flex-col flex-col w-full justify-evenly items-center h-52">
        <h1 className="text-5xl font-bold">{displayName}</h1>
        <div>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={photo ? photo : "https://placeimg.com/192/192/people"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="w-full p-5 grid justify-items-center lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 bg-gray-200">
        {mycards.map((mycard) => (
          <div key={mycard} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                className="w-full"
                src="https://placeimg.com/400/225/arch"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
