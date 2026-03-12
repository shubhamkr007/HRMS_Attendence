import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Attendance = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);


    useEffect(() => {

        const checkAttendance = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:8000/attendance/check/${user.name}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                if (response.data.signedIn) {
                    setSignedIn(true);
                }

            } catch (error) {
                console.log("Attendance check failed");
            }

        };

        checkAttendance();

    }, []);

  const markSignIn = async () => {

    try {

      setLoading(true);

      const now = new Date().toLocaleTimeString();

      await axios.post(
        "http://localhost:8000/attendance/signin",
        {
          employee_id: user.name,
          date: today,
          signin_time: now
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setSignedIn(true);

      alert("Signed IN successfully");

    } catch (error) {

      alert("You already signed in today");

    } finally {

      setLoading(false);

    }

  };

  const markSignOut = async () => {

    try {

      const now = new Date().toLocaleTimeString();

      await axios.put(
        "http://localhost:8000/attendance/signout",
        {
          employee_id: user.name,
          date: today,
          signout_time: now
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Signed OUT successfully");

      navigate("/");

    } catch (error) {

      alert("Sign OUT failed");

    }

  };

  return (

    <div className="bg-gray-800 w-full h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl text-white font-bold mb-10">
        Attendance Portal
      </h1>

      <div className="flex gap-4">

        {!signedIn ? (

          <>
            <button
              onClick={markSignIn}
              disabled={loading}
              className="bg-green-500 px-8 py-3 rounded-lg text-white text-xl hover:bg-green-600"
            >
              {loading ? "Signing In..." : "Sign IN"}
            </button>

            <button
              disabled
              className="cursor-not-allowed bg-red-900 px-8 py-3 rounded-lg text-white text-xl"
            >
              Sign IN First
            </button>
          </>

        ) : (

          <>
            <button
              disabled
              className="cursor-not-allowed bg-green-900 px-8 py-3 rounded-lg text-white text-xl"
            >
              Already Signed IN
            </button>

            <button
              onClick={markSignOut}
              className="bg-red-500 px-8 py-3 rounded-lg text-white text-xl hover:bg-red-600"
            >
              Sign OUT
            </button>

            
          </>

        )}

          </div>
          <a
              onClick={() => navigate(`/attendance/${user.name}`)}
              className=" text-blue-300 underline cursor-pointer mt-2"
          >
              View Attendance
          </a>

      </div>
  );
};

export default Attendance;