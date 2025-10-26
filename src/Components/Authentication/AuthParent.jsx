import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { UserProvider } from "./userContext";
import "./styles.css"

const AuthParent = () => {
  return (
    <UserProvider>
      <div className="header-bar">
        <Navbar />
        <Dashboard />
      </div>
    </UserProvider>
  );
};

export default AuthParent;
