import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MilitaryLoader } from './common/MilitaryLoaders';
import { WeaponIcon, SupplyIcon, ArmorIcon } from './common/MilitaryIcons';

const Purchases = ({ token, user, onNavigate }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reportLoading, setReportLoading] = useState(false);
  
  // Modal and form state
  const [showNewPurchaseModal, setShowNewPurchaseModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    item: '',
    category: 'Weapons',
    quantity: '',
    cost: '',
    vendor: '',
    priority: 'Medium',
    description: ''
  });

  useEffect(() => {
    const mockPurchases = [
      { 
        id: 1, 
        item: 'M4A1 TACTICAL CARBINE', 
        category: 'WEAPONS',
        quantity: 50, 
        cost: 125000, 
        date: '2024-01-15', 
        vendor: 'ARMAMENT TACTICAL SOLUTIONS',
        status: 'DEPLOYED',
        priority: 'CRITICAL',
        description: 'STANDARD ISSUE COMBAT RIFLE FOR FRONTLINE INFANTRY UNITS'
      },
      { 
        id: 2, 
        item: 'TACTICAL COMMUNICATION RADIO', 
        category: 'COMMUNICATIONS',
        quantity: 25, 
        cost: 75000, 
        date: '2024-01-14', 
        vendor: 'MILITARY TECH SOLUTIONS',
        status: 'PROCESSING',
        priority: 'HIGH',
        description: 'LONG-RANGE TACTICAL COMMUNICATION EQUIPMENT'
      },
      { 
        id: 3, 
        item: 'COMBAT MEDICAL KIT', 
        category: 'MEDICAL',
        quantity: 100, 
        cost: 25000, 
        date: '2024-01-13', 
        vendor: 'TACTICAL MEDICAL SUPPLY',
        status: 'DEPLOYED',
        priority: 'HIGH',
        description: 'EMERGENCY FIELD MEDICAL SUPPLIES AND EQUIPMENT'
      },
      { 
        id: 4, 
        item: 'BALLISTIC BODY ARMOR', 
        category: 'PROTECTION',
        quantity: 75, 
        cost: 187500, 
        date: '2024-01-12', 
        vendor: 'TACTICAL ARMOR SYSTEMS',
        status: 'PENDING',
        priority: 'CRITICAL',
        description: 'LEVEL IIIA BALLISTIC PROTECTION VESTS'
      },
      { 
        id: 5, 
        item: 'NIGHT VISION GOGGLES', 
        category: 'ELECTRONICS',
        quantity: 30, 
        cost: 450000, 
        date: '2024-01-11', 
        vendor: 'TACTICAL OPTICS INTERNATIONAL',
        status: 'DEPLOYED',
        priority: 'HIGH',
        description: 'ADVANCED NIGHT VISION EQUIPMENT FOR SPECIAL OPERATIONS'
      },
      {
        id: 6,
        item: 'TACTICAL VEHICLES',
        category: 'VEHICLES',
        quantity: 5,
        cost: 2500000,
        date: '2024-01-10',
        vendor: 'MILITARY VEHICLE SOLUTIONS',
        status: 'PROCESSING',
        priority: 'CRITICAL',
        description: 'ARMORED TACTICAL TRANSPORT VEHICLES'
      }
    ];

    const timer = setTimeout(() => {
      setLoading(false);
      setPurchases(mockPurchases);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Report generation functions
  const generateCSVReport = () => {
    const headers = ['Item', 'Category', 'Quantity', 'Cost', 'Date', 'Vendor', 'Status', 'Priority', 'Description'];
    const csvContent = [
      headers.join(','),
      ...filteredPurchases.map(purchase => [
        `"${purchase.item}"`,
        `"${purchase.category}"`,
        purchase.quantity,
        purchase.cost,
        `"${purchase.date}"`,
        `"${purchase.vendor}"`,
        `"${purchase.status}"`,
        `"${purchase.priority}"`,
        `"${purchase.description}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `purchases_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDFReport = () => {
    // Create a detailed HTML report for PDF printing
    const reportWindow = window.open('', '_blank');
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Military Asset Purchases Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: #333;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #333; 
            padding-bottom: 20px;
          }
          .stats { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 15px; 
            margin-bottom: 30px;
          }
          .stat-card { 
            background: #f5f5f5; 
            padding: 15px; 
            border-radius: 8px; 
            border-left: 4px solid #007bff;
          }
          .stat-title { 
            font-size: 12px; 
            color: #666; 
            margin-bottom: 5px;
          }
          .stat-value { 
            font-size: 24px; 
            font-weight: bold; 
            color: #333;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left;
          }
          th { 
            background-color: #f2f2f2; 
            font-weight: bold;
          }
          tr:nth-child(even) { 
            background-color: #f9f9f9;
          }
          .status-delivered { 
            color: green; 
            font-weight: bold;
          }
          .status-pending { 
            color: orange; 
            font-weight: bold;
          }
          .status-processing { 
            color: blue; 
            font-weight: bold;
          }
          .footer { 
            margin-top: 30px; 
            text-align: center; 
            font-size: 12px; 
            color: #666;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Military Asset Purchases Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>Report compiled by: ${user?.name || 'System Administrator'}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-title">Total Purchases</div>
            <div class="stat-value">${stats.totalPurchases}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Total Value</div>
            <div class="stat-value">$${stats.totalValue.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Total Items</div>
            <div class="stat-value">${stats.totalItems}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Average Cost/Item</div>
            <div class="stat-value">$${Math.round(stats.avgCostPerItem).toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Delivered</div>
            <div class="stat-value">${stats.deliveredCount}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Pending</div>
            <div class="stat-value">${stats.pendingCount}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            ${filteredPurchases.map(purchase => `
              <tr>
                <td>${purchase.item}</td>
                <td>${purchase.category}</td>
                <td>${purchase.quantity}</td>
                <td>$${purchase.cost.toLocaleString()}</td>
                <td>${purchase.date}</td>
                <td>${purchase.vendor}</td>
                <td class="status-${purchase.status.toLowerCase()}">${purchase.status}</td>
                <td>${purchase.priority}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>This report contains ${filteredPurchases.length} purchase records</p>
          <p>Military Asset Management System - Confidential Document</p>
        </div>

        <div class="no-print" style="margin-top: 20px; text-align: center;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Report</button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Close</button>
        </div>
      </body>
      </html>
    `;
    
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
  };

  const handleGenerateReport = async () => {
    setReportLoading(true);
    
    try {
      // Show options to user
      const reportType = await new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        `;
        
        modal.innerHTML = `
          <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px;">
            <h3 style="margin-bottom: 20px; color: #333;">Generate Report</h3>
            <p style="margin-bottom: 25px; color: #666;">Choose your preferred report format:</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
              <button id="csv-btn" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                📊 CSV Report
              </button>
              <button id="pdf-btn" style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                📄 PDF Report
              </button>
            </div>
            <button id="cancel-btn" style="margin-top: 15px; padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Cancel
            </button>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('csv-btn').onclick = () => {
          document.body.removeChild(modal);
          resolve('csv');
        };
        
        document.getElementById('pdf-btn').onclick = () => {
          document.body.removeChild(modal);
          resolve('pdf');
        };
        
        document.getElementById('cancel-btn').onclick = () => {
          document.body.removeChild(modal);
          resolve(null);
        };
      });
      
      if (reportType === 'csv') {
        generateCSVReport();
      } else if (reportType === 'pdf') {
        generatePDFReport();
      }
      
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setReportLoading(false);
    }
  };

  // Handle new purchase form submission
  const handleAddNewPurchase = () => {
    if (!newPurchase.item || !newPurchase.quantity || !newPurchase.cost || !newPurchase.vendor) {
      alert('Please fill in all required fields');
      return;
    }

    const purchase = {
      id: purchases.length + 1,
      item: newPurchase.item,
      category: newPurchase.category,
      quantity: parseInt(newPurchase.quantity),
      cost: parseFloat(newPurchase.cost),
      date: new Date().toISOString().split('T')[0],
      vendor: newPurchase.vendor,
      status: 'Pending',
      priority: newPurchase.priority,
      description: newPurchase.description || `${newPurchase.item} purchase from ${newPurchase.vendor}`
    };

    setPurchases([...purchases, purchase]);
    setNewPurchase({
      item: '',
      category: 'Weapons',
      quantity: '',
      cost: '',
      vendor: '',
      priority: 'Medium',
      description: ''
    });
    setShowNewPurchaseModal(false);
    alert('New purchase added successfully!');
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewPurchase(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle export functionality
  const handleExportData = (format) => {
    if (format === 'csv') {
      generateCSVReport();
    } else if (format === 'pdf') {
      generatePDFReport();
    }
    setShowExportModal(false);
  };

  // Filter functions
  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || purchase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(purchases.map(p => p.category))];

  // Table columns configuration
  // Statistics calculations
  const stats = {
    totalPurchases: purchases.length,
    totalValue: purchases.reduce((sum, p) => sum + p.cost, 0),
    totalItems: purchases.reduce((sum, p) => sum + p.quantity, 0),
    avgCostPerItem: purchases.length > 0 ? purchases.reduce((sum, p) => sum + p.cost, 0) / purchases.reduce((sum, p) => sum + p.quantity, 0) : 0,
    deliveredCount: purchases.filter(p => p.status === 'Delivered').length,
    pendingCount: purchases.filter(p => p.status === 'Pending' || p.status === 'Processing').length
  };

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold">Loading Purchases...</div>
          <div className="text-white/60 mt-2">Fetching military asset procurement data</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-military-950 text-military-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-8">
        {/* Tactical Header Section */}
        <motion.div 
          className="mb-8 p-6 bg-gradient-to-r from-tactical-900/30 to-military-900/30 rounded-lg border border-tactical-600/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-tactical-600/20 rounded-lg">
              <WeaponIcon className="w-8 h-8 text-tactical-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-tactical-300 font-orbitron tracking-wider">
                ARSENAL PROCUREMENT
              </h1>
              <p className="text-military-400 text-lg font-rajdhani">
                TACTICAL ASSET ACQUISITION & LOGISTICS COMMAND
              </p>
            </div>
          </div>
          
          {/* Mission Status Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-tactical-900/40 rounded-lg p-4 border border-tactical-600/20">
              <div className="flex items-center gap-2">
                <SupplyIcon className="w-5 h-5 text-blue-400" />
                <span className="text-military-300 font-semibold">TOTAL ASSETS</span>
              </div>
              <p className="text-2xl font-bold text-blue-400 font-orbitron mt-1">
                {purchases.reduce((sum, p) => sum + p.quantity, 0)}
              </p>
            </div>
            
            <div className="bg-tactical-900/40 rounded-lg p-4 border border-tactical-600/20">
              <div className="flex items-center gap-2">
                <ArmorIcon className="w-5 h-5 text-green-400" />
                <span className="text-military-300 font-semibold">DEPLOYED</span>
              </div>
              <p className="text-2xl font-bold text-green-400 font-orbitron mt-1">
                {purchases.filter(p => p.status === 'DEPLOYED').length}
              </p>
            </div>
            
            <div className="bg-tactical-900/40 rounded-lg p-4 border border-tactical-600/20">
              <div className="flex items-center gap-2">
                <WeaponIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-military-300 font-semibold">PROCESSING</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400 font-orbitron mt-1">
                {purchases.filter(p => p.status === 'PROCESSING').length}
              </p>
            </div>
            
            <div className="bg-tactical-900/40 rounded-lg p-4 border border-tactical-600/20">
              <div className="flex items-center gap-2">
                <SupplyIcon className="w-5 h-5 text-tactical-400" />
                <span className="text-military-300 font-semibold">TOTAL VALUE</span>
              </div>
              <p className="text-2xl font-bold text-tactical-400 font-orbitron mt-1">
                ${purchases.reduce((sum, p) => sum + p.cost, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tactical Action Bar */}
        <motion.div 
          className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Tactical Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="SEARCH ASSETS, VENDORS, EQUIPMENT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-900/30 border border-tactical-600/30 rounded-lg text-military-50 placeholder-military-400 focus:outline-none focus:ring-2 focus:ring-tactical-500 focus:border-tactical-500 backdrop-blur-sm font-rajdhani"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-tactical-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-tactical-900/30 border border-tactical-600/30 rounded-lg text-military-50 focus:outline-none focus:ring-2 focus:ring-tactical-500 backdrop-blur-sm font-rajdhani"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-tactical-900 text-military-50">
                  {category === 'all' ? 'ALL CATEGORIES' : category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowNewPurchaseModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-tactical-600 to-tactical-700 hover:from-tactical-500 hover:to-tactical-600 text-military-50 rounded-lg font-semibold font-rajdhani transition-all duration-300 flex items-center gap-2 border border-tactical-500/20"
            >
              <WeaponIcon className="w-5 h-5" />
              NEW PROCUREMENT
            </button>
            
            <button
              onClick={() => setShowExportModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-military-600 to-military-700 hover:from-military-500 hover:to-military-600 text-military-50 rounded-lg font-semibold font-rajdhani transition-all duration-300 flex items-center gap-2 border border-military-500/20"
            >
              <SupplyIcon className="w-5 h-5" />
              EXPORT INTEL
            </button>
          </div>
        </motion.div>

        {/* Tactical Statistics Cards - Already included in header */}
        
        {/* Main Arsenal Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-tactical-900/20 rounded-lg border border-tactical-600/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ArmorIcon className="w-6 h-6 text-tactical-400" />
              <h2 className="text-xl font-bold text-tactical-300 font-orbitron">ARSENAL INVENTORY</h2>
              <div className="ml-auto flex items-center gap-2 text-military-400 font-rajdhani">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                REAL-TIME TRACKING
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-tactical-600/30">
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">ASSET</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">CATEGORY</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">QTY</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">VALUE</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">DATE</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">SUPPLIER</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">STATUS</th>
                    <th className="text-left py-4 px-4 text-tactical-300 font-semibold font-rajdhani">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchases.map((purchase, index) => (
                    <motion.tr
                      key={purchase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-tactical-600/20 hover:bg-tactical-800/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-tactical-600/20 rounded">
                            {purchase.category === 'WEAPONS' && <WeaponIcon className="w-4 h-4 text-tactical-400" />}
                            {purchase.category === 'PROTECTION' && <ArmorIcon className="w-4 h-4 text-tactical-400" />}
                            {purchase.category !== 'WEAPONS' && purchase.category !== 'PROTECTION' && <SupplyIcon className="w-4 h-4 text-tactical-400" />}
                          </div>
                          <div>
                            <p className="text-military-100 font-semibold font-rajdhani">{purchase.item}</p>
                            <p className="text-military-400 text-sm">{purchase.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-tactical-600/20 text-tactical-300 rounded-full text-sm font-rajdhani">
                          {purchase.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-military-100 font-orbitron">{purchase.quantity}</td>
                      <td className="py-4 px-4 text-tactical-400 font-bold font-orbitron">${purchase.cost.toLocaleString()}</td>
                      <td className="py-4 px-4 text-military-300 font-rajdhani">{purchase.date}</td>
                      <td className="py-4 px-4 text-military-300 font-rajdhani">{purchase.vendor}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold font-rajdhani ${
                          purchase.status === 'DEPLOYED' ? 'bg-green-500/20 text-green-400' :
                          purchase.status === 'PROCESSING' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-tactical-600/20 hover:bg-tactical-600/40 rounded text-tactical-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded text-red-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Tactical Operations Footer */}
        <motion.div 
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-military-400 text-sm font-rajdhani">
            DISPLAYING {filteredPurchases.length} OF {purchases.length} TACTICAL ASSETS
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="px-4 py-2 bg-military-700/40 hover:bg-military-600/40 border border-military-600/30 text-military-300 rounded-lg font-rajdhani transition-colors"
            >
              ← COMMAND CENTER
            </button>
            
            <button
              onClick={handleGenerateReport}
              disabled={reportLoading}
              className="px-4 py-2 bg-gradient-to-r from-tactical-600 to-tactical-700 hover:from-tactical-500 hover:to-tactical-600 text-military-50 rounded-lg font-rajdhani transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {reportLoading ? (
                <>
                  <MilitaryLoader className="w-4 h-4" />
                  GENERATING...
                </>
              ) : (
                <>
                  <SupplyIcon className="w-4 h-4" />
                  GENERATE REPORT
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tactical Procurement Modal */}
      {showNewPurchaseModal && (
        <div className="fixed inset-0 bg-military-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-tactical-900/90 rounded-lg border border-tactical-600/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <WeaponIcon className="w-6 h-6 text-tactical-400" />
                  <h2 className="text-xl font-bold text-tactical-300 font-orbitron">
                    NEW ASSET PROCUREMENT
                  </h2>
                </div>
                <button
                  onClick={() => setShowNewPurchaseModal(false)}
                  className="p-2 hover:bg-tactical-700/40 rounded text-military-400 hover:text-military-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Asset Name */}
                  <div>
                    <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                      ASSET NAME *
                    </label>
                    <input
                      type="text"
                      value={newPurchase.item}
                      onChange={(e) => handleInputChange('item', e.target.value)}
                      className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 placeholder-military-400 focus:outline-none focus:ring-2 focus:ring-tactical-500 font-rajdhani"
                      placeholder="ENTER ASSET DESIGNATION"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                      CATEGORY *
                    </label>
                    <select
                      value={newPurchase.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 focus:outline-none focus:ring-2 focus:ring-tactical-500 font-rajdhani"
                    >
                      <option value="WEAPONS" className="bg-tactical-900">WEAPONS</option>
                      <option value="COMMUNICATIONS" className="bg-tactical-900">COMMUNICATIONS</option>
                      <option value="MEDICAL" className="bg-tactical-900">MEDICAL</option>
                      <option value="PROTECTION" className="bg-tactical-900">PROTECTION</option>
                      <option value="ELECTRONICS" className="bg-tactical-900">ELECTRONICS</option>
                      <option value="VEHICLES" className="bg-tactical-900">VEHICLES</option>
                      <option value="SUPPLIES" className="bg-tactical-900">SUPPLIES</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                      QUANTITY *
                    </label>
                    <input
                      type="number"
                      value={newPurchase.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 placeholder-military-400 focus:outline-none focus:ring-2 focus:ring-tactical-500 font-orbitron"
                      placeholder="000"
                      min="1"
                      required
                    />
                  </div>

                  {/* Cost */}
                  <div>
                    <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                      UNIT COST (USD) *
                    </label>
                    <input
                      type="number"
                      value={newPurchase.cost}
                      onChange={(e) => handleInputChange('cost', e.target.value)}
                      className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 placeholder-military-400 focus:outline-none focus:ring-2 focus:ring-tactical-500 font-orbitron"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  {/* Vendor */}
                  <div>
                    <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                      SUPPLIER *
                    </label>
                    <input
                      type="text"
                      value={newPurchase.vendor}
                      onChange={(e) => handleInputChange('vendor', e.target.value)}
                      className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 placeholder-military-400 focus:outline-none focus:ring-2 focus:ring-tactical-500 font-rajdhani"
                      placeholder="TACTICAL CONTRACTOR NAME"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                      PRIORITY LEVEL
                    </label>
                    <select
                      value={newPurchase.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 focus:outline-none focus:ring-2 focus:ring-tactical-500 font-rajdhani"
                    >
                      <option value="LOW" className="bg-tactical-900">LOW</option>
                      <option value="MEDIUM" className="bg-tactical-900">MEDIUM</option>
                      <option value="HIGH" className="bg-tactical-900">HIGH</option>
                      <option value="CRITICAL" className="bg-tactical-900">CRITICAL</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-tactical-300 mb-2 font-rajdhani">
                    MISSION DESCRIPTION
                  </label>
                  <textarea
                    value={newPurchase.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 bg-tactical-800/40 border border-tactical-600/30 rounded-lg text-military-50 placeholder-military-400 focus:outline-none focus:ring-2 focus:ring-tactical-500 resize-none font-rajdhani"
                    placeholder="ENTER TACTICAL ASSET DESCRIPTION (OPTIONAL)"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end pt-4 border-t border-tactical-600/30">
                  <button
                    onClick={() => setShowNewPurchaseModal(false)}
                    className="px-6 py-3 bg-military-700/40 hover:bg-military-600/40 border border-military-600/30 text-military-300 rounded-lg font-rajdhani transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleAddNewPurchase}
                    className="px-6 py-3 bg-gradient-to-r from-tactical-600 to-tactical-700 hover:from-tactical-500 hover:to-tactical-600 text-military-50 rounded-lg font-rajdhani transition-all duration-300 flex items-center gap-2"
                  >
                    <WeaponIcon className="w-4 h-4" />
                    AUTHORIZE PROCUREMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tactical Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-military-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-tactical-900/90 rounded-lg border border-tactical-600/30 max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <SupplyIcon className="w-6 h-6 text-tactical-400" />
                  <h2 className="text-xl font-bold text-tactical-300 font-orbitron">
                    EXPORT INTEL DATA
                  </h2>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-tactical-700/40 rounded text-military-400 hover:text-military-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-military-300 text-center font-rajdhani">
                  SELECT EXPORT FORMAT FOR TACTICAL ASSET DATA
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    className="p-6 bg-tactical-800/40 rounded-lg border border-tactical-600/30 hover:border-green-400/50 cursor-pointer transition-all group"
                    onClick={() => handleExportData('csv')}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30">
                        <SupplyIcon className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-military-100 mb-2 font-orbitron">CSV EXPORT</h3>
                      <p className="text-sm text-military-400 font-rajdhani">
                        DATA SHEET FORMAT
                      </p>
                    </div>
                  </div>

                  <div 
                    className="p-6 bg-tactical-800/40 rounded-lg border border-tactical-600/30 hover:border-red-400/50 cursor-pointer transition-all group"
                    onClick={() => handleExportData('pdf')}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30">
                        <ArmorIcon className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-military-100 mb-2 font-orbitron">PDF REPORT</h3>
                      <p className="text-sm text-military-400 font-rajdhani">
                        TACTICAL BRIEFING
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4 border-t border-tactical-600/30">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-6 py-3 bg-military-700/40 hover:bg-military-600/40 border border-military-600/30 text-military-300 rounded-lg font-rajdhani transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Purchases;
