import React, { useEffect } from "react";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user, setUser } = useStateValue();
  const navigate = useNavigate();

  const deleteUser = (id) => {
    const newUser = user.filter((item) => item.id !== id);
    setUser(newUser);
    localStorage.setItem("data", JSON.stringify(newUser));
  };
  const editUser = (id) => {
    navigate(`/login?q=${id}`);
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data")) || [];
    setUser(localData);
  }, [setUser]);
  return (
    <div className="w-full min-h-screen py-10 ">
      <h2 className="text-center text-2xl mb-6">Users</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 gap-1 space-y-1"
          >
            <div className="h-[150px] w-[150px] rounded-full bg-slate-300 overflow-hidden"></div>
            <h1 className="text-lg font-bold text-gray-700 mt-4">
              {item.fname} {item.lname}
            </h1>
            <p className="text-sm text-gray-500">{item.profession}</p>
            <p className="text-sm text-gray-500">{item.age} years old</p>
            <p className="text-sm text-gray-500">Gender: {item.gender}</p>
            <div className="w-full flex gap-1 items-center justify-center">
              <button
                onClick={() => deleteUser(item.id)}
                className="bg-red-500 text-white py-1 px-5 rounded-lg "
              >
                Delete
              </button>
              <button
                onClick={() => editUser(item.id)}
                className="bg-blue-500 text-white py-1 px-5 rounded-lg "
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
