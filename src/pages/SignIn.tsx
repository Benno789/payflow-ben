
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }
    
    // In einer echten App würde hier eine API-Anfrage stattfinden
    // Für die Demo navigieren wir direkt zum Onboarding
    localStorage.setItem('userEmail', email);
    navigate('/onboarding');
  };

  const handleGoogleSignIn = () => {
    // In einer echten App würde hier die Google-Authentifizierung stattfinden
    toast.info('Google-Anmeldung würde hier stattfinden');
    navigate('/onboarding');
  };

  const handleAppleSignIn = () => {
    // In einer echten App würde hier die Apple-Authentifizierung stattfinden
    toast.info('Apple-Anmeldung würde hier stattfinden');
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-2">
            <h1 className="text-3xl font-bold mr-2">payflow</h1>
            <img src="/lovable-uploads/80f382fd-8b96-4c0e-bb3a-85d2daf023e5.png" alt="PayFlow Logo" className="w-12 h-12" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-1">Create an account</h2>
        <p className="text-center text-gray-600 mb-6">Enter your email to sign up for this app</p>

        <form onSubmit={handleContinue} className="space-y-4">
          <Input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Continue
          </Button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full mb-3 flex items-center justify-center"
          onClick={handleGoogleSignIn}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full flex items-center justify-center"
          onClick={handleAppleSignIn}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5,3C14.76,3,13.09,4.03,12,5.5C10.91,4.03,9.24,3,7.5,3C4.42,3,2,5.41,2,8.5c0,3.77,3.4,6.86,8.55,11.54L12,21.35l1.45-1.32C18.6,15.36,22,12.27,22,8.5C22,5.41,19.58,3,16.5,3z" />
          </svg>
          Continue with Apple
        </Button>

        <div className="text-xs text-center mt-6 text-gray-500">
          By clicking continue, you agree to our{' '}
          <a href="#" className="text-black underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-black underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
