import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../context";
import * as uuid from "uuid";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const fname = useRef(null);
  const lname = useRef(null);
  const age = useRef(null);
  const profession = useRef(null);
  const [gender, setGender] = useState("");
  const [editUser, setEditUser] = useState(false);
  const { user, setUser } = useStateValue();

  const updateUserId = location?.search.split("=")[1];

  useEffect(() => {
    if (updateUserId) {
      editUserData();
      setEditUser(true);
    }
  }, [updateUserId]);

  const editUserData = () => {
    const updated = user.find((item) => item.id === updateUserId);
    if (updated) {
      fname.current.value = updated.fname;
      lname.current.value = updated.lname;
      age.current.value = updated.age;
      profession.current.value = updated.profession;
      setGender(updated.gender);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!gender) {
      alert("Please select a gender");
      return;
    }

    if (editUser) {
      const updatedUsers = user.map((item) =>
        item.id === updateUserId
          ? {
              ...item,
              fname: fname.current.value,
              lname: lname.current.value,
              age: age.current.value,
              profession: profession.current.value,
              gender,
            }
          : item
      );
      setUser(updatedUsers); 
      localStorage.setItem("data", JSON.stringify(updatedUsers)); 
    } else {
      const newUser = {
        id: uuid.v4(),
        fname: fname.current.value,
        lname: lname.current.value,
        age: age.current.value,
        profession: profession.current.value,
        gender,
      };
      const newUsers = [...user, newUser];
      setUser(newUsers);
      localStorage.setItem("data", JSON.stringify(newUsers));
    }

    setEditUser(false);
    fname.current.value = "";
    lname.current.value = "";
    age.current.value = "";
    profession.current.value = "";
    setGender(""); 
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="h-auto w-[500px] p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold text-center mb-6 text-blue-500">
          {editUser ? "Update" : "Create"} Form
        </h2>
        <form onSubmit={handleForm} className="space-y-4">
          <input
            ref={fname}
            required
            type="text"
            placeholder="First Name"
            className="w-full outline-none bg-slate-100 py-2 px-4 rounded-lg border-2 focus:border-blue-500"
          />
          <input
            ref={lname}
            required
            type="text"
            placeholder="Last Name"
            className="w-full outline-none bg-slate-100 py-2 px-4 rounded-lg border-2 focus:border-blue-500"
          />
          <input
            ref={age}
            required
            type="number"
            placeholder="Age"
            className="w-full outline-none bg-slate-100 py-2 px-4 rounded-lg border-2 focus:border-blue-500"
          />
          <input
            ref={profession}
            required
            type="text"
            placeholder="Profession"
            className="w-full outline-none bg-slate-100 py-2 px-4 rounded-lg border-2 focus:border-blue-500"
          />

          <div className="flex items-center gap-10 justify-center">
            <label className="flex items-center gap-2">
              <input
                required
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Male"}
                className="accent-blue-500"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                required
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Female"}
                className="accent-blue-500"
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
          >
            {editUser ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
