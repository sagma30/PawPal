import React from 'react';

interface MobileNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount: number;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  activeTab,
  setActiveTab,
  unreadCount
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#efeeea] px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-2 rounded-xl transition-colors ${
          activeTab === 'dashboard' ? 'text-[#895100]' : 'text-[#877462]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'dashboard' ? 'filled-icon' : ''
          }`}
        >
          home
        </span>
        <span className="text-[10px] font-bold">Home</span>
      </button>

      <button
        onClick={() => setActiveTab('mypets')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-2 rounded-xl transition-colors ${
          activeTab === 'mypets' ? 'text-[#895100]' : 'text-[#877462]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'mypets' ? 'filled-icon' : ''
          }`}
        >
          pets
        </span>
        <span className="text-[10px] font-bold">My Pets</span>
      </button>

      <button
        onClick={() => setActiveTab('services')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-2 rounded-xl transition-colors ${
          activeTab === 'services' ? 'text-[#895100]' : 'text-[#877462]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'services' ? 'filled-icon' : ''
          }`}
        >
          apps
        </span>
        <span className="text-[10px] font-bold">Services</span>
      </button>

      <button
        onClick={() => setActiveTab('history')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-2 rounded-xl transition-colors ${
          activeTab === 'history' ? 'text-[#895100]' : 'text-[#877462]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'history' ? 'filled-icon' : ''
          }`}
        >
          receipt_long
        </span>
        <span className="text-[10px] font-bold">History</span>
      </button>

      <button
        onClick={() => setActiveTab('inbox')}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-2 rounded-xl transition-colors relative ${
          activeTab === 'inbox' ? 'text-[#895100]' : 'text-[#877462]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            activeTab === 'inbox' ? 'filled-icon' : ''
          }`}
        >
          chat_bubble
        </span>
        <span className="text-[10px] font-bold">Inbox</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#ff9f1c]" />
        )}
      </button>
    </div>
  );
};
