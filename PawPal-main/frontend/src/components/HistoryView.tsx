import React, { useState } from 'react';
import { Booking } from '../types';

interface HistoryViewProps {
  bookings: Booking[];
  onBookNewService: () => void;
}

const DEFAULT_PET_AVATAR = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=120';

export const HistoryView: React.FC<HistoryViewProps> = ({
  bookings,
  onBookNewService
}) => {
  const [filter, setFilter] = useState<'all' | 'Confirmed' | 'Completed'>('all');

  const filteredBookings = bookings.filter(
    (b) => filter === 'all' || b.status === filter
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-quicksand font-bold text-3xl md:text-4xl text-[#895100]">
            Bookings &amp; Service History
          </h1>
          <p className="text-sm md:text-base text-[#544434] mt-1">
            Track appointments, download receipts, and manage verified care services.
          </p>
        </div>

        <button
          onClick={onBookNewService}
          className="bg-[#ff9f1c] hover:bg-[#ff8f00] text-[#683c00] px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Book New Service</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-2xl border border-[#e5e0d8] shadow-xs w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filter === 'all' ? 'bg-[#895100] text-white shadow-xs' : 'text-[#544434] hover:bg-[#efeeea]'
          }`}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('Confirmed')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filter === 'Confirmed' ? 'bg-[#41674b] text-white shadow-xs' : 'text-[#544434] hover:bg-[#efeeea]'
          }`}
        >
          Upcoming / Confirmed
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filter === 'Completed' ? 'bg-[#475b9c] text-white shadow-xs' : 'text-[#544434] hover:bg-[#efeeea]'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e5e0d8] text-[#877462] space-y-3">
            <span className="material-symbols-outlined text-5xl text-[#dac2ae]">event_busy</span>
            <p className="text-sm font-medium">No bookings found in this category.</p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl p-6 border border-[#e5e0d8] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
            >
              {/* Pet & Service Details */}
              <div className="flex items-start gap-4">
                <img
                  src={b.petPhoto || DEFAULT_PET_AVATAR}
                  alt={b.petName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#ff9f1c] shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        b.status === 'Confirmed'
                          ? 'bg-[#c2edca] text-[#294e35]'
                          : 'bg-[#dce1ff] text-[#314685]'
                      }`}
                    >
                      {b.status}
                    </span>
                    <span className="text-xs text-[#877462]">Ref: {b.bookingRef}</span>
                  </div>

                  <h3 className="font-quicksand font-bold text-lg text-[#1b1c1a]">
                    {b.serviceTitle} for {b.petName}
                  </h3>
                  <p className="text-xs text-[#544434] mt-0.5">
                    {b.providerName} • {b.location}
                  </p>
                  {b.notes && (
                    <p className="text-xs text-[#877462] italic mt-1">
                      Note: "{b.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Schedule & Price */}
              <div className="flex flex-col md:items-end gap-1 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-[#efeeea]">
                <div className="text-sm font-bold text-[#1b1c1a] flex items-center md:justify-end gap-1.5">
                  <span className="material-symbols-outlined text-[#475b9c] text-sm">schedule</span>
                  <span>{b.date}</span>
                </div>
                <span className="font-quicksand font-bold text-lg text-[#895100]">
                  ₹{b.price}
                </span>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => alert(`Receipt downloaded for ${b.bookingRef} (Amount: ₹${b.price})`)}
                    className="text-xs font-bold text-[#475b9c] hover:underline px-3 py-1 bg-[#efeeea] rounded-full cursor-pointer"
                  >
                    View Receipt
                  </button>
                  {b.status === 'Completed' && (
                    <button
                      onClick={() => alert(`Thank you for rating ${b.providerName} 5 Stars!`)}
                      className="text-xs font-bold text-[#895100] hover:underline px-3 py-1 bg-[#ffdcbc]/40 rounded-full cursor-pointer"
                    >
                      Rate &amp; Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
