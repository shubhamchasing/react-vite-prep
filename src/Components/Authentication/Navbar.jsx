import { useContext } from "react";
import { UserContext } from "./userContext";

const Navbar = () => {
  const { isLoggedIn, login, logout } = useContext(UserContext);

  return (
    <nav>
      <h1>App</h1>
      {isLoggedIn ? (
        <>
          <span>Welcome, User!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
