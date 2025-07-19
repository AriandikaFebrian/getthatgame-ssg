import React from 'react';

const LoadingOverlay: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
      <div className="w-16 h-16 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
