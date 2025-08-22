import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MilitaryLoader } from './common/MilitaryLoaders';
import { WeaponIcon, SupplyIcon, TargetIcon } from './common/MilitaryIcons';

const AssignmentsExpenditures = ({ token, user, onNavigate }) => {
  console.log('AssignmentsExpenditures user data:', user);
  
  const [activeTab, setActiveTab] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showExpenditureForm, setShowExpenditureForm] = useState(false);
  const [assets, setAssets] = useState([]);
  
  // New state for enhanced functionality
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);
  
  const [assignmentFormData, setAssignmentFormData] = useState({
    asset_id: '',
    personnel_name: '',
    personnel_rank: '',
    assignment_date: new Date().toISOString().split('T')[0],
    return_date: '',
    purpose: '',
    notes: ''
  });

  const [expenditureFormData, setExpenditureFormData] = useState({
    asset_id: '',
    quantity_used: '',
    expenditure_date: new Date().toISOString().split('T')[0],
    purpose: '',
    cost_per_unit: '',
    notes: ''
  });

  const [filters, setFilters] = useState({
    category: '',
    start_date: '',
    end_date: '',
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Tactical unit assignments data
        const mockAssignments = [
          {
            id: 1,
            asset_name: 'M4A1 TACTICAL CARBINE',
            asset_serial: 'TAC-123456',
            personnel_name: 'SERGEANT JOHNSON',
            personnel_rank: 'E-5',
            assignment_date: '2025-08-18',
            return_date: '2025-09-15',
            purpose: 'COMBAT TRAINING OPERATION ALPHA',
            status: 'ACTIVE DUTY',
            notes: 'STANDARD ISSUE FOR FRONT-LINE COMBAT TRAINING',
            assigned_by: 'ALPHA COMMAND LOGISTICS',
            base_name: 'ALPHA COMMAND'
          },
          {
            id: 2,
            asset_name: 'AN/PVS-14 NIGHT VISION SYSTEM',
            asset_serial: 'NVG-345678',
            personnel_name: 'CORPORAL MARTINEZ',
            personnel_rank: 'E-4',
            assignment_date: '2025-08-19',
            return_date: '2025-08-25',
            purpose: 'NIGHT RECONNAISSANCE MISSION',
            status: 'ACTIVE DUTY',
            notes: 'SPECIAL OPERATIONS NIGHT DEPLOYMENT',
            assigned_by: 'ALPHA COMMAND OPERATIONS',
            base_name: 'ALPHA COMMAND'
          },
          {
            id: 3,
            asset_name: 'AN/PRC-152 COMBAT RADIO',
            asset_serial: 'RAD-123789',
            personnel_name: 'STAFF SERGEANT WILSON',
            personnel_rank: 'E-6',
            assignment_date: '2025-08-15',
            return_date: '2025-08-22',
            purpose: 'TACTICAL COMMUNICATIONS TRAINING',
            status: 'MISSION COMPLETE',
            notes: 'SUCCESSFULLY COMPLETED COMMUNICATIONS PROTOCOL TRAINING',
            assigned_by: 'ALPHA COMMUNICATIONS DIVISION',
            base_name: 'ALPHA COMMAND'
          },
          {
            id: 4,
            asset_name: 'INTERCEPTOR BODY ARMOR SYSTEM',
            asset_serial: 'ARM-456123',
            personnel_name: 'PRIVATE THOMPSON',
            personnel_rank: 'E-2',
            assignment_date: '2025-08-20',
            return_date: '2025-09-20',
            purpose: 'BASIC COMBAT TRAINING OPERATIONS',
            status: 'ACTIVE DUTY',
            notes: 'NEW RECRUIT EQUIPMENT ASSIGNMENT',
            assigned_by: 'BRAVO OUTPOST QUARTERMASTER',
            base_name: 'BRAVO OUTPOST'
          },
          {
            id: 5,
            asset_name: 'TACTICAL SURVEILLANCE DRONE',
            asset_serial: 'UAV-456789',
            personnel_name: 'LIEUTENANT GARCIA',
            personnel_rank: 'O-2',
            assignment_date: '2025-08-17',
            return_date: '2025-08-30',
            purpose: 'AERIAL RECONNAISSANCE MISSION',
            status: 'ACTIVE DUTY',
            notes: 'ADVANCED SURVEILLANCE OPERATIONS',
            assigned_by: 'CHARLIE STATION TECH DIVISION',
            base_name: 'CHARLIE STATION'
          },
          {
            id: 6,
            asset_name: 'BIOMETRIC SECURITY SCANNER',
            asset_serial: 'BIO-321654',
            personnel_name: 'SERGEANT DAVIS',
            personnel_rank: 'E-5',
            assignment_date: '2025-08-16',
            return_date: '2025-08-23',
            purpose: 'SECURITY CHECKPOINT OPERATIONS',
            status: 'MISSION COMPLETE',
            notes: 'SECURITY ENHANCEMENT PROJECT COMPLETED',
            assigned_by: 'DELTA FORWARD OPERATING BASE SECURITY',
            base_name: 'DELTA FORWARD OPERATING BASE'
          }
        ];

        // Tactical expenditure operations data
        const mockExpenditures = [
          {
            id: 1,
            asset_name: 'Ammunition 5.56mm',
            category: 'Weapons',
            quantity_used: 500,
            cost_per_unit: 0.75,
            total_cost: 375.00,
            expenditure_date: '2025-08-20',
            purpose: 'LIVE FIRE TRAINING EXERCISE',
            notes: 'MARKSMANSHIP QUALIFICATION TRAINING',
            expended_by: 'ALPHA TRAINING COMMAND',
            base_name: 'ALPHA COMMAND'
          },
          {
            id: 2,
            asset_name: 'Medical Supplies',
            category: 'Medical',
            quantity_used: 25,
            cost_per_unit: 15.00,
            total_cost: 375.00,
            expenditure_date: '2025-08-19',
            purpose: 'FIRST AID TRAINING',
            notes: 'COMBAT LIFESAVER COURSE SUPPLIES',
            expended_by: 'ALPHA MEDICAL CORPS',
            base_name: 'ALPHA COMMAND'
          },
          {
            id: 3,
            asset_name: 'Fuel - Diesel',
            category: 'Vehicles',
            quantity_used: 200,
            cost_per_unit: 3.25,
            total_cost: 650.00,
            expenditure_date: '2025-08-18',
            purpose: 'VEHICLE OPERATIONS',
            notes: 'MONTHLY FUEL CONSUMPTION FOR FLEET',
            expended_by: 'BETA MOTOR POOL',
            base_name: 'BETA COMMAND'
          },
          {
            id: 4,
            asset_name: 'Communication Batteries',
            category: 'Communication',
            quantity_used: 150,
            cost_per_unit: 8.50,
            total_cost: 1275.00,
            expenditure_date: '2025-08-17',
            purpose: 'FIELD OPERATIONS',
            notes: 'RADIO EQUIPMENT POWER SUPPLY',
            expended_by: 'GAMMA COMMUNICATIONS',
            base_name: 'GAMMA COMMAND'
          },
          {
            id: 5,
            asset_name: 'Training Ammunition - Blank',
            category: 'Weapons',
            quantity_used: 1000,
            cost_per_unit: 0.45,
            total_cost: 450.00,
            expenditure_date: '2025-08-16',
            purpose: 'COMBAT TRAINING EXERCISE',
            notes: 'SIMULATED COMBAT SCENARIOS',
            expended_by: 'DELTA TRAINING COMMAND',
            base_name: 'DELTA COMMAND'
          },
          {
            id: 6,
            asset_name: 'Emergency Flares',
            category: 'Equipment',
            quantity_used: 30,
            cost_per_unit: 12.00,
            total_cost: 360.00,
            expenditure_date: '2025-08-15',
            purpose: 'NAVAL OPERATIONS',
            notes: 'SEARCH AND RESCUE TRAINING',
            expended_by: 'ECHO NAVAL OPERATIONS',
            base_name: 'ECHO NAVAL COMMAND'
          },
          {
            id: 7,
            asset_name: 'MRE (Meals Ready to Eat)',
            category: 'Equipment',
            quantity_used: 200,
            cost_per_unit: 9.50,
            total_cost: 1900.00,
            expenditure_date: '2025-08-14',
            purpose: 'FIELD TRAINING EXERCISE',
            notes: 'EXTENDED FIELD OPERATIONS RATIONS',
            expended_by: 'ALPHA LOGISTICS COMMAND',
            base_name: 'ALPHA COMMAND'
          },
          {
            id: 8,
            asset_name: 'Maintenance Parts',
            category: 'Vehicles',
            quantity_used: 45,
            cost_per_unit: 25.00,
            total_cost: 1125.00,
            expenditure_date: '2025-08-13',
            purpose: 'VEHICLE MAINTENANCE',
            notes: 'ROUTINE MAINTENANCE AND REPAIRS',
            expended_by: 'BETA MAINTENANCE COMMAND',
            base_name: 'BETA COMMAND'
          }
        ];

        // Mock assets data - adding comprehensive asset list
        const mockAssets = [
          { id: 1, name: 'M4A1 Carbine', category: 'Weapons', base_id: 'base1', quantity: 25 },
          { id: 2, name: 'Night Vision Goggles AN/PVS-14', category: 'Equipment', base_id: 'base1', quantity: 15 },
          { id: 3, name: 'Field Radio AN/PRC-152', category: 'Communication', base_id: 'base1', quantity: 30 },
          { id: 4, name: 'Body Armor Vests', category: 'Equipment', base_id: 'base1', quantity: 40 },
          { id: 5, name: 'Drone DJI Matrice 300', category: 'Equipment', base_id: 'base1', quantity: 5 },
          { id: 6, name: 'Biometric Scanner Systems', category: 'Equipment', base_id: 'base1', quantity: 8 },
          { id: 7, name: 'Ammunition 5.56mm', category: 'Weapons', base_id: 'base1', quantity: 1000 },
          { id: 8, name: 'Medical Supplies', category: 'Medical', base_id: 'base1', quantity: 50 },
          { id: 9, name: 'Fuel - Diesel', category: 'Vehicles', base_id: 'base1', quantity: 200 },
          { id: 10, name: 'Communication Batteries', category: 'Communication', base_id: 'base1', quantity: 75 },
          { id: 11, name: 'Training Ammunition - Blank', category: 'Weapons', base_id: 'base1', quantity: 500 },
          { id: 12, name: 'Emergency Flares', category: 'Equipment', base_id: 'base1', quantity: 20 },
          { id: 13, name: 'MRE (Meals Ready to Eat)', category: 'Equipment', base_id: 'base1', quantity: 300 },
          { id: 14, name: 'Maintenance Parts', category: 'Vehicles', base_id: 'base1', quantity: 100 },
          // Additional assets for testing
          { id: 15, name: 'AK47 Rifle', category: 'Weapons', base_id: 'base1', quantity: 35 },
          { id: 16, name: 'Tactical Helmet', category: 'Equipment', base_id: 'base1', quantity: 45 },
          { id: 17, name: 'GPS Device', category: 'Communication', base_id: 'base1', quantity: 20 },
          { id: 18, name: 'First Aid Kit', category: 'Medical', base_id: 'base1', quantity: 60 }
        ];

        // Filter data based on user role
        let filteredAssignments = mockAssignments;
        let filteredExpenditures = mockExpenditures;
        
        if (user?.role !== 'admin') {
          filteredAssignments = mockAssignments.filter(assignment => 
            assignment.base_name === (user?.base_name || 'Fort Alpha')
          );
          filteredExpenditures = mockExpenditures.filter(expenditure => 
            expenditure.base_name === (user?.base_name || 'Fort Alpha')
          );
        }

        // Apply additional filters
        if (filters.category) {
          filteredAssignments = filteredAssignments.filter(assignment => 
            assignment.asset_name.toLowerCase().includes(filters.category.toLowerCase())
          );
          filteredExpenditures = filteredExpenditures.filter(expenditure => 
            expenditure.category.toLowerCase().includes(filters.category.toLowerCase())
          );
        }
        
        if (filters.status) {
          filteredAssignments = filteredAssignments.filter(assignment => 
            assignment.status === filters.status
          );
        }
        
        if (filters.start_date) {
          filteredAssignments = filteredAssignments.filter(assignment => 
            assignment.assignment_date >= filters.start_date
          );
          filteredExpenditures = filteredExpenditures.filter(expenditure => 
            expenditure.expenditure_date >= filters.start_date
          );
        }
        
        if (filters.end_date) {
          filteredAssignments = filteredAssignments.filter(assignment => 
            assignment.assignment_date <= filters.end_date
          );
          filteredExpenditures = filteredExpenditures.filter(expenditure => 
            expenditure.expenditure_date <= filters.end_date
          );
        }

        setAssignments(filteredAssignments);
        setExpenditures(filteredExpenditures);
        setAssets(mockAssets);
        setError(null);
      } catch (error) {
        console.error('Data fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, filters, activeTab]);

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    
    const isEditing = editingAssignment !== null;
    console.log(`Assignment form submission started - ${isEditing ? 'Editing' : 'Creating'}`);
    console.log('Form data:', assignmentFormData);
    console.log('Editing assignment:', editingAssignment);
    
    if (!assignmentFormData.asset_id || !assignmentFormData.personnel_name) {
      const errorMsg = 'Please fill in all required fields';
      console.log('Validation failed:', errorMsg);
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setLoading(true);
      
      // Find the selected asset
      console.log('Looking for asset with ID:', assignmentFormData.asset_id, typeof assignmentFormData.asset_id);
      const selectedAsset = assets.find(asset => {
        console.log('Comparing asset:', asset.id, typeof asset.id, 'with form ID:', assignmentFormData.asset_id, typeof assignmentFormData.asset_id);
        return asset.id === parseInt(assignmentFormData.asset_id);
      });
      
      console.log('Selected asset:', selectedAsset);

      if (!selectedAsset) {
        throw new Error('Selected asset not found');
      }
      
      if (isEditing) {
        // Update existing assignment
        const updatedAssignment = {
          ...editingAssignment,
          asset_id: parseInt(assignmentFormData.asset_id),
          asset_name: selectedAsset.name,
          asset_category: selectedAsset.category,
          personnel_name: assignmentFormData.personnel_name,
          personnel_rank: assignmentFormData.personnel_rank,
          assignment_date: assignmentFormData.assignment_date,
          expected_return_date: assignmentFormData.return_date || null,
          return_date: assignmentFormData.return_date || 'Not specified',
          purpose: assignmentFormData.purpose || 'Not specified',
          notes: assignmentFormData.notes || '',
          // Keep existing status and other fields
        };
        
        console.log('Updated assignment:', updatedAssignment);
        
        // Update in the assignments list
        setAssignments(prev => prev.map(assignment => 
          assignment.id === editingAssignment.id ? updatedAssignment : assignment
        ));
        
        toast.success('Assignment updated successfully!');
      } else {
        // Create new assignment
        if (!selectedAsset) {
          throw new Error(`Selected asset not found. Asset ID: ${assignmentFormData.asset_id}, Available assets: ${assets.length}`);
        }
        
        // Create a new assignment with mock data
        const newAssignment = {
          id: Date.now(), // Simple ID generation
          asset_id: assignmentFormData.asset_id,
          asset_name: selectedAsset.name,
          asset_category: selectedAsset.category,
          personnel_name: assignmentFormData.personnel_name,
          personnel_rank: assignmentFormData.personnel_rank || 'Not specified',
          assignment_date: assignmentFormData.assignment_date,
          return_date: assignmentFormData.return_date || 'Not specified',
          purpose: assignmentFormData.purpose || 'Not specified',
          notes: assignmentFormData.notes || '',
          status: 'Active',
          base_name: user?.base_name || 'Base Alpha',
          assigned_by: user?.username || 'System'
        };
        
        console.log('New assignment created:', newAssignment);
        
        // Add to current assignments list
        setAssignments(prev => {
          console.log('Previous assignments:', prev);
          const updated = [newAssignment, ...prev];
          console.log('Updated assignments:', updated);
          return updated;
        });
        
        toast.success('Assignment created successfully!');
      }
      
      // Reset form and close modal
      setAssignmentFormData({
        asset_id: '',
        personnel_name: '',
        personnel_rank: '',
        assignment_date: new Date().toISOString().split('T')[0],
        return_date: '',
        purpose: '',
        notes: ''
      });
      setEditingAssignment(null);
      setShowAssignmentForm(false);
      setError(null);
      
    } catch (error) {
      console.error('Assignment creation error:', error);
      setError(error.message);
      toast.error(`Failed to create assignment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Assignment action handlers
  const handleViewAssignment = (assignment) => {
    const selectedAsset = assets.find(asset => asset.id === parseInt(assignment.asset_id));
    
    const details = {
      id: assignment.id,
      asset: {
        name: assignment.asset_name,
        category: assignment.asset_category,
        serial_number: selectedAsset?.serial_number || 'N/A'
      },
      personnel: {
        name: assignment.personnel_name,
        rank: assignment.personnel_rank,
        id: assignment.personnel_id || 'N/A'
      },
      dates: {
        assignment: assignment.assignment_date,
        expected_return: assignment.expected_return_date,
        actual_return: assignment.actual_return_date
      },
      purpose: assignment.purpose,
      notes: assignment.notes,
      status: assignment.status,
      assigned_by: assignment.assigned_by,
      base: assignment.base_name
    };
    
    setSelectedAssignment(details);
    setShowAssignmentDetails(true);
  };

  const handleEditAssignment = (assignment) => {
    setAssignmentFormData({
      asset_id: assignment.asset_id.toString(),
      personnel_name: assignment.personnel_name,
      personnel_rank: assignment.personnel_rank,
      assignment_date: assignment.assignment_date,
      return_date: assignment.expected_return_date || '',
      purpose: assignment.purpose,
      notes: assignment.notes || ''
    });
    setEditingAssignment(assignment);
    setShowAssignmentForm(true);
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
      return;
    }

    try {
      setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
      toast.success('Assignment deleted successfully!');
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.error('Failed to delete assignment');
    }
  };

  const handleReturnAsset = async (assignmentId) => {
    try {
      const returnDate = new Date().toISOString().split('T')[0];
      
      setAssignments(prev => prev.map(assignment => 
        assignment.id === assignmentId 
          ? { 
              ...assignment, 
              status: 'Returned', 
              actual_return_date: returnDate 
            }
          : assignment
      ));
      
      toast.success('Asset marked as returned successfully!');
    } catch (error) {
      console.error('Error returning asset:', error);
      toast.error('Failed to mark asset as returned');
    }
  };

  const handleStatusUpdate = async (assignmentId, newStatus) => {
    try {
      setAssignments(prev => prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: newStatus }
          : assignment
      ));
      
      toast.success(`Assignment status updated to ${newStatus}!`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update assignment status');
    }
  };

  const handleExpenditureSubmit = async (e) => {
    e.preventDefault();
    
    if (!expenditureFormData.asset_id || !expenditureFormData.quantity_used) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Since backend expenditure routes are not properly set up for MongoDB,
      // we'll simulate the expenditure creation with mock data
      
      // Find the selected asset
      const selectedAsset = assets.find(asset => asset.id === parseInt(expenditureFormData.asset_id));
      
      if (!selectedAsset) {
        throw new Error('Selected asset not found');
      }
      
      // Create a new expenditure with mock data
      const newExpenditure = {
        id: Date.now(), // Simple ID generation
        asset_id: expenditureFormData.asset_id,
        asset_name: selectedAsset.name,
        category: selectedAsset.category,
        quantity_used: parseInt(expenditureFormData.quantity_used),
        expenditure_date: expenditureFormData.expenditure_date,
        purpose: expenditureFormData.purpose || 'Not specified',
        cost_per_unit: parseFloat(expenditureFormData.cost_per_unit) || 0,
        total_cost: (parseFloat(expenditureFormData.cost_per_unit) || 0) * parseInt(expenditureFormData.quantity_used),
        notes: expenditureFormData.notes || '',
        base_name: user?.base_name || 'Base Alpha',
        recorded_by: user?.username || 'System'
      };
      
      // Add to current expenditures list
      setExpenditures(prev => [newExpenditure, ...prev]);
      
      // Reset form and close modal
      setExpenditureFormData({
        asset_id: '',
        quantity_used: '',
        expenditure_date: new Date().toISOString().split('T')[0],
        purpose: '',
        cost_per_unit: '',
        notes: ''
      });
      setShowExpenditureForm(false);
      setError(null);
      
      // Show success message
      console.log('Expenditure recorded successfully:', newExpenditure);
      toast.success('Expenditure recorded successfully!');
      
    } catch (error) {
      console.error('Expenditure creation error:', error);
      setError(error.message);
      toast.error(`Failed to record expenditure: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'assigned': 'bg-tactical-600 text-military-100 border border-tactical-400',
      'Active': 'bg-tactical-600 text-military-100 border border-tactical-400',
      'returned': 'bg-green-600 text-military-100 border border-green-400',
      'Mission Complete': 'bg-green-600 text-military-100 border border-green-400',
      'overdue': 'bg-red-600 text-military-100 border border-red-400'
    };
    return colors[status] || 'bg-gray-600 text-military-100 border border-gray-400';
  };

  const canManageAssignments = user?.role === 'admin' || user?.role === 'base_commander' || user?.role === 'logistics_officer';

  if (loading && assignments.length === 0 && expenditures.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 bg-tactical-900 min-h-screen">
        <MilitaryLoader />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-tactical-900 min-h-screen p-6">
      {/* Military Header */}
      <div className="bg-gradient-to-r from-military-950 to-tactical-800 shadow-2xl rounded-lg p-6 border border-tactical-600">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <TargetIcon className="h-12 w-12 text-military-400" />
            <div>
              <h1 className="text-3xl font-bold text-military-100 font-orbitron tracking-wide">
                UNIT ASSIGNMENTS & TACTICAL EXPENDITURES
              </h1>
              <p className="text-military-400 font-rajdhani text-lg">
                MANAGE PERSONNEL ASSIGNMENTS AND ASSET EXPENDITURES
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            {canManageAssignments && (
              <>
                <button
                  onClick={() => {
                    setEditingAssignment(null);
                    setAssignmentFormData({
                      asset_id: '',
                      personnel_name: '',
                      personnel_rank: '',
                      assignment_date: new Date().toISOString().split('T')[0],
                      return_date: '',
                      purpose: '',
                      notes: ''
                    });
                    setShowAssignmentForm(true);
                  }}
                  className="inline-flex items-center px-6 py-3 border border-military-400 text-sm font-bold rounded-md text-military-100 bg-gradient-to-r from-tactical-700 to-tactical-600 hover:from-tactical-600 hover:to-tactical-500 focus:outline-none focus:ring-2 focus:ring-military-400 transform hover:scale-105 transition-all duration-200 font-rajdhani tracking-wide shadow-lg"
                >
                  <WeaponIcon className="w-5 h-5 mr-2" />
                  {editingAssignment ? 'MODIFY ASSIGNMENT' : 'NEW ASSIGNMENT'}
                </button>
                <button
                  onClick={() => setShowExpenditureForm(true)}
                  className="inline-flex items-center px-6 py-3 border border-military-400 text-sm font-bold rounded-md text-military-100 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transform hover:scale-105 transition-all duration-200 font-rajdhani tracking-wide shadow-lg"
                >
                  <SupplyIcon className="w-5 h-5 mr-2" />
                  RECORD EXPENDITURE
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Military Tab Navigation */}
      <div className="bg-gradient-to-r from-military-950 to-tactical-800 shadow-2xl rounded-lg border border-tactical-600">
        <div className="border-b border-tactical-600">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 px-1 border-b-2 font-bold text-sm font-rajdhani tracking-wide ${
                activeTab === 'assignments'
                  ? 'border-military-400 text-military-100'
                  : 'border-transparent text-military-400 hover:text-military-100 hover:border-military-500'
              }`}
            >
              PERSONNEL ASSIGNMENTS
            </button>
            <button
              onClick={() => setActiveTab('expenditures')}
              className={`py-4 px-1 border-b-2 font-bold text-sm font-rajdhani tracking-wide ${
                activeTab === 'expenditures'
                  ? 'border-military-400 text-military-100'
                  : 'border-transparent text-military-400 hover:text-military-100 hover:border-military-500'
              }`}
            >
              ASSET EXPENDITURES
            </button>
          </nav>
        </div>

        {/* Military Filters */}
        <div className="p-6 border-b border-tactical-600 bg-gradient-to-r from-military-950 to-tactical-800">
          <h2 className="text-lg font-bold text-military-100 mb-4 font-orbitron tracking-wide">TACTICAL FILTERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-bold text-military-300 mb-1 font-rajdhani">EQUIPMENT TYPE</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="block w-full border-tactical-600 bg-tactical-700 text-military-100 rounded-md shadow-sm focus:ring-military-400 focus:border-military-400 sm:text-sm font-rajdhani"
              >
                <option value="">ALL TYPES</option>
                <option value="Weapons">WEAPONS</option>
                <option value="Vehicles">VEHICLES</option>
                <option value="Ammunition">AMMUNITION</option>
                <option value="Communication">COMMUNICATION</option>
                <option value="Medical">MEDICAL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-military-300 mb-1 font-rajdhani">START DATE</label>
              <input
                type="date"
                value={filters.start_date}
                onChange={(e) => handleFilterChange('start_date', e.target.value)}
                className="block w-full border-tactical-600 bg-tactical-700 text-military-100 rounded-md shadow-sm focus:ring-military-400 focus:border-military-400 sm:text-sm font-rajdhani"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-military-300 mb-1 font-rajdhani">END DATE</label>
              <input
                type="date"
                value={filters.end_date}
                onChange={(e) => handleFilterChange('end_date', e.target.value)}
                className="block w-full border-tactical-600 bg-tactical-700 text-military-100 rounded-md shadow-sm focus:ring-military-400 focus:border-military-400 sm:text-sm font-rajdhani"
              />
            </div>

            {activeTab === 'assignments' && (
              <div>
                <label className="block text-sm font-bold text-military-300 mb-1 font-rajdhani">STATUS</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="block w-full border-tactical-600 bg-tactical-700 text-military-100 rounded-md shadow-sm focus:ring-military-400 focus:border-military-400 sm:text-sm font-rajdhani"
                >
                  <option value="">ALL STATUSES</option>
                  <option value="assigned">ACTIVE DUTY</option>
                  <option value="returned">MISSION COMPLETE</option>
                  <option value="overdue">OVERDUE</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Assignment Form Modal */}
      {showAssignmentForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Personnel Assignment</h3>
              <button
                onClick={() => setShowAssignmentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                <select
                  name="asset_id"
                  value={assignmentFormData.asset_id}
                  onChange={(e) => setAssignmentFormData(prev => ({ ...prev, asset_id: e.target.value }))}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Asset</option>
                  {assets.filter(asset => {
                    console.log('Asset filter debug:', { 
                      assetBaseId: asset.base_id, 
                      userBaseId: user?.base_id, 
                      quantity: asset.quantity,
                      assetName: asset.name,
                      userRole: user?.role
                    });
                    // Temporarily show all assets with quantity > 0 for debugging
                    return asset.quantity > 0;
                  }).map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.category}) - Available: {asset.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personnel Name</label>
                  <input
                    type="text"
                    name="personnel_name"
                    value={assignmentFormData.personnel_name}
                    onChange={(e) => setAssignmentFormData(prev => ({ ...prev, personnel_name: e.target.value }))}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                  <input
                    type="text"
                    name="personnel_rank"
                    value={assignmentFormData.personnel_rank}
                    onChange={(e) => setAssignmentFormData(prev => ({ ...prev, personnel_rank: e.target.value }))}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Sergeant, Lieutenant"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Date</label>
                  <input
                    type="date"
                    name="assignment_date"
                    value={assignmentFormData.assignment_date}
                    onChange={(e) => setAssignmentFormData(prev => ({ ...prev, assignment_date: e.target.value }))}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return Date</label>
                  <input
                    type="date"
                    name="return_date"
                    value={assignmentFormData.return_date}
                    onChange={(e) => setAssignmentFormData(prev => ({ ...prev, return_date: e.target.value }))}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  value={assignmentFormData.purpose}
                  onChange={(e) => setAssignmentFormData(prev => ({ ...prev, purpose: e.target.value }))}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Training Exercise, Field Operation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={assignmentFormData.notes}
                  onChange={(e) => setAssignmentFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Additional notes or instructions..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAssignmentForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (editingAssignment ? 'Updating...' : 'Creating...') : (editingAssignment ? 'Update Assignment' : 'Create Assignment')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expenditure Form Modal */}
      {showExpenditureForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Record Asset Expenditure</h3>
              <button
                onClick={() => setShowExpenditureForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleExpenditureSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                <select
                  name="asset_id"
                  value={expenditureFormData.asset_id}
                  onChange={(e) => setExpenditureFormData(prev => ({ ...prev, asset_id: e.target.value }))}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Asset</option>
                  {assets.filter(asset => {
                    // Temporarily show all assets with quantity > 0 for debugging
                    return asset.quantity > 0;
                  }).map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.category}) - Available: {asset.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Used</label>
                  <input
                    type="number"
                    name="quantity_used"
                    value={expenditureFormData.quantity_used}
                    onChange={(e) => setExpenditureFormData(prev => ({ ...prev, quantity_used: e.target.value }))}
                    min="1"
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost per Unit</label>
                  <input
                    type="number"
                    name="cost_per_unit"
                    value={expenditureFormData.cost_per_unit}
                    onChange={(e) => setExpenditureFormData(prev => ({ ...prev, cost_per_unit: e.target.value }))}
                    step="0.01"
                    min="0"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expenditure Date</label>
                <input
                  type="date"
                  name="expenditure_date"
                  value={expenditureFormData.expenditure_date}
                  onChange={(e) => setExpenditureFormData(prev => ({ ...prev, expenditure_date: e.target.value }))}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  value={expenditureFormData.purpose}
                  onChange={(e) => setExpenditureFormData(prev => ({ ...prev, purpose: e.target.value }))}
                  required
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Training, Operation, Maintenance"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={expenditureFormData.notes}
                  onChange={(e) => setExpenditureFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Additional details about the expenditure..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowExpenditureForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {loading ? 'Recording...' : 'Record Expenditure'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6 bg-gradient-to-r from-military-950 to-tactical-800">
          {activeTab === 'assignments' ? (
            <>
              <h3 className="text-lg leading-6 font-bold text-military-100 mb-4 font-orbitron tracking-wide">PERSONNEL ASSIGNMENTS</h3>
              
              {assignments.length === 0 ? (
                <div className="text-center py-8">
                  <WeaponIcon className="mx-auto h-12 w-12 text-military-400" />
                  <h3 className="mt-2 text-sm font-bold text-military-100 font-rajdhani">NO ASSIGNMENTS FOUND</h3>
                  <p className="mt-1 text-sm text-military-400 font-rajdhani">Get started by creating your first tactical assignment.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-tactical-600">
                    <thead className="bg-tactical-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">ASSET</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">PERSONNEL</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">ASSIGNMENT DATE</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">RETURN DATE</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">PURPOSE</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">STATUS</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="bg-tactical-800 divide-y divide-tactical-600">
                      {assignments.map((assignment) => (
                        <tr key={assignment.id} className="hover:bg-tactical-700 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-bold text-military-100 font-rajdhani">{assignment.asset_name}</div>
                              <div className="text-sm text-military-300 font-rajdhani">{assignment.asset_category}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-bold text-military-100 font-rajdhani">{assignment.personnel_name}</div>
                              <div className="text-sm text-military-300 font-rajdhani">{assignment.personnel_rank}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {formatDate(assignment.assignment_date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {assignment.expected_return_date ? formatDate(assignment.expected_return_date) : 'Not specified'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {assignment.purpose}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(assignment.status)} font-rajdhani`}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {/* View Details Button */}
                              <button
                                onClick={() => handleViewAssignment(assignment)}
                                className="text-military-300 hover:text-military-100 font-bold px-2 py-1 rounded border border-tactical-600 hover:bg-tactical-600 font-rajdhani transition-all duration-200"
                                title="View Details"
                              >
                                VIEW
                              </button>
                              
                              {/* Edit Button - only for active assignments */}
                              {assignment.status === 'Active' && canManageAssignments && (
                                <button
                                  onClick={() => handleEditAssignment(assignment)}
                                  className="text-military-400 hover:text-military-100 font-bold px-2 py-1 rounded border border-military-500 hover:bg-military-600 font-rajdhani transition-all duration-200"
                                  title="Edit Assignment"
                                >
                                  EDIT
                                </button>
                              )}
                              
                              {/* Return Asset Button - only for active assignments */}
                              {assignment.status === 'Active' && canManageAssignments && (
                                <button
                                  onClick={() => handleReturnAsset(assignment.id)}
                                  className="text-green-400 hover:text-green-200 font-bold px-2 py-1 rounded border border-green-600 hover:bg-green-600 font-rajdhani transition-all duration-200"
                                  title="Mark as Returned"
                                >
                                  RETURN
                                </button>
                              )}
                              
                              {/* Status Update Dropdown - for managers */}
                              {canManageAssignments && assignment.status !== 'Returned' && (
                                <select
                                  value={assignment.status}
                                  onChange={(e) => handleStatusUpdate(assignment.id, e.target.value)}
                                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                  title="Update Status"
                                >
                                  <option value="Active">Active</option>
                                  <option value="On Hold">On Hold</option>
                                  <option value="Extended">Extended</option>
                                  <option value="Overdue">Overdue</option>
                                </select>
                              )}
                              
                              {/* Delete Button - with proper authorization */}
                              {canManageAssignments && (
                                <button
                                  onClick={() => handleDeleteAssignment(assignment.id)}
                                  className="text-red-600 hover:text-red-900 font-medium px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                                  title="Delete Assignment"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="text-lg leading-6 font-bold text-military-100 mb-4 font-orbitron tracking-wide">ASSET EXPENDITURES</h3>
              
              {expenditures.length === 0 ? (
                <div className="text-center py-8">
                  <SupplyIcon className="mx-auto h-12 w-12 text-military-400" />
                  <h3 className="mt-2 text-sm font-bold text-military-100 font-rajdhani">NO EXPENDITURES FOUND</h3>
                  <p className="mt-1 text-sm text-military-400 font-rajdhani">Get started by recording your first tactical expenditure.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-tactical-600">
                    <thead className="bg-tactical-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">ASSET</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">QUANTITY USED</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">COST PER UNIT</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">TOTAL COST</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">DATE</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">PURPOSE</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">RECORDED BY</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-military-300 uppercase tracking-wider font-rajdhani">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="bg-tactical-800 divide-y divide-tactical-600">
                      {expenditures.map((expenditure) => (
                        <tr key={expenditure.id} className="hover:bg-tactical-700 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-bold text-military-100 font-rajdhani">{expenditure.asset_name}</div>
                              <div className="text-sm text-military-300 font-rajdhani">{expenditure.asset_category}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {expenditure.quantity_used}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {expenditure.cost_per_unit ? formatCurrency(expenditure.cost_per_unit) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {expenditure.total_cost ? formatCurrency(expenditure.total_cost) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {formatDate(expenditure.expenditure_date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {expenditure.purpose}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-military-100 font-rajdhani">
                            {expenditure.recorded_by_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {/* Handle view expenditure */}}
                                className="text-military-300 hover:text-military-100 font-bold px-2 py-1 rounded border border-tactical-600 hover:bg-tactical-600 font-rajdhani transition-all duration-200"
                                title="View Details"
                              >
                                VIEW
                              </button>
                              {canManageAssignments && (
                                <>
                                  <button
                                    onClick={() => {/* Handle edit expenditure */}}
                                    className="text-military-400 hover:text-military-100 font-bold px-2 py-1 rounded border border-military-500 hover:bg-military-600 font-rajdhani transition-all duration-200"
                                    title="Edit Expenditure"
                                  >
                                    EDIT
                                  </button>
                                  <button
                                    onClick={() => {/* Handle delete expenditure */}}
                                    className="text-red-400 hover:text-red-200 font-bold px-2 py-1 rounded border border-red-600 hover:bg-red-600 font-rajdhani transition-all duration-200"
                                    title="Delete Expenditure"
                                  >
                                    DELETE
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Assignment Details Modal */}
      {showAssignmentDetails && selectedAssignment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Assignment Details
                </h3>
                <button
                  onClick={() => setShowAssignmentDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Asset Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Asset Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Name:</span>
                      <p className="text-gray-900">{selectedAssignment.asset?.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Category:</span>
                      <p className="text-gray-900">{selectedAssignment.asset?.category}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Serial Number:</span>
                      <p className="text-gray-900">{selectedAssignment.asset?.serial_number}</p>
                    </div>
                  </div>
                </div>

                {/* Personnel Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Personnel Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Name:</span>
                      <p className="text-gray-900">{selectedAssignment.personnel?.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Rank:</span>
                      <p className="text-gray-900">{selectedAssignment.personnel?.rank}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Personnel ID:</span>
                      <p className="text-gray-900">{selectedAssignment.personnel?.id}</p>
                    </div>
                  </div>
                </div>

                {/* Assignment Details */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Assignment Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Assignment Date:</span>
                      <p className="text-gray-900">{formatDate(selectedAssignment.dates?.assignment)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Expected Return:</span>
                      <p className="text-gray-900">
                        {selectedAssignment.dates?.expected_return ? formatDate(selectedAssignment.dates.expected_return) : 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Actual Return:</span>
                      <p className="text-gray-900">
                        {selectedAssignment.dates?.actual_return ? formatDate(selectedAssignment.dates.actual_return) : 'Not returned yet'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAssignment.status)}`}>
                        {selectedAssignment.status?.charAt(0).toUpperCase() + selectedAssignment.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Purpose and Notes */}
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-500">Purpose:</span>
                    <p className="text-gray-900 mt-1">{selectedAssignment.purpose}</p>
                  </div>
                  {selectedAssignment.notes && (
                    <div>
                      <span className="font-medium text-gray-500">Notes:</span>
                      <p className="text-gray-900 mt-1">{selectedAssignment.notes}</p>
                    </div>
                  )}
                </div>

                {/* Administrative Information */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Administrative Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">Assigned By:</span>
                      <p className="text-gray-900">{selectedAssignment.assigned_by}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Base:</span>
                      <p className="text-gray-900">{selectedAssignment.base}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Assignment ID:</span>
                      <p className="text-gray-900">#{selectedAssignment.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                {selectedAssignment.status === 'Active' && canManageAssignments && (
                  <>
                    <button
                      onClick={() => {
                        setShowAssignmentDetails(false);
                        handleEditAssignment(selectedAssignment);
                      }}
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit Assignment
                    </button>
                    <button
                      onClick={() => {
                        setShowAssignmentDetails(false);
                        handleReturnAsset(selectedAssignment.id);
                      }}
                      className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Mark as Returned
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowAssignmentDetails(false)}
                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default AssignmentsExpenditures;
