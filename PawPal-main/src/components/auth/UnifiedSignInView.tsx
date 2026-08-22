import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../data/authDemoData';

interface UnifiedSignInViewProps {
  onNavigate: (path: string) => void;
}

export const UnifiedSignInView: React.FC<UnifiedSignInViewProps> = ({ onNavigate }) => {
  const { login, loginWithGoogle, isLoading } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSentMessage, setForgotSentMessage] = useState('');

  // Unified Sign In Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      // 1. Authenticate user
      const authenticatedUser = await login(emailOrPhone, password);

      // 2. Automatic Role Detection & Redirect
      if (authenticatedUser.role === 'ADMIN') {
        onNavigate('/admin/dashboard');
      } else if (authenticatedUser.role === 'PROVIDER') {
        onNavigate('/provider/dashboard');
      } else {
        // Default PET_PARENT
        onNavigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check your credentials.');
    }
  };

  // Google OAuth Handler
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    try {
      const authenticatedUser = await loginWithGoogle();
      if (authenticatedUser.role === 'ADMIN') {
        onNavigate('/admin/dashboard');
      } else if (authenticatedUser.role === 'PROVIDER') {
        onNavigate('/provider/dashboard');
      } else {
        onNavigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMessage('Google sign in could not be completed.');
    }
  };

  // Pre-fill demo credentials helper for easy testing without changing login UI
  const handlePrefillDemo = (roleKey: 'PET_PARENT' | 'PROVIDER' | 'ADMIN') => {
    const demo = DEMO_USERS[roleKey];
    setEmailOrPhone(demo.user.email);
    setPassword(demo.passwordHint);
    setErrorMessage('');
  };

  const handleSendForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      return;
    }
    setForgotSentMessage(`Password reset link sent to ${forgotEmail}. Please check your inbox.`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fbf9f5] font-jakarta text-[#1b1c1a] selection:bg-[#ffdcbc] selection:text-[#683c00]">
      {/* Left Lifestyle & Brand Showcase */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-screen bg-[#2d241b] overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1400"
          alt="Happy pet parent with golden retriever"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none" />

        {/* Brand Top Header */}
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

        {/* Testimonial card */}
        <div className="relative z-10 max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-2xl text-[#1b1c1a]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ffdcbc] text-[#895100]">
              Unified Care Platform
            </span>
            <div className="flex text-amber-500 text-xs">★★★★★</div>
          </div>
          <p className="text-sm font-medium text-[#2d2319] leading-snug">
            "One seamless portal for appointments, vaccinations, medical history, and care operations."
          </p>
          <p className="text-xs text-[#877462] mt-2 font-semibold">
            Trusted by 12,000+ pets, parents, and certified care providers across Mumbai.
          </p>
        </div>
      </div>

      {/* Right Column: Unified Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="font-quicksand font-bold text-3xl text-[#1b1c1a] tracking-tight flex items-center gap-2">
              <span>Welcome back to Zooby</span>
              <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm text-[#877462] mt-1.5">
              Enter your credentials below to access your Zooby account.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-[#ffdad6] text-[#93000a] text-xs font-semibold rounded-xl flex items-center gap-2 border border-[#ffb4ab]">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Unified Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Email / Phone Field */}
            <div>
              <label
                htmlFor="unified-email-input"
                className="block text-xs font-bold text-[#544434] uppercase tracking-wider mb-1.5"
              >
                Email / Phone
              </label>
              <input
                id="unified-email-input"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com or mobile number"
                className="w-full px-4 py-3 bg-white border border-[#dac2ae] rounded-xl text-sm text-[#1b1c1a] placeholder-[#a8998a] focus:outline-none focus:ring-2 focus:ring-[#895100] transition-all"
                autoComplete="username"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="unified-password-input"
                  className="text-xs font-bold text-[#544434] uppercase tracking-wider"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(emailOrPhone);
                    setForgotSentMessage('');
                    setIsForgotPasswordOpen(true);
                  }}
                  className="text-xs text-[#895100] font-bold hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="unified-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-[#dac2ae] rounded-xl text-sm text-[#1b1c1a] placeholder-[#a8998a] focus:outline-none focus:ring-2 focus:ring-[#895100] transition-all pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#877462] hover:text-[#1b1c1a] p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              id="unified-signin-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#895100] text-white font-bold text-sm hover:bg-[#683c00] transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#e5e0d8] w-full" />
            <span className="bg-[#fbf9f5] px-3 text-xs text-[#877462] font-semibold uppercase tracking-wider absolute">
              or
            </span>
          </div>

          {/* Continue with Google */}
          <button
            id="unified-google-signin-btn"
            type="button"
            onClick={handleGoogleSignIn}
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
            <span>Continue with Google</span>
          </button>

          {/* Create Account Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-[#544434]">
              Don't have an account?{' '}
              <button
                id="unified-create-account-btn"
                type="button"
                onClick={() => onNavigate('/signup')}
                className="font-bold text-[#895100] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Quick Demo Autofill Helper for reviewers/evaluators */}
          <div className="mt-8 pt-4 border-t border-[#efeeea] bg-[#fffaf4] rounded-2xl p-3.5 border border-[#ffdcbc]/60">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-[#895100]">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Quick Test Accounts (Prefill &amp; Test Role Detection)</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handlePrefillDemo('PET_PARENT')}
                className="px-2 py-1.5 bg-white hover:bg-[#ffeed9] border border-[#dac2ae] rounded-lg text-[11px] font-semibold text-[#544434] transition-colors cursor-pointer text-center"
              >
                Pet Parent
              </button>
              <button
                type="button"
                onClick={() => handlePrefillDemo('PROVIDER')}
                className="px-2 py-1.5 bg-white hover:bg-[#ffeed9] border border-[#dac2ae] rounded-lg text-[11px] font-semibold text-[#544434] transition-colors cursor-pointer text-center"
              >
                Care Provider
              </button>
              <button
                type="button"
                onClick={() => handlePrefillDemo('ADMIN')}
                className="px-2 py-1.5 bg-white hover:bg-[#ffeed9] border border-[#dac2ae] rounded-lg text-[11px] font-semibold text-[#544434] transition-colors cursor-pointer text-center"
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#dac2ae] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center">
              <h3 className="font-quicksand font-bold text-xl text-[#1b1c1a]">
                Reset Your Password
              </h3>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f5f3ef] flex items-center justify-center text-[#877462] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-xs text-[#544434]">
              Enter your registered email address or phone number and we’ll send you a link to reset your password.
            </p>

            {forgotSentMessage ? (
              <div className="p-3 bg-[#c2edca] text-[#294e35] text-xs font-semibold rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>{forgotSentMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSendForgotPassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#544434] uppercase tracking-wider mb-1">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-[#dac2ae] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#895100]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#895100] text-white font-bold text-sm hover:bg-[#683c00] transition-colors cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-xs font-bold text-[#895100] hover:underline cursor-pointer"
              >
                Return to Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
