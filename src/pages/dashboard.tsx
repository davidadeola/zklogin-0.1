import useAuthContext from "@/hooks/context/useAuthContext";
import React from "react";

const Dashboard = () => {
  const { user, logout } = useAuthContext();
  return (
    <div className="flex w-full flex-col gap-2 items-center justify-between">
      <h2 className="text-xl font-bold">Welcome!!!</h2>
      <p className="break-all text-center">{user?.address}</p>
      <button
        className="bg-red-600 hover:bg-red-500 px-6 py-2 cursor-pointer text-white font-semibold text-lg rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
