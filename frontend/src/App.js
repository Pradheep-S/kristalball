import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Purchases from "./components/Purchases";
import Transfers from "./components/Transfers";
import Login from "./components/Login";
import AssignmentsExpenditures from "./components/AssignmentsExpenditures";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for saved token on app load
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (token, user) => {
    setCurrentUser(user);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('dashboard');
  };

  if (!currentUser || !token) {
    return <Login onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard token={token} user={currentUser} onNavigate={setCurrentPage} />;
      case 'purchases':
        return <Purchases token={token} user={currentUser} onNavigate={setCurrentPage} />;
      case 'transfers':
        return <Transfers token={token} user={currentUser} onNavigate={setCurrentPage} />;
      case 'assignments':
        return <AssignmentsExpenditures token={token} user={currentUser} onNavigate={setCurrentPage} />;
      default:
        return <Dashboard token={token} user={currentUser} onNavigate={setCurrentPage} />;
    }
  };

  const getNavItems = () => {
    const allItems = [
      { id: 'dashboard', name: 'Command Center', icon: 'chart', roles: ['admin', 'base_commander', 'logistics_officer'] },
      { id: 'purchases', name: 'Arsenal Procurement', icon: 'shopping', roles: ['admin', 'base_commander', 'logistics_officer'] },
      { id: 'transfers', name: 'Asset Deployment', icon: 'truck', roles: ['admin', 'base_commander', 'logistics_officer'] },
      { id: 'assignments', name: 'Unit Assignments', icon: 'users', roles: ['admin', 'base_commander'] }
    ];

    return allItems.filter(item => item.roles.includes(currentUser.role));
  };

  const getIconPath = (iconType) => {
    const icons = {
      chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      shopping: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01",
      truck: "M7.5 14.25v-4.5m0 4.5h4.5m-4.5 0a3 3 0 11-6 0m9 0a3 3 0 11-6 0m6 0V9a2.25 2.25 0 00-2.25-2.25H10.5a2.25 2.25 0 00-2.25 2.25v5.25m10.5 0v-5.25a2.25 2.25 0 00-2.25-2.25H15a2.25 2.25 0 00-2.25 2.25v5.25",
      users: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
      weapon: "M15.75 8.25l-2.47-2.47a.75.75 0 00-1.06 0l-4.5 4.5a.75.75 0 000 1.06l2.47 2.47m-5.69-9.14L4.48 6.69a.75.75 0 001.06 1.06l2.01-2.01m-.708 7.783L9.36 10.94a.75.75 0 111.06 1.06l-2.518 2.518m5.258-5.258l3.181 3.182a.25.25 0 01-.177.427H12.5v3.5a.25.25 0 01-.427.177L8.89 13.364"
    };
    return icons[iconType] || icons.chart;
  };

  return (
    <div className="min-h-screen bg-gradient-military military-pattern">
      {/* Navigation Header */}
      <nav className="bg-military-900 shadow-military-lg border-b border-military-700 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-tactical rounded-lg flex items-center justify-center mr-3 shadow-military border border-military-600">
                  <svg className="w-6 h-6 text-desert-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-desert-200 font-military tracking-wider">TACTICAL ASSET COMMAND</h1>
                  <div className="w-1 h-6 bg-accent-light"></div>
                  <span className="text-xs text-military-400 font-mono font-bold tracking-widest">TAC-OPS</span>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:ml-10 md:flex md:space-x-2">
                {getNavItems().map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 font-tactical ${
                      currentPage === item.id
                        ? 'text-desert-100 bg-tactical-700 border border-tactical-600 shadow-tactical'
                        : 'text-military-300 hover:text-desert-200 hover:bg-military-800 border border-transparent hover:border-military-600'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getIconPath(item.icon)} />
                    </svg>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-desert-200 font-military tracking-wide">{currentUser.username.toUpperCase()}</span>
                <span className="text-xs text-military-400 capitalize font-mono tracking-wider">
                  {currentUser.role.replace('_', ' ').toUpperCase()} {currentUser.base_name && `• ${currentUser.base_name.toUpperCase()}`}
                </span>
              </div>
              <div className="w-10 h-10 bg-gradient-camo rounded-lg flex items-center justify-center shadow-military border border-military-600">
                <svg className="w-5 h-5 text-desert-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-military-600 text-sm leading-4 font-medium rounded-md text-desert-200 bg-military-800 hover:bg-military-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-light transition-all duration-200 shadow-military hover:shadow-military-lg font-tactical"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
