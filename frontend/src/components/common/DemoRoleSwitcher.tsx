import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface DemoRoleSwitcherProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const DemoRoleSwitcher: React.FC<DemoRoleSwitcherProps> = ({ currentPath, onNavigate }) => {
  const { user, role, isAuthenticated, loginDemo, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-jakarta text-xs">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-2 bg-[#221c17] text-[#fbf9f5] border border-[#524436] rounded-2xl p-4 shadow-2xl w-72 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-[#3e3227] pb-2">
            <span className="font-bold text-[#ffb86c] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px]">switch_account</span>
              <span>Role &amp; Auth Switcher</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#a8998a] hover:text-white p-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="text-[11px] text-[#a8998a] space-y-1">
            <p>
              Current User: <strong className="text-white">{user ? user.name : 'Guest (Public)'}</strong>
            </p>
            <p>
              Active Role:{' '}
              <span
                className={`px-1.5 py-0.5 rounded-full font-bold text-[10px] ${
                  role === 'ADMIN'
                    ? 'bg-amber-400/20 text-amber-300'
                    : role === 'PROVIDER'
                    ? 'bg-orange-400/20 text-orange-300'
                    : role === 'PET_PARENT'
                    ? 'bg-emerald-400/20 text-emerald-300'
                    : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                {role || 'UNAUTHENTICATED'}
              </span>
            </p>
            <p className="font-mono text-[10px] text-[#7a6b5e] truncate">Route: {currentPath}</p>
          </div>

          <div className="space-y-1.5 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#d6c7b7]">
              Switch Persona (1-Click Demo)
            </p>

            <button
              onClick={async () => {
                await loginDemo('PET_PARENT');
                onNavigate('/dashboard');
              }}
              className="w-full py-1.5 px-2.5 rounded-xl bg-[#2e251e] hover:bg-[#3d3228] text-[#fbf9f5] border border-[#524132] font-semibold text-left flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-400">pets</span>
                <span>Pet Parent (Rohan)</span>
              </span>
              {role === 'PET_PARENT' && <span className="text-[10px] text-emerald-400 font-bold">Active</span>}
            </button>

            <button
              onClick={async () => {
                await loginDemo('PROVIDER');
                onNavigate('/provider/dashboard');
              }}
              className="w-full py-1.5 px-2.5 rounded-xl bg-[#2e251e] hover:bg-[#3d3228] text-[#fbf9f5] border border-[#524132] font-semibold text-left flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-orange-400">medical_services</span>
                <span>Care Provider (Dr. Aarav)</span>
              </span>
              {role === 'PROVIDER' && <span className="text-[10px] text-orange-400 font-bold">Active</span>}
            </button>

            <button
              onClick={async () => {
                await loginDemo('ADMIN');
                onNavigate('/admin/dashboard');
              }}
              className="w-full py-1.5 px-2.5 rounded-xl bg-[#2e251e] hover:bg-[#3d3228] text-[#fbf9f5] border border-[#524132] font-semibold text-left flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-amber-400">admin_panel_settings</span>
                <span>Super Admin (Priya)</span>
              </span>
              {role === 'ADMIN' && <span className="text-[10px] text-amber-400 font-bold">Active</span>}
            </button>
          </div>

          <div className="pt-2 border-t border-[#3e3227] flex items-center justify-between">
            <button
              onClick={() => onNavigate('/')}
              className="text-[11px] text-[#ffb86c] hover:underline cursor-pointer"
            >
              Public Landing
            </button>
            {isAuthenticated && (
              <button
                onClick={() => logout('/')}
                className="text-[11px] font-bold text-[#ffdad6] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">logout</span>
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3.5 py-2 rounded-full bg-[#1b150e]/90 hover:bg-[#1b150e] text-white shadow-xl border border-[#ff9f1c]/40 backdrop-blur-md font-bold flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs">
          Role: <strong className="text-[#ffb86c]">{role || 'Public'}</strong>
        </span>
        <span className="material-symbols-outlined text-sm">
          {isExpanded ? 'expand_more' : 'tune'}
        </span>
      </button>
    </div>
  );
};
