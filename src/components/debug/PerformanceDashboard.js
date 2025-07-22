import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/hooks/usePerformance';
import { getCacheStorageUsage, clearAllCaches } from '@/lib/serviceWorker';
import { 
  Activity, 
  Zap, 
  Clock, 
  Eye, 
  Wifi, 
  WifiOff, 
  Trash2, 
  RefreshCw,
  X,
  BarChart3
} from 'lucide-react';

/**
 * Performance Dashboard Component
 * Only shown in development mode or when explicitly enabled
 */
const PerformanceDashboard = ({ isVisible, onClose }) => {
  const { metrics, memoryUsage, isLoading, getSummary, isPerformanceGood, refresh } = usePerformance();
  const [storageUsage, setStorageUsage] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('vitals');

  useEffect(() => {
    // Update online status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Get storage usage
    getCacheStorageUsage().then(setStorageUsage);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleClearCaches = async () => {
    const success = await clearAllCaches();
    if (success) {
      alert('Caches cleared successfully!');
      getCacheStorageUsage().then(setStorageUsage);
    }
  };

  const getMetricColor = (rating) => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const formatValue = (metric, value) => {
    if (!value) return 'N/A';
    if (metric === 'CLS') return value.toFixed(3);
    return `${Math.round(value)}ms`;
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Performance Monitor</h3>
            <div className={`flex items-center space-x-1 ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
              {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              <span className="text-xs">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refresh}
              className="p-1 hover:bg-gray-200 rounded"
              title="Refresh metrics"
            >
              <RefreshCw className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded"
              title="Close dashboard"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'vitals', label: 'Web Vitals', icon: Activity },
            { id: 'memory', label: 'Memory', icon: Zap },
            { id: 'storage', label: 'Storage', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium flex items-center justify-center space-x-1 ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {activeTab === 'vitals' && (
            <div className="space-y-4">
              {/* Performance Score */}
              {isPerformanceGood && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Performance Score</span>
                    <span className={`text-lg font-bold ${
                      isPerformanceGood.isGood ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {Math.round(isPerformanceGood.score)}%
                    </span>
                  </div>
                </div>
              )}

              {/* Core Web Vitals */}
              <div className="space-y-3">
                {[
                  { key: 'LCP', name: 'Largest Contentful Paint', icon: Eye },
                  { key: 'FID', name: 'First Input Delay', icon: Clock },
                  { key: 'CLS', name: 'Cumulative Layout Shift', icon: Activity },
                  { key: 'FCP', name: 'First Contentful Paint', icon: Zap },
                  { key: 'TTFB', name: 'Time to First Byte', icon: Wifi }
                ].map((vital) => {
                  const metric = metrics?.[vital.key];
                  return (
                    <div key={vital.key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-2">
                        <vital.icon className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{vital.key}</div>
                          <div className="text-xs text-gray-500">{vital.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getMetricColor(metric?.rating)}`}>
                          {formatValue(vital.key, metric?.value)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {metric?.rating || 'Loading...'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'memory' && (
            <div className="space-y-4">
              {memoryUsage ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">JavaScript Heap</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Used</span>
                        <span className="font-medium">{memoryUsage.usedJSHeapSize} MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total</span>
                        <span className="font-medium">{memoryUsage.totalJSHeapSize} MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Limit</span>
                        <span className="font-medium">{memoryUsage.jsHeapSizeLimit} MB</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(memoryUsage.usedJSHeapSize / memoryUsage.jsHeapSizeLimit) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Memory information not available
                </div>
              )}
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-4">
              {storageUsage ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Cache Storage</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Used</span>
                        <span className="font-medium">
                          {(storageUsage.usage / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Available</span>
                        <span className="font-medium">
                          {(storageUsage.available / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Usage</span>
                        <span className="font-medium">
                          {storageUsage.usagePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${storageUsage.usagePercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleClearCaches}
                    className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All Caches</span>
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Storage information not available
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Performance monitoring • Press Ctrl+Shift+P to toggle
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceDashboard;