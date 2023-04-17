import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCtObmGtua_MB7P1tbvh3mX8Xhp0_KiKvA",
  authDomain: "react-form-c6eb7.firebaseapp.com",
  databaseURL: "https://react-form-c6eb7-default-rtdb.firebaseio.com",
  projectId: "react-form-c6eb7",
  storageBucket: "react-form-c6eb7.appspot.com",
  messagingSenderId: "227220791246",
  appId: "1:227220791246:web:649f93953f1caf1d9c159f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

function DataForm(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
  });

  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const postData = (e) => {
    e.preventDefault();
    const { name, email, address, phone, message } = user;
    const id = uuidv4();
    push(ref(db, "users"), {
      id,
      name,
      email,
      address,
      phone,
      message,
    });
    setUser({
      name: "",
      email: "",
      address: "",
      phone: "",
      message: "",
    });
    alert("Data Sent Successfully");
    console.log(newUserRef);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1280px] py-[50px] ">
        <div className="bg-gray-200 my-2 ">
          <button
            onClick={() => navigate("../read")}
            className="bg-blue-500 p-5"
          >
            Read Data
          </button>
        </div>
        <div className="w-[500px] rounded-2xl bg-sky-500 px-[50px]  mx-auto">
          <h1 className="text-center text-white text-3xl py-5">
            Send Data To FireBase
          </h1>
          <form onSubmit={postData}>
            <div className="flex justify-between py-5">
              <input
                type="text"
                name="name"
                value={user.name}
                placeholder="Name"
                onChange={getUserData}
                className="rounded-lg py-1 px-2"
              />
              <input
                type="text"
                name="email"
                value={user.email}
                placeholder="Email"
                onChange={getUserData}
                className="rounded-lg py-1 px-2"
              />
            </div>
            <div className="flex justify-between">
              <input
                type="number "
                name="phone"
                value={user.phone}
                placeholder="Mobile No"
                onChange={getUserData}
                className="rounded-lg py-1 px-2"
              />
              <input
                type="text"
                name="address"
                value={user.address}
                placeholder="Address"
                onChange={getUserData}
                className="rounded-lg py-1 px-2"
              />
            </div>
            <div className="px-[80px] py-5">
              <textarea
                name="message"
                value={user.message}
                onChange={getUserData}
                placeholder="Your Message"
                className="rounded-lg py-1 px-2"
              ></textarea>
            </div>
            <div className="py-5 px-[30%]">
              <input
                type="submit"
                value="Send"
                className="bg-pink-500 text-white py-1 px-5 rounded-lg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DataForm;
