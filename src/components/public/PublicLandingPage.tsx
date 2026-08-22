import React from 'react';
import { PetSpecies, ServiceCategory } from '../../types';

interface PublicLandingPageProps {
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onNavigate: (path: string) => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onOpenSignIn,
  onOpenSignUp,
  onNavigate
}) => {
  const serviceCategories = [
    {
      id: 'vet_consult',
      title: 'Veterinary Care',
      desc: 'Expert in-clinic checkups, vaccinations, surgeries & 24/7 video consults.',
      icon: 'medical_services',
      image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=400',
      badge: 'Certified Vets'
    },
    {
      id: 'grooming',
      title: 'Spa & Grooming',
      desc: 'Medicated baths, breed-specific styling, de-shedding & nail trimming.',
      icon: 'content_cut',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      badge: 'Top Rated'
    },
    {
      id: 'walking',
      title: 'Dog Walking',
      desc: 'GPS-tracked neighborhood strolls with photo updates & hydration breaks.',
      icon: 'directions_walk',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400',
      badge: 'Live GPS'
    },
    {
      id: 'sitting',
      title: 'Pet Sitting & Boarding',
      desc: 'Loving cage-free home stays, feeding routines & regular check-in photos.',
      icon: 'home',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=400',
      badge: 'Verified Hosts'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-jakarta selection:bg-[#ffdcbc] selection:text-[#683c00]">
      {/* Public Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#efeeea]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 cursor-pointer text-left group"
          >
            <div className="w-9 h-9 rounded-full bg-[#895100] text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px] filled-icon">pets</span>
            </div>
            <span className="font-quicksand font-bold text-2xl tracking-tight text-[#895100]">
              Zooby
            </span>
          </button>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#544434]">
            <a href="#services" className="hover:text-[#895100] transition-colors">
              Services
            </a>
            <a href="#health-records" className="hover:text-[#895100] transition-colors">
              Health Vault
            </a>
            <a href="#testimonials" className="hover:text-[#895100] transition-colors">
              Community
            </a>
            <button
              onClick={() => onNavigate('/provider/register')}
              className="text-[#683c00] hover:text-[#895100] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-base">medical_services</span>
              <span>For Care Providers</span>
            </button>
          </nav>

          {/* Right Action Buttons: Sign In & Get Started / Sign Up */}
          <div className="flex items-center gap-3">
            <button
              id="public-signin-btn"
              onClick={onOpenSignIn}
              className="px-4 py-2 rounded-full text-sm font-bold text-[#895100] hover:bg-[#efeeea] transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              id="public-signup-btn"
              onClick={onOpenSignUp}
              className="px-4 py-2 rounded-full bg-[#895100] text-white text-sm font-bold hover:bg-[#683c00] transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#ffdcbc]/60 border border-[#ff9f1c]/30 text-[#895100] text-xs font-bold shadow-2xs">
                <span>Technology-Led Pet Care Ecosystem</span>
              </div>

              <h1 className="font-quicksand font-black text-4xl sm:text-5xl md:text-6xl text-[#1b1c1a] tracking-tight leading-[1.12]">
                Everything your pet needs, in{' '}
                <span className="text-[#895100] underline decoration-[#ff9f1c]/40 decoration-wavy">
                  one trusted app.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#544434] leading-relaxed max-w-xl font-normal">
                Join thousands of pet parents managing digital health records, booking verified vets, groomers, dog walkers, and tracking live care routines effortlessly.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={onOpenSignUp}
                  className="px-7 py-3.5 rounded-2xl bg-[#895100] text-white font-bold text-base hover:bg-[#683c00] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">pets</span>
                  <span>Get Started for Free</span>
                </button>
                <button
                  onClick={onOpenSignIn}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-[#dac2ae] text-[#544434] font-bold text-base hover:bg-[#f5f3ef] transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">login</span>
                  <span>Sign In to Dashboard</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#efeeea] flex flex-wrap items-center gap-6 text-xs text-[#877462]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="User"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="User"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                      alt="User"
                    />
                  </div>
                  <span className="font-semibold text-[#1b1c1a]">12,000+ Happy Pets</span>
                </div>
                <div className="flex items-center gap-1 text-[#895100] font-bold">
                  <span className="material-symbols-outlined text-sm text-amber-500 filled-icon">star</span>
                  <span>4.9 / 5 on App Store</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-[#294e35]">
                  <span className="material-symbols-outlined text-sm filled-icon">verified_user</span>
                  <span>100% Verified Care Providers</span>
                </div>
              </div>
            </div>

            {/* Right Visual Dashboard Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 border border-[#dac2ae]/60 shadow-xl space-y-4">
                {/* Pet Hero Preview Card */}
                <div className="bg-gradient-to-br from-[#ffeed9] to-[#ffdcbc]/40 rounded-2xl p-4 flex items-center gap-3.5 border border-[#ff9f1c]/20">
                  <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=240"
                    alt="Bruno"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-quicksand font-bold text-lg text-[#1b1c1a]">Bruno</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#c2edca] text-[#294e35]">
                        Healthy
                      </span>
                    </div>
                    <p className="text-xs text-[#877462]">Golden Retriever • 3 yrs</p>
                    <p className="text-xs font-semibold text-[#895100] mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">vaccines</span>
                      Vaccinations Up-to-date
                    </p>
                  </div>
                </div>

                {/* Upcoming Schedule Mini preview */}
                <div className="bg-[#f9f7f4] rounded-2xl p-3.5 border border-[#ebdcc4] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#895100]">
                    <span>Today's Care Schedule</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#dac2ae]/40">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#e5e0d8]">
                    <div className="w-8 h-8 rounded-lg bg-[#dce1ff] text-[#314685] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-base">medical_services</span>
                    </div>
                    <div className="text-left flex-grow">
                      <p className="text-xs font-bold text-[#1b1c1a]">Routine Wellness Checkup</p>
                      <p className="text-[11px] text-[#877462]">Dr. Aarav Mehta • 4:30 PM Today</p>
                    </div>
                  </div>
                </div>

                {/* Live GPS Tracker Tag */}
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 px-3.5 py-2 rounded-xl text-xs font-semibold border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live Location: At Home (Bandra West)</span>
                  </span>
                  <span className="font-mono text-[11px]">98% Battery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-16 bg-[#f3eee8] border-y border-[#dac2ae]/40">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#895100] bg-[#ffdcbc]/50 px-3 py-1 rounded-full">
              Full Spectrum Services
            </span>
            <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-[#1b1c1a]">
              Compassionate Pet Care at Your Fingertips
            </h2>
            <p className="text-sm text-[#544434]">
              Book verified, background-checked professionals for all your furry family member's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#dac2ae]/60 shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/90 text-[#895100] shadow-xs backdrop-blur-xs">
                    {service.badge}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="material-symbols-outlined text-[#895100] text-xl">
                        {service.icon}
                      </span>
                      <h3 className="font-quicksand font-bold text-lg text-[#1b1c1a]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#877462] leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <button
                    onClick={onOpenSignIn}
                    className="w-full py-2 px-3 rounded-xl bg-[#ffeed9] text-[#895100] font-bold text-xs hover:bg-[#ffdcbc] transition-colors cursor-pointer text-center"
                  >
                    Explore &amp; Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community / Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-quicksand font-bold text-3xl text-[#1b1c1a]">
              Loved by Pets &amp; Their Parents
            </h2>
            <p className="text-xs text-[#877462] mt-1">
              Real reviews from real pet parents who trust Zooby every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#dac2ae]/50 shadow-xs space-y-4">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-[#2d2319] leading-relaxed font-medium">
                "Having all of Luna’s vaccination records, past vet prescriptions, and grooming bookings in one place has saved us so much stress!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#efeeea]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80"
                  className="w-9 h-9 rounded-full object-cover"
                  alt="Aditi Sharma"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1b1c1a]">Aditi Sharma</h4>
                  <p className="text-[11px] text-[#877462]">Parent to Luna (Persian Cat)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#dac2ae]/50 shadow-xs space-y-4">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-[#2d2319] leading-relaxed font-medium">
                "The dog walking GPS live tracker gives me total peace of mind while I’m at work. Plus, booking appointments takes literally 10 seconds."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#efeeea]">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=80"
                  className="w-9 h-9 rounded-full object-cover"
                  alt="Vikram Malhotra"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1b1c1a]">Vikram Malhotra</h4>
                  <p className="text-[11px] text-[#877462]">Parent to Max (Beagle)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#dac2ae]/50 shadow-xs space-y-4">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-sm text-[#2d2319] leading-relaxed font-medium">
                "As a veterinarian, Zooby has streamlined our patient records and reduced missed appointments by 80%. Highly recommended!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#efeeea]">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=80"
                  className="w-9 h-9 rounded-full object-cover"
                  alt="Dr. Aarav Mehta"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1b1c1a]">Dr. Aarav Mehta</h4>
                  <p className="text-[11px] text-[#877462]">Lead Vet, Paws &amp; Claws</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Call to Action Banner */}
      <section className="py-12 bg-[#2d241b] text-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#ff9f1c] uppercase tracking-wider">
              Grow with Zooby
            </span>
            <h3 className="font-quicksand font-bold text-2xl">
              Are you a Vet, Groomer, Walker, or Sitter?
            </h3>
            <p className="text-xs text-[#d6c7b7]">
              Join our network of verified pet care partners and reach thousands of pet parents.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/provider/register')}
            className="px-6 py-3 rounded-2xl bg-[#ff9f1c] text-[#1b150e] font-bold text-sm hover:bg-[#ffb049] transition-colors cursor-pointer shadow-md shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">medical_services</span>
            <span>Join as Care Partner</span>
          </button>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="py-10 bg-[#efeeea] border-t border-[#dac2ae]/40 text-[#544434]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#895100] filled-icon">pets</span>
            <span className="font-quicksand font-bold text-base text-[#895100]">Zooby</span>
            <span className="text-[#877462] ml-2">© 2026 Zooby Technologies, Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={onOpenSignIn} className="hover:underline hover:text-[#895100] cursor-pointer">
              Sign In
            </button>
            <button onClick={() => onNavigate('/provider/register')} className="hover:underline hover:text-[#895100] cursor-pointer">
              Become a Provider
            </button>
            <button onClick={onOpenSignUp} className="hover:underline hover:text-[#895100] cursor-pointer">
              Create Account
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
