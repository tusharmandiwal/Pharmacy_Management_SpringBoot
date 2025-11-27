import React, { useEffect, useState } from "react";
import { Search, Users, Trash2, Shield, User, X, AlertCircle, Mail, Phone } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import { API_ENDPOINTS } from '../config/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchField, setSearchField] = useState('name');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => {
      const val = (user[searchField] || '').toString().toLowerCase();
      return val.includes(searchValue.trim().toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchValue, searchField, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.USER.GET_ALL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      const usersArray = Array.isArray(data) ? data : [];
      setUsers(usersArray);
      setFilteredUsers(usersArray);
    } catch (err) {
      setError("Could not load users. Please try again later.");
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.USER.DELETE(email), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users => users.filter(user => user.email !== email));
    } catch (err) {
      alert('Could not delete user.');
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    setFilteredUsers(users);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      
      <main className="flex-grow bg-gradient-to-br from-cyan-50 via-blue-50 to-blue-100">
        {/* Header */}
        <div className="bg-white shadow-md border-b border-cyan-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-cyan-600" />
              <h1 className="text-3xl font-bold text-cyan-700">User Management</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Search Bar - Compact Version */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-cyan-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className="px-3 py-2 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm"
                value={searchField}
                onChange={e => setSearchField(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="role">Role</option>
                <option value="id">User ID</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchField}...`}
                className="flex-1 px-3 py-2 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <button
                  onClick={clearSearch}
                  className="px-3 py-2 border border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors font-medium text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Users Display */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-cyan-200">
              <Users className="h-16 w-16 text-cyan-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No users found</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchValue ? 'Try adjusting your search criteria' : 'No users available'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden border border-cyan-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">User ID</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Contact</th>
                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Role</th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user, idx) => (
                        <tr
                          key={user.id}
                          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} hover:bg-cyan-100 transition-colors`}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-cyan-700">#{user.id}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm space-y-1">
                              <div className="flex items-center text-gray-600">
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Phone className="h-3 w-3 mr-1" />
                                {user.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
                              ${user.role === 'ADMIN'
                                ? 'bg-cyan-100 text-cyan-700 border-cyan-200'
                                : 'bg-blue-100 text-blue-700 border-blue-200'
                              }`}>
                              {user.role === 'ADMIN' ? <Shield className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => handleDelete(user.email)}
                              className="inline-flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
                              title="Delete User"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-lg shadow-md p-6 border border-cyan-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-cyan-800">{user.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">ID: #{user.id}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
                        ${user.role === 'ADMIN'
                          ? 'bg-cyan-100 text-cyan-700 border-cyan-200'
                          : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}>
                        {user.role === 'ADMIN' ? <Shield className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                        {user.role}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="h-4 w-4 text-cyan-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900 break-all">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone className="h-4 w-4 text-cyan-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(user.email)}
                      className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete User</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* User Count */}
          {!loading && filteredUsers.length > 0 && (
            <div className="mt-6 text-sm text-gray-600 text-center">
              Showing {filteredUsers.length} of {users.length} user(s)
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UsersPage;