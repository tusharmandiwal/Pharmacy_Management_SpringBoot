import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Eye, Search, Package, AlertCircle, X } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import { API_ENDPOINTS } from '../config/api';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [supplierModal, setSupplierModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    expiryDate: '',
    supplierId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.DRUG.GET_ALL);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
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
      const config = {
        headers: { Authorization: token ? `Bearer ${token}` : undefined }
      };

      if (editingProduct) {
        await axios.put(API_ENDPOINTS.DRUG.UPDATE(editingProduct.id), formData, config);
        setEditingProduct(null);
      } else {
        await axios.post(API_ENDPOINTS.DRUG.ADD, formData, config);
      }

      setFormData({ name: '', description: '', price: '', quantity: '', expiryDate: '', supplierId: '' });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to save product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    try {
      await axios.delete(API_ENDPOINTS.DRUG.DELETE(id), {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSupplier = async (supplierId) => {
    if (!supplierId) {
      alert('No supplier ID provided.');
      return;
    }

    try {
      const res = await axios.get(API_ENDPOINTS.SUPPLIER.GET_BY_ID(supplierId), {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      setSupplierModal(res.data);
    } catch (err) {
      alert('Failed to fetch supplier info');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', quantity: '', expiryDate: '', supplierId: '' });
    setEditingProduct(null);
    setShowForm(false);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { color: 'bg-red-100 text-red-800', text: 'Out of Stock' };
    if (quantity < 50) return { color: 'bg-yellow-100 text-yellow-800', text: 'Low Stock' };
    return { color: 'bg-green-100 text-green-800', text: 'In Stock' };
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry >= 0;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    name="name"
                    required
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    name="quantity"
                    type="number"
                    required
                    placeholder="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                  <input
                    name="expiryDate"
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier ID *</label>
                  <input
                    name="supplierId"
                    type="number"
                    required
                    placeholder="Enter supplier ID"
                    value={formData.supplierId}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-3 flex space-x-3 mt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    onClick={resetForm}
                    disabled={loading}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Supplier</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center">
                          <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-lg">No products found</p>
                          <p className="text-gray-400 text-sm mt-1">
                            {searchTerm ? 'Try adjusting your search' : 'Add your first product to get started'}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        const stockStatus = getStockStatus(product.quantity);
                        const expiringSoon = isExpiringSoon(product.expiryDate);
                        
                        return (
                          <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.description || '—'}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900">
                                ₹{parseFloat(product.price).toFixed(2)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900">{product.quantity}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                                {stockStatus.text}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${expiringSoon ? 'text-red-600' : 'text-gray-900'}`}>
                                {product.expiryDate}
                                {expiringSoon && <span className="ml-1" title="Expires within 90 days">⚠️</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">ID: {product.supplierId}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-100 transition-all"
                                  title="Edit Product"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-100 transition-all"
                                  title="Delete Product"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleViewSupplier(product.supplierId)}
                                  className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-100 transition-all"
                                  title="View Supplier"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Product Count */}
          {!loading && filteredProducts.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {filteredProducts.length} of {products.length} product(s)
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Supplier Modal */}
      {supplierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl transform transition-all">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Supplier Information</h3>
                <button 
                  onClick={() => setSupplierModal(null)} 
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</label>
                <p className="text-gray-900 font-medium mt-1">{supplierModal.name}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact Number</label>
                <p className="text-gray-900 font-medium mt-1">{supplierModal.contactNumber}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                <p className="text-gray-900 font-medium mt-1">{supplierModal.email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</label>
                <p className="text-gray-900 font-medium mt-1">{supplierModal.address}</p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={() => setSupplierModal(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;