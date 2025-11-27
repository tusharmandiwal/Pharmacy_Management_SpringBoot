import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Plus, Edit2, Trash2, X, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import { API_ENDPOINTS } from '../config/api';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactNumber.includes(searchTerm)
    );
    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.SUPPLIER.GET_ALL);
      setSuppliers(res.data);
      setFilteredSuppliers(res.data);
    } catch (error) {
      setError('Failed to load suppliers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (editingSupplier) {
        await axios.put(API_ENDPOINTS.SUPPLIER.UPDATE(editingSupplier.id), formData);
        setEditingSupplier(null);
      } else {
        await axios.post(API_ENDPOINTS.SUPPLIER.ADD, formData);
      }
      setFormData({ name: '', contactNumber: '', email: '', address: '' });
      setShowForm(false);
      fetchSuppliers();
    } catch (error) {
      setError('Failed to save supplier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      contactNumber: supplier.contactNumber,
      email: supplier.email,
      address: supplier.address
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this supplier?');
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await axios.delete(API_ENDPOINTS.SUPPLIER.DELETE(id));
      fetchSuppliers();
    } catch (error) {
      setError('Failed to delete supplier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', contactNumber: '', email: '', address: '' });
    setEditingSupplier(null);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-blue-100">
      <AdminNavbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-white shadow-md border-b border-cyan-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-cyan-600" />
                <h1 className="text-3xl font-bold text-cyan-700">Supplier Management</h1>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span>Add Supplier</span>
              </button>
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

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-cyan-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-cyan-700">
                  {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier Name *
                  </label>
                  <input
                    name="name"
                    placeholder="Enter supplier name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    name="contactNumber"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex space-x-3 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {loading ? 'Saving...' : editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="px-6 py-2.5 border border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-cyan-200">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-600" />
              <input
                type="text"
                placeholder="Search suppliers by name, email, or contact number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Suppliers Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-cyan-200">
              <Users className="h-16 w-16 text-cyan-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No suppliers found</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchTerm ? 'Try adjusting your search' : 'Add your first supplier to get started'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-cyan-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-800">{supplier.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">ID: {supplier.id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-all"
                        title="Edit Supplier"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all"
                        title="Delete Supplier"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Phone className="h-4 w-4 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Contact Number</p>
                        <p className="text-sm font-medium text-gray-900">{supplier.contactNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="h-4 w-4 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900 break-all">{supplier.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-cyan-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm font-medium text-gray-900">{supplier.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Supplier Count */}
          {!loading && filteredSuppliers.length > 0 && (
            <div className="mt-6 text-sm text-gray-600 text-center">
              Showing {filteredSuppliers.length} of {suppliers.length} supplier(s)
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Supplier;