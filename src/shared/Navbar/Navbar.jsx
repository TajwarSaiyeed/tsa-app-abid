import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { user, userSignOut, signInGoogle } = useContext(AuthContext);
  console.log(user);
  const photo = user?.photoURL;
  // console.log(photo);
  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        console.log("signout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignInNav = () => {
    signInGoogle()
      .then(() => {
        // setUser(result.user);
        // console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          TSA APP
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div>
            {user && user.emailVerified === true ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="btn glass mx-2 bg-red-600"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline mx-2"
                  onClick={googleSignInNav}
                >
                  Google
                </button>
                <Link to="/login" className="btn mx-2 btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
        {user?.emailVerified === true && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={photo ? photo : "https://placeimg.com/192/192/people"}
                  alt=""
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a href="/">Settings</a>
              </li>
              <li>
                <a href="/">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
