import React, { useEffect, useState, useContext } from 'react';
import Pagination from './Pagination';
import { PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Save } from 'heroicons-react';
import { UserContext } from '../context/UserContext';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [editMode, setEditMode] = useState({});
    const { user } = useContext(UserContext); // Use UserContext

    useEffect(() => {
        fetchUsers();
    }, []);
    

    const fetchUsers = async () => {
        try {

            const userString = localStorage.getItem('user'); // Change the key to 'user'
            console.log('User String:', userString); // Debugging
            
            if (!userString) {
                console.error('No user data found');
                return;
            }

            const user = JSON.parse(userString);
            const token = user.token;
            console.log('Token:', token); // Debugging
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch('http://localhost:5005/api/users/allusers', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
                console.log('Fetched Users:', data); // Debugging
            } catch (error) {
                console.error('Error fetching users:', error);
            }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                // needs token
                const token = localStorage.getItem('token'); // or however you're storing the token
                const response = await fetch(`http://localhost:5005/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    fetchUsers(); // Refresh the list after deletion
                } else {
                    throw new Error('Error deleting user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    // Function to toggle edit mode for a user
    const toggleEditMode = (userId) => {
        setEditMode((prev) => ({ ...prev, [userId]: !prev[userId] }));
    };

    // Function to handle changes in user data
    const handleUserChange = (userId, field, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, [field]: value } : user
            )
        );
    };

    const handleEdit = async (user) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5005/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user), // Send updated user data
            });
            if (response.ok) {
                fetchUsers(); // Refresh the list after edit
                toggleEditMode(user._id); // Exit edit mode
            } else {
                throw new Error('Error editing user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleCancel = (userId) => {
        toggleEditMode(userId); // Exit edit mode
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    console.log('Users:', users); // Debugging
    console.log('User:', user); // Debugging
    console.log('Current Users:', currentUsers); // Debugging
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-semibold mb-4">Admin Panel</h1>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6">Username</th>
                            <th scope="col" className="py-3 px-6">Full Name</th>
                            <th scope="col" className="py-3 px-6">Email</th>
                            <th scope="col" className="py-3 px-6">Role</th>
                            <th scope="col" className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user._id} className="bg-white border-b">
                                <td className="py-4 px-6">
                                    {editMode[user._id] ? (
                                        <input
                                            type="text"
                                            className="w-full p-1 border rounded"
                                            value={user.username}
                                            onChange={(e) => handleUserChange(user._id, "username", e.target.value)}
                                        />
                                    ) : (user.username)}
                                </td>
                                <td className="py-4 px-6">
                                    {editMode[user._id] ? (
                                        <input
                                            type="text"
                                            value={user.fullName}
                                            className="w-full p-1 border rounded"
                                            onChange={(e) => handleUserChange(user._id, "fullName", e.target.value)}
                                        />
                                    ) : (user.fullName)}
                                </td>
                                <td className="py-4 px-6">
                                    {editMode[user._id] ? (
                                        <input
                                            type="text"
                                            value={user.email}
                                            className="w-full p-1 border rounded"
                                            onChange={(e) => handleUserChange(user._id, "email", e.target.value)}
                                        />
                                    ) : (user.email)}
                                </td>
                                <td className="py-4 px-6">
                                    {editMode[user._id] ? (
                                        <input
                                            type="text"
                                            className="w-full p-1 border rounded"
                                            value={user.role}
                                            onChange={(e) => handleUserChange(user._id, "role", e.target.value)}
                                        />
                                    ) : (user.role)}
                                </td>
                                <td className="py-4 px-6 flex items-center space-x-3">
                                    {editMode[user._id] ? (
                                        <>
                                            <Save
                                                className="h-5 w-5 text-green-600 cursor-pointer hover:text-green-800"
                                                onClick={() => handleEdit(user)}
                                            />
                                            <XMarkIcon
                                                className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-800"
                                                onClick={() => handleCancel(user._id)}
                                            />
                                        </>
                                    ) : (
                                        <PencilSquareIcon
                                            className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800"
                                            onClick={() => toggleEditMode(user._id)}
                                        />
                                    )}
                                    <TrashIcon
                                        className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-800"
                                        onClick={() => handleDelete(user._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination 
                usersPerPage={usersPerPage} 
                totalUsers={users.length} 
                paginate={paginate}
            />
        </div>
    );
};

export default AdminPanel;
