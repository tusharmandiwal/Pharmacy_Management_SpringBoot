import { useEffect, useState } from 'react';
import { Search, Package, FileText, CheckCircle, XCircle, Eye, Filter, X, AlertCircle } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import { API_ENDPOINTS } from '../config/api';

const ReportPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [modalDrugs, setModalDrugs] = useState(null);
  const [searchField, setSearchField] = useState('doctorEmail');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Get JWT token from localStorage
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_ENDPOINTS.ORDER.GET_ALL, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Ensure data is an array
      const ordersArray = Array.isArray(data) ? data : [];
      setOrders(ordersArray);
      setFilteredOrders(ordersArray);
      calculateStats(ordersArray);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to load orders. Please try again.');
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orderData) => {
    // Ensure orderData is an array
    if (!Array.isArray(orderData)) {
      setStats({ total: 0, pending: 0, approved: 0, rejected: 0 });
      return;
    }
    
    const total = orderData.length;
    const pending = orderData.filter(o => o.status === 'PENDING').length;
    const approved = orderData.filter(o => o.status === 'APPROVED').length;
    const rejected = orderData.filter(o => o.status === 'REJECTED').length;
    setStats({ total, pending, approved, rejected });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const approveOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to approve this order?')) return;
    
    try {
      const res = await fetch(API_ENDPOINTS.ORDER.APPROVE(orderId), {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      if (!res.ok) throw new Error('Failed to approve order');
      fetchOrders();
    } catch (error) {
      console.error('Error approving order:', error);
      alert('Could not approve the order.');
    }
  };

  const rejectOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to reject this order?')) return;
    
    try {
      const res = await fetch(API_ENDPOINTS.ORDER.REJECT(orderId), {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      if (!res.ok) throw new Error('Failed to reject order');
      fetchOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Could not reject the order.');
    }
  };

  const closeModal = () => setModalDrugs(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      setFilteredOrders(orders);
      calculateStats(orders);
      return;
    }
    
    // Ensure orders is an array before filtering
    if (!Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }
    
    const filtered = orders.filter(order => {
      const val = (order[searchField] || '').toString().toLowerCase();
      return val.includes(searchValue.trim().toLowerCase());
    });
    setFilteredOrders(filtered);
    calculateStats(filtered);
  };

  const clearSearch = () => {
    setSearchValue('');
    setFilteredOrders(orders);
    calculateStats(orders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentColor = (pstatus) => {
    return pstatus === 'SUCCESSFULL'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      
      <main className="flex-grow bg-gradient-to-br from-cyan-50 via-blue-50 to-blue-100">
        {/* Header */}
        <div className="bg-white shadow-md border-b border-cyan-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-cyan-600" />
              <h1 className="text-3xl font-bold text-cyan-700">Order Reports</h1>
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-cyan-700 mt-1">{stats.total}</p>
                </div>
                <Package className="h-10 w-10 text-cyan-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-700 mt-1">{stats.pending}</p>
                </div>
                <Filter className="h-10 w-10 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-700 mt-1">{stats.approved}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-700 mt-1">{stats.rejected}</p>
                </div>
                <XCircle className="h-10 w-10 text-red-500" />
              </div>
            </div>
          </div>

          {/* Search Bar - Compact Version */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-cyan-200">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <select
                className="px-3 py-2 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm"
                value={searchField}
                onChange={e => setSearchField(e.target.value)}
              >
                <option value="doctorEmail">Email</option>
                <option value="doctorName">Doctor Name</option>
                <option value="doctorPhone">Phone</option>
                <option value="orderDate">Order Date</option>
                <option value="status">Status</option>
                <option value="pstatus">Payment Status</option>
                <option value="paymentMethod">Payment Method</option>
                <option value="id">Order ID</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchField}...`}
                className="flex-1 px-3 py-2 rounded-lg border border-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap text-sm"
              >
                Search
              </button>
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-3 py-2 border border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors font-medium text-sm"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-cyan-200">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-16 w-16 text-cyan-300 mb-4" />
                <p className="text-gray-500 text-lg">No orders found</p>
                <p className="text-gray-400 text-sm mt-1">
                  {searchValue ? 'Try adjusting your search criteria' : 'Orders will appear here once placed'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Doctor</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Contact</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Order Date</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Total</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Payment</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider">Drugs</th>
                      <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order, idx) => (
                      <tr
                        key={order.id}
                        className={`${idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'} hover:bg-cyan-100 transition-colors`}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-cyan-700">#{order.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{order.doctorName}</div>
                            <div className="text-gray-500 text-xs">{order.doctorEmail}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{order.doctorPhone}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{order.orderDate}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-cyan-700">₹{order.totalPrice}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getPaymentColor(order.pstatus)}`}>
                              {order.pstatus}
                            </span>
                            <div className="text-xs text-gray-500">
                              {order.paymentMethod || 'N/A'}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setModalDrugs(order.drugDetails)}
                            className="flex items-center space-x-2 text-cyan-700 hover:text-cyan-900 transition-colors group"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              View ({order.drugDetails.length})
                            </span>
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {order.status !== 'APPROVED' && (
                              <button
                                onClick={() => approveOrder(order.id)}
                                className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
                                title="Approve Order"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span>Approve</span>
                              </button>
                            )}
                            <button
                              onClick={() => rejectOrder(order.id)}
                              disabled={order.status === 'REJECTED'}
                              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reject Order"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Results Count */}
          {!loading && filteredOrders.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              Showing {filteredOrders.length} of {orders.length} order(s)
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Drug Details Modal */}
      {modalDrugs && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 rounded-t-xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">Order Details</h3>
                </div>
                <button 
                  onClick={closeModal} 
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {modalDrugs.map((drug, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-cyan-50 via-blue-50 to-white rounded-lg p-4 border border-cyan-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-cyan-800">{drug.name}</h4>
                        {drug.description && (
                          <p className="text-sm text-gray-600 mt-1">{drug.description}</p>
                        )}
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-sm font-semibold text-cyan-700">₹{drug.price}</div>
                        <div className="text-xs text-gray-500 mt-1">Qty: {drug.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Total Items:</span>
                  <span className="text-lg font-bold text-cyan-700">{modalDrugs.length}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <button
                onClick={closeModal}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm"
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

export default ReportPage;