import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface CustomerSignUpViewProps {
  onNavigate: (path: string) => void;
}

export const CustomerSignUpView: React.FC<CustomerSignUpViewProps> = ({ onNavigate }) => {
  const { signup, loginWithGoogle, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [petName, setPetName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    try {
      await signup({
        name: fullName.trim(),
        email: emailOrPhone.includes('@') ? emailOrPhone.trim() : `${emailOrPhone.trim()}@zooby.app`,
        phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : '+91 98201 23456',
        role: 'PET_PARENT'
      });
      onNavigate('/dashboard');
    } catch (err: any) {
      setErrorMessage('Registration could not be completed. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      onNavigate('/dashboard');
    } catch {
      setErrorMessage('Google sign up could not be completed.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fbf9f5] font-jakarta text-[#1b1c1a] selection:bg-[#ffdcbc] selection:text-[#683c00]">
      {/* Left Column: Welcome image */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-screen bg-[#2d241b] overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        <img
          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1400"
          alt="Happy puppy"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 cursor-pointer text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-[#895100] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px] filled-icon">pets</span>
            </div>
            <span className="font-quicksand font-bold text-2xl tracking-tight text-white">
              Zooby
            </span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Value Prop */}
        <div className="relative z-10 max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-2xl text-[#1b1c1a]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ffdcbc] text-[#895100]">
              Free Pet Parent Membership
            </span>
            <div className="flex text-amber-500 text-xs">★★★★★</div>
          </div>
          <p className="text-sm font-medium text-[#2d2319] leading-snug">
            "Join thousands of pet parents managing vaccinations, nutrition, and care routines with ease."
          </p>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="font-quicksand font-bold text-3xl text-[#1b1c1a] tracking-tight">
              Create Your Zooby Account
            </h1>
            <p className="text-sm text-[#877462] mt-1.5">
              Sign up in seconds to start building your pet's digital health vault.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-[#ffdad6] text-[#93000a] text-xs font-semibold rounded-xl flex items-center gap-2 border border-[#ffb4ab]">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label
                htmlFor="signup-name-input"
                className="block text-xs font-bold text-[#544434] uppercase tracking-wider mb-1.5"
              >
                Your Full Name
              </label>
              <input
                id="signup-name-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rohan Deshmukh"
                className="w-full px-4 py-3 bg-white border border-[#dac2ae] rounded-xl text-sm text-[#1b1c1a] placeholder-[#a8998a] focus:outline-none focus:ring-2 focus:ring-[#895100]"
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email-input"
                className="block text-xs font-bold text-[#544434] uppercase tracking-wider mb-1.5"
              >
                Email or Mobile Number
              </label>
              <input
                id="signup-email-input"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com or +91 98201 00000"
                className="w-full px-4 py-3 bg-white border border-[#dac2ae] rounded-xl text-sm text-[#1b1c1a] placeholder-[#a8998a] focus:outline-none focus:ring-2 focus:ring-[#895100]"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="signup-pet-input"
                className="block text-xs font-bold text-[#544434] uppercase tracking-wider mb-1.5"
              >
                Pet's Name (Optional)
              </label>
              <input
                id="signup-pet-input"
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g. Bruno or Luna"
                className="w-full px-4 py-3 bg-white border border-[#dac2ae] rounded-xl text-sm text-[#1b1c1a] placeholder-[#a8998a] focus:outline-none focus:ring-2 focus:ring-[#895100]"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password-input"
                className="block text-xs font-bold text-[#544434] uppercase tracking-wider mb-1.5"
              >
                Create Password
              </label>
              <div className="relative">
                <input
                  id="signup-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 bg-white border border-[#dac2ae] rounded-xl text-sm text-[#1b1c1a] placeholder-[#a8998a] focus:outline-none focus:ring-2 focus:ring-[#895100] pr-11"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#877462] hover:text-[#1b1c1a] p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              id="signup-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#895100] text-white font-bold text-sm hover:bg-[#683c00] transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account &amp; Get Started</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Google Sign Up */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#e5e0d8] w-full" />
            <span className="bg-[#fbf9f5] px-3 text-xs text-[#877462] font-semibold uppercase tracking-wider absolute">
              or
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-white border border-[#dac2ae] hover:bg-[#f5f3ef] text-[#1b1c1a] font-bold text-sm transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign Up with Google</span>
          </button>

          {/* Already have an account? Sign In */}
          <div className="text-center pt-2">
            <p className="text-sm text-[#544434]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="font-bold text-[#895100] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
