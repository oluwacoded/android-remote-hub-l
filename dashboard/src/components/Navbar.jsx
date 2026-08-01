import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">ARH</span>
          </div>
          <h1 className="text-xl font-bold text-white">Android Remote Hub</h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-slate-300 text-sm hidden md:block">{user?.username}</span>
          
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <Settings size={20} className="text-slate-400" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <LogOut size={20} className="text-slate-400" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
