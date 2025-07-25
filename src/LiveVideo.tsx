import React, { useRef, useEffect, useState } from 'react';

const LiveVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permission, setPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ width: number; height: number; frameRate: number }>({ width: 0, height: 0, frameRate: 0 });
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = () => {
    setPermission('pending');
    setError(null);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(s => {
        setStream(s);
        setPermission('granted');
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
        const videoTrack = s.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        setVideoInfo({
          width: settings.width || 0,
          height: settings.height || 0,
          frameRate: settings.frameRate ? Math.round(settings.frameRate) : 0,
        });
      })
      .catch(err => {
        setError('Could not access webcam. Please allow camera access or check your device.');
        setPermission('denied');
      });
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraOn(false);
      setVideoInfo({ width: 0, height: 0, frameRate: 0 });
    }
  };

  useEffect(() => {
    if (cameraOn) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [cameraOn]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <button
          onClick={() => setCameraOn(v => !v)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg ${cameraOn ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'} text-white`}
        >
          {cameraOn ? 'Stop Camera' : 'Start Camera'}
        </button>
      </div>
      {permission === 'pending' && cameraOn && (
        <div className="text-center text-gray-400">Requesting camera permission...</div>
      )}
      {error && <div className="text-center text-red-400">{error}</div>}
      <div style={{ display: cameraOn && permission === 'granted' ? 'block' : 'none' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', borderRadius: '1rem', background: '#222' }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setVideoInfo({
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight,
                frameRate: videoInfo.frameRate,
              });
            }
          }}
        />
        <div className="text-center text-xs text-gray-400 mt-2">
          Resolution: {videoInfo.width}x{videoInfo.height} | Frame Rate: {videoInfo.frameRate} fps
        </div>
      </div>
    </div>
  );
};

export default LiveVideo; 