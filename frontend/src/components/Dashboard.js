import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { CheckCircleIcon, ExclamationTriangleIcon, ArrowTrendingUpIcon, CubeIcon, ChartBarIcon, TruckIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import { MilitaryLoader } from './common/MilitaryLoaders';

function Dashboard({ token, user, onNavigate }) {
  console.log('Dashboard component rendered with props:', { 
    hasToken: !!token, 
    hasUser: !!user, 
    hasOnNavigate: !!onNavigate,
    onNavigateType: typeof onNavigate 
  });
  
  const cardsRef = useRef([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    base_id: user?.role === 'admin' ? '' : user?.base_id || '',
    category: '',
    start_date: '',
    end_date: ''
  });
  const [showNetMovementDetail, setShowNetMovementDetail] = useState(false);

  useEffect(() => {
    // Animate cards on mount - only if metrics are loaded and refs are populated
    if (metrics.total_assets && cardsRef.current.length > 0 && !loading) {
      // Filter out null/undefined refs
      const validRefs = cardsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (validRefs.length > 0) {
        gsap.fromTo(validRefs, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
      }
    }
  }, [metrics, loading]);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData = {
          total_assets: 2847,
          total_value: 85420000,
          operational_assets: 2654,
          maintenance_assets: 193,
          avg_age: 3.2,
          pending_transfers: 24,
          recent_transfers: [
            { id: 1, asset: "M4A1 Carbine", from: "Base Alpha", to: "Base Bravo", status: "In Transit", date: "2024-01-15" },
            { id: 2, asset: "Communication Radio", from: "Base Charlie", to: "Base Delta", status: "Completed", date: "2024-01-14" },
            { id: 3, asset: "Medical Kit", from: "Base Echo", to: "Base Alpha", status: "Pending", date: "2024-01-13" }
          ],
          low_stock_items: [
            { id: 1, item: "9mm Ammunition", current: 850, minimum: 1000, critical: true },
            { id: 2, item: "First Aid Kits", current: 45, minimum: 50, critical: false },
            { id: 3, item: "Fuel Canisters", current: 22, minimum: 30, critical: false }
          ],
          asset_distribution: [
            { base: "Base Alpha", count: 842, percentage: 29.6 },
            { base: "Base Bravo", count: 721, percentage: 25.3 },
            { base: "Base Charlie", count: 589, percentage: 20.7 },
            { base: "Base Delta", count: 695, percentage: 24.4 }
          ],
          monthly_acquisitions: 156,
          monthly_disposals: 43,
          net_movement: 113
        };

        setMetrics(mockData);
        toast.success('Dashboard data loaded successfully!');
      } catch (err) {
        setError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-military military-pattern flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-6">
          <MilitaryLoader size="lg" message="INITIALIZING TACTICAL SYSTEMS..." />
          <motion.h2 
            className="text-2xl font-bold text-desert-200 font-military tracking-wider"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            COMMAND CENTER LOADING
          </motion.h2>
          <motion.p 
            className="text-military-300 font-tactical tracking-wide"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Securing connection to military asset database...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-military military-pattern flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="text-center space-y-4 bg-military-800/30 backdrop-blur-md p-8 rounded-2xl shadow-military-xl border border-military-600/50"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mx-auto" />
          <h2 className="text-2xl font-bold text-desert-200 font-military tracking-wider">SYSTEM ERROR DETECTED</h2>
          <p className="text-military-300 font-tactical">{error}</p>
          <motion.button
            className="bg-gradient-tactical text-desert-100 px-6 py-3 rounded-lg hover:shadow-military-lg transition-colors shadow-military font-tactical tracking-wide border border-military-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
          >
            RETRY CONNECTION
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-military military-pattern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-8 border border-military-600/50"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-4xl font-bold text-desert-200 mb-2 font-military tracking-wider"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                TACTICAL COMMAND CENTER
              </motion.h1>
              <motion.p 
                className="text-military-300 text-lg font-tactical tracking-wide"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Real-time operational overview of military assets and deployments
              </motion.p>
              <div className="w-24 h-0.5 bg-accent-light mt-2"></div>
            </div>
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-right">
                <p className="text-sm text-military-400 font-tactical tracking-wide">WELCOME BACK,</p>
                <p className="font-bold text-desert-200 font-military tracking-wider">{(user?.name || 'OFFICER').toUpperCase()}</p>
                <p className="text-xs text-military-500 font-mono tracking-widest">{(user?.role || 'USER').replace('_', ' ').toUpperCase()}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-camo rounded-2xl flex items-center justify-center shadow-military-lg border border-military-600">
                <svg className="w-8 h-8 text-desert-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div 
          className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-desert-200 flex items-center font-military tracking-wider">
              <ChartBarIcon className="w-6 h-6 mr-2 text-accent-light" />
              TACTICAL FILTERS & ANALYTICS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {user?.role === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-military-300 mb-2 font-tactical tracking-wide">BASE LOCATION</label>
                <select
                  value={filters.base_id}
                  onChange={(e) => handleFilterChange('base_id', e.target.value)}
                  className="block w-full bg-military-700/40 border border-military-600 rounded-lg shadow-military focus:ring-2 focus:ring-accent-light focus:border-accent-light text-desert-100 px-3 py-2 transition-colors duration-200 font-mono"
                >
                  <option value="">ALL BASES</option>
                  <option value="1">FORT ALPHA</option>
                  <option value="2">BASE BRAVO</option>
                  <option value="3">BASE CHARLIE</option>
                  <option value="4">BASE DELTA</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-military-300 mb-2 font-tactical tracking-wide">ASSET CLASS</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="block w-full bg-military-700/40 border border-military-600 rounded-lg shadow-military focus:ring-2 focus:ring-accent-light focus:border-accent-light text-desert-100 px-3 py-2 transition-colors duration-200 font-mono"
              >
                <option value="">ALL CLASSES</option>
                <option value="Weapons">WEAPONS</option>
                <option value="Vehicles">VEHICLES</option>
                <option value="Ammunition">AMMUNITION</option>
                <option value="Communication">COMMUNICATION</option>
                <option value="Medical">MEDICAL</option>
                <option value="Equipment">EQUIPMENT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-military-300 mb-2 font-tactical tracking-wide">START DATE</label>
              <input
                type="date"
                value={filters.start_date}
                onChange={(e) => handleFilterChange('start_date', e.target.value)}
                className="block w-full bg-military-700/40 border border-military-600 rounded-lg shadow-military focus:ring-2 focus:ring-accent-light focus:border-accent-light text-desert-100 px-3 py-2 transition-colors duration-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-military-300 mb-2 font-tactical tracking-wide">END DATE</label>
              <input
                type="date"
                value={filters.end_date}
                onChange={(e) => handleFilterChange('end_date', e.target.value)}
                className="block w-full bg-military-700/40 border border-military-600 rounded-lg shadow-military focus:ring-2 focus:ring-accent-light focus:border-accent-light text-desert-100 px-3 py-2 transition-colors duration-200 font-mono"
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Total Assets */}
          <motion.div 
            className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50 hover:shadow-military-2xl hover-lift transition-all duration-300"
            ref={el => { if (el) cardsRef.current[0] = el; }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-military-400 mb-1 font-tactical tracking-wide">TOTAL ASSETS</p>
                <p className="text-3xl font-bold text-desert-200 font-military">{metrics.total_assets?.toLocaleString() || 0}</p>
                <p className="text-sm text-military-300 mt-1 font-mono">
                  ${(metrics.total_value / 1000000)?.toFixed(1) || 0}M VALUE
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-tactical rounded-2xl flex items-center justify-center shadow-military-lg border border-military-600">
                <CubeIcon className="w-8 h-8 text-desert-200" />
              </div>
            </div>
          </motion.div>

          {/* Operational Status */}
          <motion.div 
            className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50 hover:shadow-military-2xl hover-lift transition-all duration-300"
            ref={el => { if (el) cardsRef.current[1] = el; }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-military-400 mb-1 font-tactical tracking-wide">OPERATIONAL</p>
                <p className="text-3xl font-bold text-desert-200 font-military">{metrics.operational_assets?.toLocaleString() || 0}</p>
                <p className="text-sm text-military-300 mt-1 font-mono">
                  {((metrics.operational_assets / metrics.total_assets) * 100)?.toFixed(1) || 0}% READY
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-olive-600 to-olive-800 rounded-2xl flex items-center justify-center shadow-military-lg border border-military-600">
                <CheckCircleIcon className="w-8 h-8 text-desert-200" />
              </div>
            </div>
          </motion.div>

          {/* Maintenance Required */}
          <motion.div 
            className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50 hover:shadow-military-2xl hover-lift transition-all duration-300"
            ref={el => { if (el) cardsRef.current[2] = el; }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-military-400 mb-1 font-tactical tracking-wide">MAINTENANCE</p>
                <p className="text-3xl font-bold text-desert-200 font-military">{metrics.maintenance_assets?.toLocaleString() || 0}</p>
                <p className="text-sm text-military-300 mt-1 font-mono">
                  AVG AGE: {metrics.avg_age || 0} YEARS
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-desert-600 to-desert-800 rounded-2xl flex items-center justify-center shadow-military-lg border border-military-600">
                <ExclamationTriangleIcon className="w-8 h-8 text-desert-200" />
              </div>
            </div>
          </motion.div>

          {/* Pending Transfers */}
          <motion.div 
            className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50 hover:shadow-military-2xl hover-lift transition-all duration-300"
            ref={el => { if (el) cardsRef.current[3] = el; }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-military-400 mb-1 font-tactical tracking-wide">PENDING TRANSFERS</p>
                <p className="text-3xl font-bold text-desert-200 font-military">{metrics.pending_transfers?.toLocaleString() || 0}</p>
                <p className="text-sm text-military-300 mt-1 font-mono">
                  AWAITING APPROVAL
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-camo rounded-2xl flex items-center justify-center shadow-military-lg border border-military-600">
                <TruckIcon className="w-8 h-8 text-desert-200" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transfers */}
          <motion.div 
            className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-desert-200 flex items-center font-military tracking-wider">
                <ArrowTrendingUpIcon className="w-5 h-5 mr-2 text-accent-light" />
                RECENT DEPLOYMENTS
              </h3>
              <motion.button
                className="text-military-300 hover:text-desert-200 text-sm font-medium bg-military-700/40 hover:bg-military-600/40 px-3 py-1 rounded-md border border-military-600 transition-colors duration-200 font-tactical tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('View All button clicked!', { onNavigate: !!onNavigate });
                  if (onNavigate) {
                    onNavigate('transfers');
                    toast.success('Navigating to Asset Deployment...');
                  } else {
                    console.error('onNavigate prop not available');
                    toast.error('Navigation not available');
                  }
                }}
              >
                VIEW ALL
              </motion.button>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {metrics.recent_transfers?.map((transfer, index) => (
                  <motion.div
                    key={transfer.id}
                    className="p-4 bg-military-700/30 rounded-xl border border-military-600/40 hover:bg-military-600/30 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-desert-200 font-military tracking-wide">{transfer.asset.toUpperCase()}</p>
                        <p className="text-sm text-military-300 font-tactical">
                          {transfer.from.toUpperCase()} → {transfer.to.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-widest ${
                          transfer.status === 'Completed' ? 'bg-olive-700 text-desert-100 border border-olive-600' :
                          transfer.status === 'In Transit' ? 'bg-tactical-700 text-desert-100 border border-tactical-600' :
                          'bg-military-600 text-desert-200 border border-military-500'
                        }`}>
                          {transfer.status.toUpperCase()}
                        </span>
                        <p className="text-xs text-military-500 mt-1 font-mono">{transfer.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Low Stock Alerts */}
          <motion.div 
            className="bg-military-800/30 backdrop-blur-md shadow-military-xl rounded-2xl p-6 border border-military-600/50"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-desert-200 flex items-center font-military tracking-wider">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-400" />
                SUPPLY ALERTS
              </h3>
              <motion.button
                className="text-military-300 hover:text-desert-200 text-sm font-medium bg-military-700/40 hover:bg-military-600/40 px-3 py-1 rounded-md border border-military-600 transition-colors duration-200 font-tactical tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Manage Stock button clicked!', { onNavigate: !!onNavigate });
                  if (onNavigate) {
                    onNavigate('purchases');
                    toast.success('Navigating to Arsenal Procurement...');
                  } else {
                    console.error('onNavigate prop not available');
                    toast.error('Navigation not available');
                  }
                }}
              >
                MANAGE SUPPLIES
              </motion.button>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {metrics.low_stock_items?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`p-4 rounded-xl border-2 transition-colors duration-200 ${
                      item.critical 
                        ? 'bg-red-900/30 border-red-600/60 hover:bg-red-800/30' 
                        : 'bg-military-700/30 border-military-600/40 hover:bg-military-600/30'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-desert-200 font-military tracking-wide">{item.item.toUpperCase()}</p>
                        <p className="text-sm text-military-300 font-mono tracking-wider">
                          CURRENT: {item.current} | MIN: {item.minimum}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-widest ${
                          item.critical ? 'bg-red-800 text-desert-100 border border-red-600' : 'bg-desert-700 text-military-100 border border-desert-600'
                        }`}>
                          {item.critical ? 'CRITICAL' : 'LOW'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-military-600/40 rounded-full h-2 border border-military-500/40">
                      <motion.div 
                        className={`h-2 rounded-full ${item.critical ? 'bg-red-600' : 'bg-desert-600'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.current / item.minimum) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Asset Distribution & Monthly Movement */}
        <motion.div 
          className="bg-white shadow-monochrome-xl rounded-2xl p-6 border border-gray-200"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Asset Distribution & Movement</h3>
            <motion.button
              className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center"
              onClick={() => setShowNetMovementDetail(!showNetMovementDetail)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showNetMovementDetail ? 'Hide Details' : 'Show Details'}
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Asset Distribution */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Distribution by Base</h4>
              <div className="space-y-3">
                {metrics.asset_distribution?.map((base, index) => (
                  <motion.div 
                    key={base.base} 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">{base.base}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{base.count} assets</span>
                      <span className="text-sm font-medium text-gray-900">{base.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Monthly Movement Summary */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Monthly Movement</h4>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-sm text-gray-700">Acquisitions</span>
                  <span className="font-bold text-gray-800">+{metrics.monthly_acquisitions}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="text-sm text-gray-700">Disposals</span>
                  <span className="font-bold text-gray-800">-{metrics.monthly_disposals}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between p-3 bg-gray-200 rounded-lg border-2 border-gray-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <span className="text-sm text-gray-700 font-medium">Net Movement</span>
                  <span className="font-bold text-gray-900">+{metrics.net_movement}</span>
                </motion.div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showNetMovementDetail && (
              <motion.div
                className="mt-6 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h5 className="text-sm font-medium text-gray-700 mb-3">Detailed Breakdown</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "New Procurements", value: 89, shade: "gray-100" },
                    { label: "Transfers In", value: 67, shade: "gray-200" },
                    { label: "Equipment Upgrades", value: 43, shade: "gray-300" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className={`p-4 bg-${item.shade} rounded-lg border border-gray-300`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-gray-700 text-sm font-medium">{item.label}</p>
                      <p className="text-gray-900 text-2xl font-bold">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
