import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo + App Name clickable */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="font-bold text-xl text-gray-800">Book N Share</span>
      </Link>
      
      {/* Right side: Navigation Links */}
      <div className="space-x-4">
        {user && <Link to="/my-books" className="text-gray-700 hover:text-blue-500">My Books</Link>}
        {user && <Link to="/recommendations" className="text-gray-700 hover:text-blue-500">Recommendations</Link>}
         {!user ? (
          <>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={() => { logout(); navigate("/login"); }}>
            Logout
          </button>
        )}
      </div>
    </nav>
    // <nav className="bg-blue-600 p-4 text-white flex justify-between">
    //   <div className="flex gap-4">
    //     <Link to="/">Home</Link>
    //     {user && <Link to="/my-books">My Books</Link>}
    //     {user && <Link to="/recommendations">Recommendations</Link>}
    //   </div>
    //   <div className="flex gap-4">
    //     {!user ? (
    //       <>
    //         <Link to="/login">Login</Link>
    //       </>
    //     ) : (
    //       <button onClick={() => { logout(); navigate("/login"); }}>
    //         Logout
    //       </button>
    //     )}
    //   </div>
    // </nav>
  );
}
