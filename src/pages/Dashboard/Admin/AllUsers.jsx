import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import useTitle from "../../../hooks/useTitle";

const AllUsers = () => {
  useTitle('All Users')
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users.slice(0, 15);
    return users
      .filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 15);
  }, [searchTerm, users]);

  const handleRoleChange = async (userId, newRole) => {
    if (!newRole || newRole === "default") return;

    const confirm = await Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.patch(`http://localhost:5000/users/role/${userId}`, {
        role: newRole,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Role updated", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to change role", "error");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search Box */}
      <div className="flex items-center gap-2 mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <FaSearch className="text-gray-500 " />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead className="bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <select
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    defaultValue="default"
                    className="border px-2 py-1 rounded"
                  >
                    <option disabled value="default">
                      Select role
                    </option>
                    <option value="admin">Make Admin</option>
                    <option value="tutor">Make Tutor</option>
                    <option value="student">Make Student</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-gray-500 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
