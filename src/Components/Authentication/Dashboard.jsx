import { useContext } from "react";
import { UserContext } from "./userContext";

const Dashboard = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="dashboard">
      <h2>
        {isLoggedIn
          ? "This is your dashboard"
          : "Please login to access your dashboard"}
      </h2>
    </div>
  );
};

export default Dashboard;
