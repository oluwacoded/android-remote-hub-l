import { LogOut, Settings, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isDark, setIsDark] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold">ARH</div>
          <h1 className="text-xl font-bold text-white">Android Remote Hub</h1>
        </div>

        <div className="flex items-center space-x-6">
          <span className="text-slate-300 text-sm">{user?.username}</span>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-slate-700 rounded-lg transition"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-900 rounded-lg transition text-red-400"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
