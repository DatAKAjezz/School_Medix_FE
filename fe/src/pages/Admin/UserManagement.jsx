import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  FileDown, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  X
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([
    {
      id: 'PH001',
      password: '******',
      role: 'Phụ huynh',
      fullName: 'Nguyễn Văn Minh',
      phone: '0912345678',
      email: 'minh.nguyen@email.com',
      studentList: 'Nguyễn Văn An\nNguyễn Thị Bích',
      class: 'Lớp 5A\nLớp 2B',
      status: 'Hoạt động'
    },
    {
      id: 'PH002',
      password: '******',
      role: 'Phụ huynh',
      fullName: 'Trần Thị Hương',
      phone: '0987654321',
      email: 'huong.tran@email.com',
      studentList: 'Trần Minh Đức',
      class: 'Lớp 3C',
      status: 'Hoạt động'
    }
  ]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === '' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng ${user.fullName}?`)) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Thêm người dùng mới</h3>
          <button onClick={() => setShowAddModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tài khoản đăng nhập</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vai trò</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">Chọn vai trò</option>
              <option value="Phụ huynh">Phụ huynh</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button 
              onClick={() => {
                // Handle add user logic here
                setShowAddModal(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UserDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Thông tin chi tiết phụ huynh</h3>
          <button onClick={() => setShowDetailModal(false)}>
            <X size={20} />
          </button>
        </div>
        
        {selectedUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Tài khoản đăng nhập</label>
                <p className="mt-1 text-gray-900">{selectedUser.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Họ và tên</label>
                <p className="mt-1 text-gray-900">{selectedUser.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
                <p className="mt-1 text-gray-900">{selectedUser.phone}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Vai trò</label>
                <p className="mt-1 text-gray-900">{selectedUser.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Ghi chú</label>
                <p className="mt-1 text-gray-900">Đã xác thực thông tin</p>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-lg font-medium mb-4">Danh sách học sinh</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                  <User className="mr-3 text-gray-600" size={20} />
                  <div>
                    <p className="font-medium">Nguyễn Văn An</p>
                    <p className="text-sm text-gray-600">Lớp 5A</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                  <User className="mr-3 text-gray-600" size={20} />
                  <div>
                    <p className="font-medium">Nguyễn Thị Bích</p>
                    <p className="text-sm text-gray-600">Lớp 2B</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setShowDetailModal(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span>🏠 Trang chủ</span>
        <ChevronRight size={16} className="mx-2" />
        <span>Quản lý người dùng</span>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý người dùng</h1>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Admin
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
              Y tá
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Phụ huynh
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
              Học sinh
            </button>
          </div>
          
          <button 
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"
          >
            <Plus size={16} />
            Thêm mới
          </button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên phụ huynh hoặc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 text-sm"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              🗂️ Tải lại
            </button>
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Sắp xếp theo</option>
              <option value="Phụ huynh">Phụ huynh</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download size={16} />
              Xuất excel
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Upload size={16} />
              Nhập excel
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Tài khoản đăng nhập</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Mật khẩu</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Vai trò</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Họ và tên phụ huynh</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Số điện thoại</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Danh sách học sinh</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Lớp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{user.id}</td>
                  <td className="py-3 px-4 text-sm">{user.password}</td>
                  <td className="py-3 px-4 text-sm">{user.role}</td>
                  <td className="py-3 px-4 text-sm font-medium">{user.fullName}</td>
                  <td className="py-3 px-4 text-sm">{user.phone}</td>
                  <td className="py-3 px-4 text-sm text-blue-600">{user.email}</td>
                  <td className="py-3 px-4 text-sm whitespace-pre-line">{user.studentList}</td>
                  <td className="py-3 px-4 text-sm whitespace-pre-line">{user.class}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(user)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEdit(user)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Hiển thị 1-{Math.min(itemsPerPage, filteredUsers.length)} trong tổng số {filteredUsers.length} mục
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600 mr-2">Trang:</span>
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === i + 1 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-sm text-gray-600 ml-2">Sau</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddUserModal />}
      {showDetailModal && <UserDetailModal />}
    </div>
  );
};

export default UserManagement;