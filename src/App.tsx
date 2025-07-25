import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  Settings, 
  Wifi, 
  Monitor, 
  Terminal,
  Cloud,
  Activity,
  Users,
  Radio,
  Server,
  Zap
} from 'lucide-react';
import LiveVideo from './LiveVideo';

function App() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [logs, setLogs] = useState([
    { time: '14:32:01', type: 'info', message: 'Streaming service initialized' },
    { time: '14:32:05', type: 'success', message: 'Kubernetes cluster connected' },
    { time: '14:32:08', type: 'info', message: 'WebRTC peer connection established' },
    { time: '14:32:12', type: 'warning', message: 'Bandwidth optimization active' },
  ]);

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewers(prev => prev + Math.floor(Math.random() * 3));
        
        const newLog = {
          time: new Date().toLocaleTimeString(),
          type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as 'info' | 'success' | 'warning',
          message: [
            'Stream quality: 1080p @ 60fps',
            'New viewer connected',
            'Kubernetes pod scaled up',
            'CDN cache refreshed',
            'Audio/Video sync verified'
          ][Math.floor(Math.random() * 5)]
        };
        
        setLogs(prev => [...prev.slice(-9), newLog]);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  const handleStartStream = () => {
    setIsStreaming(true);
    setViewers(1);
  };

  const handleEndStream = () => {
    setIsStreaming(false);
    setViewers(0);
  };

  const handleConnectKubernetes = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 text-green-50 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#10B981" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-green-500/20 transform rotate-45">
          <Server size={24} />
        </div>
        <div className="absolute top-40 right-32 text-green-400/20 transform -rotate-12">
          <Cloud size={32} />
        </div>
        <div className="absolute bottom-32 left-48 text-green-500/20 transform rotate-180">
          <Activity size={28} />
        </div>
        <div className="absolute bottom-20 right-20 text-green-400/20">
          <Zap size={20} />
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center">
              <Radio className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              KubeCast
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-full border border-green-500/30">
              <Wifi size={16} className={isConnected ? 'text-green-400' : 'text-gray-400'} />
              <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-full border border-green-500/30">
              <Users size={16} className="text-green-400" />
              <span className="text-sm">{viewers} viewers</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 rounded-2xl border border-green-500/20 overflow-hidden backdrop-blur-sm">
              <div className="p-4 border-b border-green-500/20">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Monitor size={20} className="text-green-400" />
                  <span>Live Stream Feed</span>
                  {isStreaming && (
                    <div className="flex items-center space-x-2 ml-auto">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-400">LIVE</span>
                    </div>
                  )}
                </h2>
              </div>
              
              <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                {isStreaming ? (
                  <LiveVideo />
                ) : (
                  <div className="text-center">
                    <Monitor size={48} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Click "Start Stream" to begin broadcasting</p>
                  </div>
                )}
                
                {/* Stream overlay info */}
                {isStreaming && (
                  <div className="absolute top-4 left-4 bg-black/60 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Recording</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Control Panel */}
              <div className="p-6 bg-gray-900/30">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={handleStartStream}
                    disabled={isStreaming}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  >
                    <Play size={20} />
                    <span>Start Stream</span>
                  </button>
                  
                  <button
                    onClick={handleEndStream}
                    disabled={!isStreaming}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    <Square size={20} />
                    <span>End Stream</span>
                  </button>
                  
                  <button
                    onClick={handleConnectKubernetes}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg ${
                      isConnected 
                        ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/25' 
                        : 'bg-gray-600 hover:bg-gray-500 hover:shadow-gray-500/25'
                    }`}
                  >
                    <Server size={20} />
                    <span>{isConnected ? 'Disconnect K8s' : 'Connect to Kubernetes'}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* System Logs & Status */}
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-gray-900/50 rounded-2xl border border-green-500/20 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Activity size={20} className="text-green-400" />
                <span>System Status</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">Kubernetes</span>
                  <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">WebRTC</span>
                  <div className={`w-3 h-3 rounded-full ${isStreaming ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">CDN</span>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm">Load Balancer</span>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="bg-gray-900/50 rounded-2xl border border-green-500/20 backdrop-blur-sm">
              <div className="p-4 border-b border-green-500/20">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Terminal size={20} className="text-green-400" />
                  <span>System Logs</span>
                </h3>
              </div>
              
              <div className="p-4 h-80 overflow-y-auto">
                <div className="space-y-2 font-mono text-sm">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 text-xs">
                      <span className="text-gray-500 min-w-[60px]">{log.time}</span>
                      <span className={`min-w-[60px] ${
                        log.type === 'success' ? 'text-green-400' : 
                        log.type === 'warning' ? 'text-yellow-400' : 
                        'text-blue-400'
                      }`}>
                        [{log.type.toUpperCase()}]
                      </span>
                      <span className="text-gray-300 flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;