import useAuthContext from "@/hooks/context/useAuthContext";
import React from "react";

const Dashboard = () => {
  const { user, logout } = useAuthContext();
  return (
    <div className="flex flex-col">
      <div>Welcome!!!</div>
      <p>{user?.address}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
