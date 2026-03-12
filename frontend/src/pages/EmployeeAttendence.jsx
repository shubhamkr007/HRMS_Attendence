import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeAttendance = () => {

  const { id } = useParams();

  const [user, setUser] = useState({});
  const [attendance, setAttendance] = useState([]);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8000/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(response.data);

    } catch (error) {
      console.log("User fetch failed");
    }

  };

  const fetchAttendance = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8000/attendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAttendance(response.data);

    } catch (error) {
      console.log("Attendance fetch failed");
    }

  };

  useEffect(() => {

    if (!id) return;

    fetchUser();
    fetchAttendance();

  }, [id]);

  return (

    <div className="bg-gray-800 min-h-screen p-10 mt-20 w-full">

      {/* User Info */}

      <div className="bg-gray-900 p-6 rounded-lg mb-10">

        <h1 className="text-3xl text-white font-bold mb-6">
          Employee Profile
        </h1>

        <div className="text-gray-300 space-y-2">

          <p><span className="text-white font-semibold">Name:</span> {user.full_name}</p>

          <p><span className="text-white font-semibold">Email:</span> {user.email}</p>

          <p><span className="text-white font-semibold">Department:</span> {user.department}</p>

          <p><span className="text-white font-semibold">Role:</span> {user.role}</p>

        </div>

      </div>

      {/* Attendance Table */}

      <div className="bg-gray-900 p-6 rounded-lg">

        <h2 className="text-2xl text-white font-bold mb-6">
          Attendance Records
        </h2>

        <table className="w-full text-left text-gray-300">

          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Date</th>
              <th>Sign In</th>
              <th>Sign Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {attendance.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No attendance records found
                </td>
              </tr>
            )}

            {attendance.map((att, index) => (

              <tr key={index} className="border-b border-gray-800">

                <td className="py-2">{att.date}</td>

                <td>{att.signin_time || "-"}</td>

                <td>{att.signout_time || "-"}</td>

                <td>
                  {att.signin_completed
                    ? <span className="text-green-400">Completed</span>
                    : <span className="text-yellow-400">Pending</span>
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default EmployeeAttendance;