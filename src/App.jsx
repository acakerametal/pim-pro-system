import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './services/database.js';

// Icons Components (same as before)
const Icons = {
  dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zM3 7l9 6 9-6" />
    </svg>
  ),
  products: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  attributes: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  import: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
  ),
  export: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  add: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  chevronLeft: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  trending: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  checkCircle: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  dollar: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
  trendingUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
};

// Components
const Sidebar = ({ currentView, setCurrentView, sidebarCollapsed, setSidebarCollapsed, products, attributeSets }) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Icons.dashboard, badge: null },
    { id: 'products', name: 'Products', icon: Icons.products, badge: products.length },
    { id: 'attribute-sets', name: 'Categories', icon: Icons.attributes, badge: attributeSets.length },
    { id: 'bulk-import', name: 'Import', icon: Icons.import, badge: null },
    { id: 'export', name: 'Export', icon: Icons.export, badge: null }
  ];

  const stats = [
    { label: 'Active', value: products.filter(p => p.status === 'active').length, color: 'text-green-400' },
    { label: 'Draft', value: products.filter(p => p.status === 'draft').length, color: 'text-yellow-400' },
    { label: 'Featured', value: products.filter(p => p.featured).length, color: 'text-purple-400' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-80'}`}>
      <div className="sidebar-glass h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">PIM Pro</h1>
                  <p className="text-slate-400 text-sm">Product Management</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <Icons.chevronLeft />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-6">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`nav-item w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'active text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className="px-2 py-1 bg-white/10 text-xs rounded-lg">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          {!sidebarCollapsed && (
            <div className="mt-8 p-4 glass-card rounded-2xl">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Icons.trending />
                <span className="ml-2">Quick Stats</span>
              </h3>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                    <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Admin User</p>
                <p className="text-slate-400 text-xs">admin@company.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ setCurrentView, products, attributeSets, isLoading }) => {
  const metrics = [
    {
      title: 'Total Products',
      value: isLoading ? '...' : products.length.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Icons.products,
      gradient: 'metric-gradient-1'
    },
    {
      title: 'Categories',
      value: isLoading ? '...' : attributeSets.length,
      change: '+2',
      trend: 'up',
      icon: Icons.attributes,
      gradient: 'metric-gradient-2'
    },
    {
      title: 'Active Products',
      value: isLoading ? '...' : products.filter(p => p.status === 'active').length,
      change: '+8%',
      trend: 'up',
      icon: Icons.checkCircle,
      gradient: 'metric-gradient-3'
    },
    {
      title: 'Revenue',
      value: isLoading ? '...' : '$' + (products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0) * 10).toLocaleString(),
      change: '+24%',
      trend: 'up',
      icon: Icons.dollar,
      gradient: 'metric-gradient-4'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="glass-card-elevated rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-slate-300 text-lg">
              {isLoading ? 'Loading your product catalog...' : "Here's what's happening with your product catalog today"}
            </p>
          </div>
          <div className="text-right">
            <div className="glass-card rounded-2xl p-4">
              <p className="text-slate-400 text-sm">Today</p>
              <p className="text-white font-bold text-lg">May 24, 2025</p>
              <p className="text-slate-400 text-xs">Saturday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="glass-card rounded-2xl p-6 product-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl ${metric.gradient} flex items-center justify-center shadow-lg`}>
                <metric.icon />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                metric.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                <Icons.trendingUp />
                <span className="text-xs font-semibold">{metric.change}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{metric.value}</h3>
            <p className="text-slate-400 font-medium">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="glass-card-elevated rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Products</h2>
          <button
            onClick={() => setCurrentView('products')}
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-slate-400 py-8">Loading products...</div>
          ) : (
            products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 glass-card rounded-xl table-hover">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.category_color || 'from-blue-500 to-purple-500'} flex items-center justify-center text-white font-bold`}>
                    {product.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">{product.sku}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400 text-sm">{product.category_name}</span>
                      {product.featured && (
                        <>
                          <span className="text-slate-500">•</span>
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Featured</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white font-bold text-lg">${product.price}</span>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'status-active' :
                    product.status === 'draft' ? 'status-draft' : 'status-inactive'
                  }`}>
                    <div className={`w-2 h-2 rounded-full pulse-indicator ${
                      product.status === 'active' ? 'bg-green-400' :
                      product.status === 'draft' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    {product.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProductsView = ({ products, attributeSets, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-slate-400">Manage your product catalog</p>
        </div>
        <button 
			onClick={() => setCurrentView('add-product')}
			className="button-primary flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white"
		>
			<Icons.add />
			<span>Add Product</span>
		</button>
      </div>

      <div className="glass-card-elevated rounded-2xl p-6">
        <div className="flex gap-4">
          <div className="search-container flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icons.search />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-3 glass-card rounded-xl">
            <span className="text-slate-400 font-medium">
              {isLoading ? 'Loading...' : `${filteredProducts.length} products`}
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card-elevated rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                    Loading products from database...
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="table-hover border-b border-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.category_color || 'from-blue-500 to-purple-500'} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{product.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400 text-sm">{product.sku}</span>
                            {product.featured && (
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="category-pill px-3 py-2 rounded-lg">
                        <span className="text-white text-sm font-medium">{product.category_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold text-lg">${product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-xs font-medium w-fit ${
                        product.status === 'active' ? 'status-active' :
                        product.status === 'draft' ? 'status-draft' : 'status-inactive'
                      }`}>
                        <div className={`w-2 h-2 rounded-full pulse-indicator ${
                          product.status === 'active' ? 'bg-green-400' :
                          product.status === 'draft' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        {product.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center space-x-2 px-4 py-2 glass-card rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                        <Icons.edit />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
// Bulk Import Component
const BulkImportView = ({ attributeSets, onImportComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAttributeSet, setSelectedAttributeSet] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImportResult(null);
    
    if (file) {
      // Preview first few rows
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').slice(0, 6); // First 5 rows + header
        const preview = lines.map(line => line.split(','));
        setPreviewData(preview);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile || !selectedAttributeSet) {
      alert('Please select a file and attribute set');
      return;
    }

    setImporting(true);
    
    const formData = new FormData();
    formData.append('csvFile', selectedFile);
    formData.append('attributeSetId', selectedAttributeSet);

    try {
      const response = await fetch('https://pim-pro-system-production.up.railway.app/api/import/csv', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      setImportResult(result);
      
      if (result.success) {
        onImportComplete();
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: 'Import failed: ' + error.message
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const headers = ['name', 'sku', 'price', 'status', 'featured', 'brand', 'color', 'weight'];
    const sampleData = ['Sample Product', 'SP-001', '29.99', 'active', 'false', 'Sample Brand', 'Blue', '0.5'];
    
    const csvContent = [
      headers.join(','),
      sampleData.join(',')
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bulk Import Products</h1>
        <p className="text-slate-400">Upload CSV files to import thousands of products at once</p>
      </div>

      {/* Import Form */}
      <div className="glass-card-elevated rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6">CSV Import</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Attribute Set Selection */}
            <div>
              <label className="block text-white font-medium mb-2">Select Product Category</label>
              <select
                value={selectedAttributeSet}
                onChange={(e) => setSelectedAttributeSet(e.target.value)}
                className="input-modern w-full px-4 py-3 rounded-xl text-white"
              >
                <option value="">Choose Category</option>
                {attributeSets.map(set => (
                  <option key={set.id} value={set.id}>{set.name}</option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-white font-medium mb-2">Upload CSV File</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="input-modern w-full px-4 py-3 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                />
              </div>
              {selectedFile && (
                <p className="text-green-400 text-sm mt-2">
                  ✅ {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            {/* Import Button */}
            <button
              onClick={handleImport}
              disabled={!selectedFile || !selectedAttributeSet || importing}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                importing 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'button-primary hover:scale-105'
              }`}
            >
              {importing ? 'Importing...' : 'Import Products'}
            </button>

            {/* Template Download */}
            <button
              onClick={downloadTemplate}
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
            >
              📥 Download CSV Template
            </button>
          </div>

          {/* Right Column - Preview */}
          <div>
            <h3 className="text-white font-semibold mb-4">File Preview</h3>
            {previewData.length > 0 ? (
              <div className="glass-card rounded-xl p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {previewData[0]?.map((header, index) => (
                        <th key={index} className="text-left text-white font-medium py-2 px-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(1, 6).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-white/5">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="text-slate-300 py-2 px-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.length > 6 && (
                  <p className="text-slate-400 text-xs mt-2">
                    Showing first 5 rows of {previewData.length - 1} total rows
                  </p>
                )}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-slate-400">Select a CSV file to see preview</p>
              </div>
            )}
          </div>
        </div>

        {/* Import Result */}
        {importResult && (
          <div className={`mt-6 p-4 rounded-xl ${
            importResult.success 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${importResult.success ? 'text-green-400' : 'text-red-400'}`}>
                {importResult.success ? '✅' : '❌'}
              </span>
              <span className={importResult.success ? 'text-green-300' : 'text-red-300'}>
                {importResult.message}
              </span>
            </div>
            {importResult.details && (
              <div className="mt-2 text-sm text-slate-300">
                <p>Imported: {importResult.details.imported || 0} products</p>
                <p>Errors: {importResult.details.errors || 0}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="glass-card-elevated rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">CSV Format Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Required Columns:</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• <strong>name</strong> - Product name</li>
              <li>• <strong>sku</strong> - Unique product code</li>
              <li>• <strong>price</strong> - Product price (number)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Optional Columns:</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• <strong>status</strong> - active, draft, inactive</li>
              <li>• <strong>featured</strong> - true or false</li>
              <li>• <strong>brand, color, weight</strong> - Product attributes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Form Component
const ProductFormView = ({ attributeSets, onProductSaved, editingProduct = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    status: 'draft',
    featured: false,
    attribute_set_id: '',
    attributes: {}
  });
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);

  // Initialize form data if editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        sku: editingProduct.sku || '',
        price: editingProduct.price || '',
        status: editingProduct.status || 'draft',
        featured: editingProduct.featured || false,
        attribute_set_id: editingProduct.attribute_set_id || '',
        attributes: editingProduct.attributes || {}
      });
    }
  }, [editingProduct]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAttributeChange = (attributeName, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attributeName]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.price || !formData.attribute_set_id) {
      setSaveResult({
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }

    setSaving(true);
    setSaveResult(null);

    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        price: parseFloat(formData.price),
        status: formData.status,
        featured: formData.featured,
        attribute_set_id: parseInt(formData.attribute_set_id),
        attributes: formData.attributes
      };

      const url = editingProduct 
        ? `https://pim-pro-system-production.up.railway.app/api/products/${editingProduct.id}`
        : 'https://pim-pro-system-production.up.railway.app/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (response.ok) {
        setSaveResult({
          success: true,
          message: editingProduct ? 'Product updated successfully!' : 'Product created successfully!'
        });
        
        // Reset form if creating new product
        if (!editingProduct) {
          setFormData({
            name: '',
            sku: '',
            price: '',
            status: 'draft',
            featured: false,
            attribute_set_id: '',
            attributes: {}
          });
        }
        
        onProductSaved();
      } else {
        setSaveResult({
          success: false,
          message: result.message || 'Failed to save product'
        });
      }
    } catch (error) {
      setSaveResult({
        success: false,
        message: 'Error saving product: ' + error.message
      });
    } finally {
      setSaving(false);
    }
  };

  const selectedAttributeSet = attributeSets.find(set => set.id === parseInt(formData.attribute_set_id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-slate-400">
          {editingProduct ? 'Update product information' : 'Create a new product in your catalog'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="glass-card-elevated rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-white font-medium mb-2">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-modern w-full px-4 py-3 rounded-xl text-white"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-white font-medium mb-2">
                SKU <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                className="input-modern w-full px-4 py-3 rounded-xl text-white"
                placeholder="Enter unique SKU"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-white font-medium mb-2">
                Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="input-modern w-full px-4 py-3 rounded-xl text-white"
                placeholder="0.00"
                required
              />
            </div>

            {/* Attribute Set */}
            <div>
              <label className="block text-white font-medium mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.attribute_set_id}
                onChange={(e) => handleInputChange('attribute_set_id', e.target.value)}
                className="input-modern w-full px-4 py-3 rounded-xl text-white"
                required
              >
                <option value="">Select Category</option>
                {attributeSets.map(set => (
                  <option key={set.id} value={set.id}>{set.name}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-white font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="input-modern w-full px-4 py-3 rounded-xl text-white"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="w-5 h-5 rounded bg-white/10 border border-white/20 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="featured" className="text-white font-medium">
                Featured Product
              </label>
            </div>
          </div>
        </div>

        {/* Attributes */}
        {selectedAttributeSet && (
          <div className="glass-card-elevated rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Product Attributes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common attributes */}
              <div>
                <label className="block text-white font-medium mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.attributes.brand || ''}
                  onChange={(e) => handleAttributeChange('brand', e.target.value)}
                  className="input-modern w-full px-4 py-3 rounded-xl text-white"
                  placeholder="Product brand"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Color</label>
                <input
                  type="text"
                  value={formData.attributes.color || ''}
                  onChange={(e) => handleAttributeChange('color', e.target.value)}
                  className="input-modern w-full px-4 py-3 rounded-xl text-white"
                  placeholder="Product color"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.attributes.weight || ''}
                  onChange={(e) => handleAttributeChange('weight', e.target.value)}
                  className="input-modern w-full px-4 py-3 rounded-xl text-white"
                  placeholder="0.00"
                />
              </div>

              {/* Category-specific attributes */}
              {selectedAttributeSet.name === 'Fashion & Apparel' && (
                <>
                  <div>
                    <label className="block text-white font-medium mb-2">Size</label>
                    <select
                      value={formData.attributes.size || ''}
                      onChange={(e) => handleAttributeChange('size', e.target.value)}
                      className="input-modern w-full px-4 py-3 rounded-xl text-white"
                    >
                      <option value="">Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Material</label>
                    <input
                      type="text"
                      value={formData.attributes.material || ''}
                      onChange={(e) => handleAttributeChange('material', e.target.value)}
                      className="input-modern w-full px-4 py-3 rounded-xl text-white"
                      placeholder="e.g., Cotton, Polyester"
                    />
                  </div>
                </>
              )}

              {selectedAttributeSet.name === 'Electronics & Tech' && (
                <>
                  <div>
                    <label className="block text-white font-medium mb-2">Warranty (months)</label>
                    <input
                      type="number"
                      value={formData.attributes.warranty || ''}
                      onChange={(e) => handleAttributeChange('warranty', e.target.value)}
                      className="input-modern w-full px-4 py-3 rounded-xl text-white"
                      placeholder="12"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Save Result */}
        {saveResult && (
          <div className={`p-4 rounded-xl ${
            saveResult.success 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${saveResult.success ? 'text-green-400' : 'text-red-400'}`}>
                {saveResult.success ? '✅' : '❌'}
              </span>
              <span className={saveResult.success ? 'text-green-300' : 'text-red-300'}>
                {saveResult.message}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
              saving 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'button-primary hover:scale-105'
            }`}
          >
            {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
          </button>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [attributeSets, setAttributeSets] = useState([]);
  const [products, setProducts] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // Load data from database on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Test database connection
      const connected = await db.testConnection();
      setDbConnected(connected);
      
      if (connected) {
        // Load products and attribute sets
        const [productsData, attributeSetsData] = await Promise.all([
          db.getProducts(),
          db.getAttributeSets()
        ]);
        
        setProducts(productsData);
        setAttributeSets(attributeSetsData);
        console.log('Data loaded successfully:', { products: productsData.length, attributeSets: attributeSetsData.length });
      } else {
        console.error('Database connection failed');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} products={products} attributeSets={attributeSets} isLoading={isLoading} />;
      case 'products':
        return <ProductsView products={products} attributeSets={attributeSets} isLoading={isLoading} />;
      case 'attribute-sets':
        return (
          <div className="glass-card-elevated rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-white mb-4">Attribute Sets</h1>
            <p className="text-slate-400">Attribute sets management coming soon...</p>
          </div>
        );
      case 'bulk-import':
		return (
			<BulkImportView 
			attributeSets={attributeSets} 
			onImportComplete={() => loadData()} 
			/>
		);
      case 'export':
        return (
          <div className="glass-card-elevated rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-white mb-4">Export Products</h1>
            <p className="text-slate-400">Export functionality coming soon...</p>
          </div>
        );
      default:
        return <Dashboard setCurrentView={setCurrentView} products={products} attributeSets={attributeSets} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen app-background">
      {/* Database Connection Status */}
      {!dbConnected && !isLoading && (
        <div className="fixed top-4 right-4 z-50 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">⚠️ Database connection failed</p>
        </div>
      )}
      
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        products={products}
        attributeSets={attributeSets}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
        <div className="p-8">
          {renderCurrentView()}
        </div>
      </div>

      <button
        onClick={() => setCurrentView('export')}
        className="floating-button fixed bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center text-white z-40"
      >
        <Icons.export />
      </button>
    </div>
  );
};

export default App;