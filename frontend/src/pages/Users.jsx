import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
    password: "",
    role: "employee"
  });

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEmployees(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addEmployee = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8000/employees",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Employee added");

      fetchEmployees();

    } catch (err) {

      alert("Error adding employee");

    }

  };

  const deleteEmployee = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8000/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchEmployees();

    } catch (err) {

      alert("Delete failed");

    }

  };

  return (

    <div className="bg-gray-800 mt-20 h-screen p-10 w-full">

      <h1 className="text-4xl text-white font-bold mb-10">
        Employee Management
      </h1>

      {/* Add Employee Form */}

      <form
        onSubmit={addEmployee}
        className="bg-gray-900 p-6 rounded-lg mb-10 max-w-3xl"
      >

        <h2 className="text-xl text-white mb-4">
          Add New Employee
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="employee_id"
            placeholder="Employee ID"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />

          <input
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />

          <input
            name="department"
            placeholder="Department"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />

          <select
            name="role"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

        </div>

        <button
          className="mt-4 bg-teal-500 px-6 py-2 rounded text-white hover:bg-teal-600"
        >
          Add Employee
        </button>

      </form>

      {/* Employee List */}

      <div className="bg-gray-900 p-6 rounded-lg">

        <h2 className="text-xl text-white mb-4">
          Employees
        </h2>

        <table className="w-full text-left text-gray-300">

          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Action</th>
              <th>Attendence</th>
              
            </tr>
          </thead>

          <tbody>

            {employees.map((emp) => (

              <tr
                key={emp.employee_id}
                className="border-b border-gray-800"
              >

                <td className="py-2">{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td> <a
                    onClick={() => navigate(`/attendance/${emp.employee_id}`)}
                    className=" text-blue-300 underline cursor-pointer"
                  >
                    View Attendance
                  </a> 
                </td>

                <td>

                  <button
                    onClick={() => deleteEmployee(emp.employee_id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Users;