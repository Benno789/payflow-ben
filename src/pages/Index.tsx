
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">PayFlow</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Index;
