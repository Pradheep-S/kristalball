import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon,
  KeyIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

function Login({ onLogin }) {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [isSignup, setIsSignup] = useState(false);
  const [bases, setBases] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "logistics_officer",
    base_id: "1"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Animation effects
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.querySelectorAll('.form-field'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [isSignup]);

  // Fetch bases when component mounts or when switching to signup
  useEffect(() => {
    if (isSignup) {
      fetchBases();
    }
  }, [isSignup]);

  const fetchBases = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/bases');
      if (response.ok) {
        const data = await response.json();
        const uniqueBases = data.bases || [];
        setBases(uniqueBases);
        if (uniqueBases.length > 0) {
          setFormData(prev => ({
            ...prev,
            base_id: uniqueBases[0].id.toString()
          }));
        }
      } else {
        throw new Error('Failed to fetch bases');
      }
    } catch (error) {
      console.error('Failed to fetch bases:', error);
      // Fallback to default bases if API fails
      const defaultBases = [
        { id: 1, name: 'Fort Alpha', location: 'Washington, DC' },
        { id: 2, name: 'Base Beta', location: 'San Diego, CA' },
        { id: 3, name: 'Station Gamma', location: 'Norfolk, VA' },
        { id: 4, name: 'Camp Delta', location: 'Fort Bragg, NC' },
        { id: 5, name: 'Naval Base Echo', location: 'Pearl Harbor, HI' }
      ];
      setBases(defaultBases);
      setFormData(prev => ({
        ...prev,
        base_id: defaultBases[0].id.toString()
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (isSignup) {
      if (!formData.username.trim()) {
        setError("Username is required");
        return false;
      }
      if (!formData.email.trim()) {
        setError("Email is required");
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    } else {
      if (!formData.username.trim()) {
        setError("Username is required");
        return false;
      }
      if (!formData.password.trim()) {
        setError("Password is required");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(error);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const endpoint = isSignup ? 'signup' : 'login';
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignup) {
          setSuccessMessage(data.message || "Account created successfully! You can now log in.");
          toast.success("Account created successfully!");
          setTimeout(() => {
            setIsSignup(false);
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "logistics_officer",
              base_id: "1"
            });
          }, 2000);
        } else {
          toast.success("Login successful!");
          onLogin(data.token, data.user);
        }
      } else {
        setError(data.message || data.error || 'An error occurred');
        toast.error(data.message || data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = 'Network error. Please check your connection and ensure the backend server is running.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setIsSignup(!isSignup);
    setError("");
    setSuccessMessage("");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "logistics_officer",
      base_id: "1"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-dark-military military-pattern flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Cpath d='M0 0h40v40H0V0zm40 0h40v40H40V0zm0 40h40v40H40V40zM0 40h40v40H0V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div 
        ref={containerRef}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-tactical rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-military-2xl border border-military-600"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg className="w-12 h-12 text-desert-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-desert-200 mb-2 font-military tracking-wider">
            TACTICAL ASSET COMMAND
          </h1>
          <p className="text-military-300 font-tactical tracking-wide">
            {isSignup ? "REGISTER FOR DEPLOYMENT" : "SECURE ACCESS TO MILITARY ASSETS"}
          </p>
          <div className="w-16 h-0.5 bg-accent-light mx-auto mt-3"></div>
        </motion.div>

        {/* Demo Info Box */}
        <motion.div 
          className="bg-military-800/40 backdrop-blur-md rounded-xl p-4 mb-6 border border-military-600/50 shadow-military"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <InformationCircleIcon className="w-5 h-5 text-accent-light" />
            <span className="text-desert-200 font-medium font-military tracking-wide">DEMO MODE - CLASSIFIED</span>
          </div>
          <p className="text-military-200 text-sm font-tactical">
            {isSignup 
              ? "Complete registration form for tactical deployment access!"
              : "Use these authorized access codes for demonstration:"
            }
          </p>
          {!isSignup && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-military-700/50 rounded px-2 py-1 border border-military-600">
                <span className="text-desert-100 font-mono">admin / admin123</span>
              </div>
              <div className="bg-military-700/50 rounded px-2 py-1 border border-military-600">
                <span className="text-desert-100 font-mono">commander / commander123</span>
              </div>
              <div className="bg-military-700/50 rounded px-2 py-1 border border-military-600">
                <span className="text-desert-100 font-mono">logistics / logistics123</span>
              </div>
              <div className="bg-military-700/50 rounded px-2 py-1 border border-military-600">
                <span className="text-desert-100 font-mono">demo / demo123</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Form Card */}
        <motion.div 
          className="bg-military-800/20 backdrop-blur-md rounded-2xl p-8 shadow-military-2xl border border-military-600/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Tab Switcher */}
          <div className="flex mb-8 bg-military-950/40 rounded-xl p-1 border border-military-700">
            <motion.button
              onClick={() => !isSignup && handleModeSwitch()}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 font-tactical tracking-wide ${
                !isSignup 
                  ? 'bg-gradient-tactical text-desert-100 shadow-military-lg border border-military-600' 
                  : 'text-military-300 hover:bg-military-800/30 hover:text-desert-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SIGN IN
            </motion.button>
            <motion.button
              onClick={() => isSignup && handleModeSwitch()}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 font-tactical tracking-wide ${
                isSignup 
                  ? 'bg-gradient-tactical text-desert-100 shadow-military-lg border border-military-600' 
                  : 'text-military-300 hover:bg-military-800/30 hover:text-desert-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              REGISTER
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
            <div className="space-y-6">
              {/* Username Field */}
              <motion.div 
                key="username-field"
                className="form-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-desert-200 mb-2 font-tactical tracking-wide">
                  OPERATOR ID
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-military-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-military-800/30 border border-military-600 rounded-xl text-desert-100 placeholder-military-400 focus:bg-military-700/40 focus:border-accent-light focus:outline-none transition-all duration-300 font-mono"
                    placeholder="Enter operator identification"
                  />
                </div>
              </motion.div>

              {/* Email Field (Signup only) */}
              <AnimatePresence>
                {isSignup && (
                  <motion.div 
                    key="email-field"
                    className="form-field"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-desert-200 mb-2 font-tactical tracking-wide">
                      SECURE EMAIL
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-military-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-military-800/30 border border-military-600 rounded-xl text-desert-100 placeholder-military-400 focus:bg-military-700/40 focus:border-accent-light focus:outline-none transition-all duration-300 font-mono"
                        placeholder="Enter secure email address"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password Field */}
              <motion.div 
                key="password-field"
                className="form-field"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: isSignup ? 0.2 : 0.1 }}
              >
                <label className="block text-sm font-medium text-desert-200 mb-2 font-tactical tracking-wide">
                  ACCESS CODE
                </label>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-military-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-military-800/30 border border-military-600 rounded-xl text-desert-100 placeholder-military-400 focus:bg-military-700/40 focus:border-accent-light focus:outline-none transition-all duration-300 font-mono"
                    placeholder="Enter secure access code"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-military-400 hover:text-desert-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Confirm Password Field (Signup only) */}
              <AnimatePresence>
                {isSignup && (
                  <motion.div 
                    key="confirm-password-field"
                    className="form-field"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none transition-all duration-300"
                        placeholder="Confirm your password"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Role and Base Fields (Signup only) */}
              <AnimatePresence>
                {isSignup && (
                  <motion.div
                    key="signup-additional-fields"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="space-y-6"
                  >
                    <motion.div 
                      className="form-field"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-white mb-2">
                        Role
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:bg-white/20 focus:border-blue-400 focus:outline-none transition-all duration-300"
                      >
                        <option value="logistics_officer" className="text-slate-900">Logistics Officer</option>
                        <option value="commander" className="text-slate-900">Commander</option>
                        <option value="admin" className="text-slate-900">Administrator</option>
                        <option value="inventory_manager" className="text-slate-900">Inventory Manager</option>
                      </select>
                    </motion.div>

                    <motion.div 
                      className="form-field"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-white mb-2">
                        Base Assignment
                      </label>
                      <div className="relative">
                        <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                        <select
                          name="base_id"
                          value={formData.base_id}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:bg-white/20 focus:border-blue-400 focus:outline-none transition-all duration-300"
                        >
                          {bases.map((base, index) => (
                            <option key={`base-option-${base.id}-${index}`} value={base.id} className="text-slate-900">
                              {base.name} - {base.location}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center space-x-2 text-red-300 bg-red-500/20 border border-red-500/30 rounded-xl p-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  className="flex items-center space-x-2 text-green-300 bg-green-500/20 border border-green-500/30 rounded-xl p-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-tactical text-desert-100 py-3 px-4 rounded-xl font-medium hover:shadow-military-lg focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-military hover:shadow-military-xl border border-military-600 font-tactical tracking-wide"
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-desert-200 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>PROCESSING...</span>
                </div>
              ) : (
                isSignup ? "REGISTER FOR DEPLOYMENT" : "AUTHENTICATE ACCESS"
              )}
            </motion.button>
          </form>

          {/* Switch Mode */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-military-300 font-tactical">
              {isSignup ? "Already have clearance?" : "Need deployment authorization?"}
            </p>
            <motion.button
              onClick={handleModeSwitch}
              className="text-accent-light hover:text-desert-100 font-medium underline transition-colors duration-300 font-tactical tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignup ? "ACCESS EXISTING ACCOUNT" : "REQUEST NEW AUTHORIZATION"}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 text-military-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-military tracking-wider">© 2025 TACTICAL ASSET COMMAND SYSTEM</p>
          <p className="font-tactical tracking-widest text-xs mt-1">CLASSIFIED • AUTHORIZED PERSONNEL ONLY • TAC-OPS</p>
          <div className="flex justify-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-accent-light rounded-full"></div>
            <div className="w-2 h-2 bg-military-600 rounded-full"></div>
            <div className="w-2 h-2 bg-accent-light rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
