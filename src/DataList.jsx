import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { initializeApp } from "firebase/app";
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
const database = getDatabase(firebaseApp);

function DataList(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userArray = Object.values(data);

        setUsers(userArray);
      }
    });
  }, []);

  const handleDelete = (id) => {
    remove(ref(database, `users/${id}`));
    console.log("Deleting user with id:", id);
  };
  return (
    <div className="bg-green-100 w-full py-[50px]">
      <div className="bg-gray-200 my-2 ">
        <button onClick={() => navigate("../")} className="bg-blue-500 p-5">
          Read Data
        </button>
      </div>
      <div className="">
        <table className="border-collapse border border-black mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => {
              return (
                <>
                  <td className="border border-black px-4 py-2">{item.name}</td>
                  <td className="border border-black px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-black px-4 py-2">
                    {item.phone}
                  </td>
                  <td className="border border-black  px-4 py-2">
                    {item.address}
                  </td>
                  <div className="border-t border-black">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 p-2 rounded-xl"
                    >
                      Delete
                    </button>
                    <button className="bg-green-500 p-2 px-3 rounded-xl">
                      Edit
                    </button>
                  </div>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataList;
