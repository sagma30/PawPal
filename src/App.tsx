import React, { useState, useEffect, useCallback } from 'react';
import {
  Pet,
  HealthEvent,
  ServiceProvider,
  Booking,
  AgendaItem,
  NotificationUpdate,
  ServiceCategory
} from './types';
import {
  SERVICE_PROVIDERS,
  INITIAL_PETS,
  INITIAL_AGENDA,
  INITIAL_UPDATES,
  INITIAL_BOOKINGS
} from './data/mockData';
import { apiClient } from './services/apiClient';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { PetProfileView } from './components/PetProfileView';
import { ServicesDiscoveryView } from './components/ServicesDiscoveryView';
import { HistoryView } from './components/HistoryView';
import { PublicLandingPage } from './components/public/PublicLandingPage';
import { UnifiedSignInView } from './components/auth/UnifiedSignInView';
import { CustomerSignUpView } from './components/auth/CustomerSignUpView';
import { ProviderRegisterView } from './components/auth/ProviderRegisterView';
import { AdminPortal } from './components/admin/AdminPortal';
import { ProviderPortal } from './components/provider/ProviderPortal';
import { AccessDeniedView } from './components/common/AccessDeniedView';
import { DemoRoleSwitcher } from './components/common/DemoRoleSwitcher';
import { UserSettingsView } from './components/UserSettingsView';
import { AddHealthEventModal } from './components/AddHealthEventModal';
import { BookingModal } from './components/BookingModal';
import { InboxModal } from './components/InboxModal';
import { AddPetModal } from './components/AddPetModal';
import { MobileNavBar } from './components/MobileNavBar';

function ZoobyAppInner() {
  const { user, role, isAuthenticated, logout } = useAuth();

  // Navigation / Path state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return p && p.length > 0 ? p : '/';
  });

  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    try {
      window.history.pushState({}, '', path);
    } catch {
      // safe fallback in sandboxes
    }
  }, []);

  // Listen to popstate (browser back / forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Customer application state initialized with demo data fallback
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(INITIAL_PETS[0] || null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<ServiceCategory | 'all'>('all');

  const [agenda, setAgenda] = useState<AgendaItem[]>(INITIAL_AGENDA);
  const [updates, setUpdates] = useState<NotificationUpdate[]>(INITIAL_UPDATES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Load backend data when authenticated as PET_PARENT
  useEffect(() => {
    if (!isAuthenticated || role !== 'PET_PARENT') return;

    const loadData = async () => {
      try {
        // Load pets with health events
        const backendPets: any[] = await apiClient.getPets();
        if (Array.isArray(backendPets) && backendPets.length > 0) {
          const petsWithEvents: Pet[] = await Promise.all(
            backendPets.map(async (p: any) => {
              let healthEvents: HealthEvent[] = [];
              try {
                healthEvents = await apiClient.getHealthEvents(p.id);
              } catch {
                healthEvents = [];
              }
              return mapApiPet(p, healthEvents);
            })
          );
          setPets(petsWithEvents);
          if (petsWithEvents.length > 0) {
            setSelectedPet((prev) => prev ? (petsWithEvents.find(p => p.id === prev.id) || petsWithEvents[0]) : petsWithEvents[0]);
          }
        }
      } catch {
        // Backend unavailable — keep demo pets
        setPets((prev) => (prev && prev.length > 0 ? prev : INITIAL_PETS));
        setSelectedPet((prev) => prev || INITIAL_PETS[0] || null);
      }

      try {
        const backendBookings: any[] = await apiClient.getBookings();
        if (Array.isArray(backendBookings) && backendBookings.length > 0) {
          setBookings(backendBookings.map(mapApiBooking));
        }
      } catch {
        setBookings((prev) => (prev && prev.length > 0 ? prev : INITIAL_BOOKINGS));
      }

      try {
        const backendNotifs: any[] = await apiClient.getNotifications();
        if (Array.isArray(backendNotifs) && backendNotifs.length > 0) {
          setUpdates(backendNotifs.map(mapApiNotification));
        }
      } catch {
        setUpdates((prev) => (prev && prev.length > 0 ? prev : INITIAL_UPDATES));
      }

      try {
        const backendAgenda: any[] = await apiClient.getAgenda();
        if (Array.isArray(backendAgenda) && backendAgenda.length > 0) {
          setAgenda(backendAgenda.map(mapApiAgenda));
        }
      } catch {
        setAgenda((prev) => (prev && prev.length > 0 ? prev : INITIAL_AGENDA));
      }
    };

    loadData();
  }, [isAuthenticated, role]);

  // Keep selectedPet in sync when pets array updates
  useEffect(() => {
    if (selectedPet) {
      const updated = pets.find((p) => p.id === selectedPet.id);
      if (updated) setSelectedPet(updated);
      else if (pets.length > 0) setSelectedPet(pets[0]);
    } else if (pets.length > 0) {
      setSelectedPet(pets[0]);
    }
  }, [pets]);

  // ── API response mappers ───────────────────────────────────────────────────
  const mapApiPet = (p: any, healthEvents: HealthEvent[] = []): Pet => ({
    id: p.id,
    name: p.name,
    species: p.species,
    breed: p.breed,
    age: p.age,
    weight: p.weight,
    location: p.location || 'Mumbai',
    description: p.description || '',
    photoUrl: p.photoUrl,
    bloodGroup: p.bloodGroup || 'None Recorded',
    allergies: p.allergies || 'None Known',
    currentMedications: p.currentMedications || 'None',
    servicePreferences: p.servicePreferences || [],
    liveLocation: p.liveLocation || { city: 'Mumbai', state: 'MH', status: 'At Home', battery: 90, lastUpdated: 'Just now', mapImage: '' },
    vaccinationStatus: p.vaccinationStatus || 'Up-to-date',
    healthStatusText: p.healthStatusText || 'Healthy',
    isAttentionNeeded: p.isAttentionNeeded || false,
    healthEvents,
  });

  const mapApiBooking = (b: any): Booking => ({
    id: b.id,
    petId: b.petId,
    petName: b.petName,
    petPhoto: b.petPhoto,
    serviceCategory: b.serviceCategory,
    serviceTitle: b.serviceTitle,
    providerId: b.providerId,
    providerName: b.providerName,
    date: b.date,
    timeSlot: b.timeSlot,
    location: b.location,
    price: b.price,
    status: b.status,
    createdAt: b.createdAt,
    notes: b.notes,
    bookingRef: b.bookingRef,
  });

  const mapApiNotification = (n: any): NotificationUpdate => ({
    id: n.id,
    text: n.text,
    time: n.time,
    type: n.type,
    read: n.read,
  });

  const mapApiAgenda = (a: any): AgendaItem => ({
    id: a.id,
    category: a.category,
    title: a.title,
    timeText: a.timeText,
    locationOrDoctor: a.locationOrDoctor,
    dueBadge: a.dueBadge,
    petName: a.petName,
    actionText: a.actionText,
    actionType: a.actionType,
  });

  // Modal States
  const [isAddHealthEventOpen, setIsAddHealthEventOpen] = useState(false);
  const [healthEventPet, setHealthEventPet] = useState<Pet | null>(selectedPet);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingProvider, setBookingProvider] = useState<ServiceProvider | null>(null);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [editPetTarget, setEditPetTarget] = useState<Pet | null>(null);

  const unreadCount = updates.filter((u) => !u.read).length;

  // Handlers for Pet Parent
  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setActiveTab('mypets');
    navigate('/mypets');
  };

  const handleOpenAddHealthEvent = (pet: Pet) => {
    setHealthEventPet(pet);
    setIsAddHealthEventOpen(true);
  };

  const handleSaveHealthEvent = async (petId: string, newEvent: HealthEvent) => {
    try {
      // Post to backend — backend auto-creates notification & agenda
      await apiClient.createHealthEvent({
        petId,
        eventType: newEvent.eventType,
        eventTitle: newEvent.eventTitle,
        date: newEvent.date,
        administeredBy: newEvent.administeredBy,
        notes: newEvent.notes,
        reminderEnabled: newEvent.reminderEnabled,
        reminderDate: newEvent.reminderDate,
        isUpcoming: newEvent.isUpcoming,
      });
    } catch {
      // Backend unavailable — apply locally so UI doesn't break
    }

    // Optimistic local state update
    setPets((prevPets) =>
      prevPets.map((p) => {
        if (p.id === petId) {
          return {
            ...p,
            healthEvents: [newEvent, ...p.healthEvents],
            isAttentionNeeded: newEvent.isUpcoming ? true : p.isAttentionNeeded,
            vaccinationStatus:
              newEvent.eventType === 'vaccination' ? 'Vaccinations Up-to-date' : p.vaccinationStatus
          };
        }
        return p;
      })
    );

    if (newEvent.isUpcoming) {
      const targetPet = pets.find((p) => p.id === petId);
      setAgenda((prev) => [{
        id: 'agenda-' + Date.now(),
        category: 'Health' as const,
        title: `${targetPet?.name || 'Pet'}'s ${newEvent.eventTitle}`,
        timeText: newEvent.date,
        locationOrDoctor: newEvent.administeredBy,
        dueBadge: 'Scheduled',
        petName: targetPet?.name || '',
        actionText: 'Book Vet Now',
        actionType: 'book_vet' as const
      }, ...prev]);
    }

    setUpdates((prev) => [{
      id: 'up-' + Date.now(),
      text: `Health event recorded: "${newEvent.eventTitle}" for ${pets.find((p) => p.id === petId)?.name || 'pet'}.`,
      time: 'Just now',
      type: 'health' as const,
      read: false
    }, ...prev]);
  };

  const handleSelectCategory = (category: ServiceCategory | 'all') => {
    setSelectedServiceCategory(category);
    setActiveTab('services');
    navigate('/services');
  };

  const handleOpenBookProvider = (provider: ServiceProvider) => {
    setBookingProvider(provider);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookServiceGeneric = (category?: ServiceCategory, pet?: Pet) => {
    if (pet) {
      setSelectedPet(pet);
    }
    if (category) {
      setSelectedServiceCategory(category);
      const prov = SERVICE_PROVIDERS.find((p) => p.category === category) || SERVICE_PROVIDERS[0];
      setBookingProvider(prov);
      setIsBookingModalOpen(true);
    } else {
      setActiveTab('services');
      navigate('/services');
    }
  };

  const handleConfirmBooking = async (newBooking: Booking) => {
    try {
      // Post to backend — backend auto-creates agenda & notification
      await apiClient.createBooking({
        petId: newBooking.petId,
        providerId: newBooking.providerId,
        serviceCategory: newBooking.serviceCategory,
        serviceTitle: newBooking.serviceTitle,
        date: newBooking.date,
        timeSlot: newBooking.timeSlot,
        location: newBooking.location,
        price: newBooking.price,
        notes: newBooking.notes,
      });
    } catch {
      // Backend unavailable — apply locally
    }

    // Optimistic local update
    setBookings((prev) => [newBooking, ...prev]);
    setAgenda((prev) => [{
      id: 'agenda-' + Date.now(),
      category: (newBooking.serviceCategory === 'grooming' ? 'Grooming' : 'Health') as AgendaItem['category'],
      title: `${newBooking.petName}'s ${newBooking.serviceCategory.replace('_', ' ')}`,
      timeText: newBooking.date,
      locationOrDoctor: newBooking.providerName,
      dueBadge: 'Confirmed',
      petName: newBooking.petName,
      actionText: 'View Details',
      actionType: 'view_booking' as const
    }, ...prev]);
    setUpdates((prev) => [{
      id: 'up-' + Date.now(),
      text: `Booking confirmed: ${newBooking.serviceTitle} with ${newBooking.providerName} for ${newBooking.petName}.`,
      time: 'Just now',
      type: 'booking' as const,
      read: false
    }, ...prev]);
  };

  const handleSavePet = async (newPet: Pet) => {
    try {
      if (editPetTarget) {
        await apiClient.updatePet(newPet.id, {
          name: newPet.name, species: newPet.species, breed: newPet.breed,
          age: newPet.age, weight: newPet.weight, photoUrl: newPet.photoUrl,
          bloodGroup: newPet.bloodGroup, allergies: newPet.allergies,
          currentMedications: newPet.currentMedications,
          servicePreferences: newPet.servicePreferences,
        });
      } else {
        await apiClient.createPet({
          name: newPet.name, species: newPet.species, breed: newPet.breed,
          age: newPet.age, weight: newPet.weight, photoUrl: newPet.photoUrl,
          bloodGroup: newPet.bloodGroup, allergies: newPet.allergies,
          currentMedications: newPet.currentMedications,
          servicePreferences: newPet.servicePreferences,
        });
      }
    } catch {
      // Backend unavailable — apply locally
    }

    if (editPetTarget) {
      setPets((prev) => prev.map((p) => (p.id === newPet.id ? newPet : p)));
      if (selectedPet?.id === newPet.id) setSelectedPet(newPet);
    } else {
      setPets((prev) => [...prev, newPet]);
      setSelectedPet(newPet);
    }
    setEditPetTarget(null);
  };

  const handleOpenEditPet = (pet: Pet) => {
    setEditPetTarget(pet);
    setIsAddPetModalOpen(true);
  };

  const handleMarkAllRead = async () => {
    try {
      await apiClient.markAllNotificationsRead();
    } catch {
      // Apply locally
    }
    setUpdates((prev) => prev.map((u) => ({ ...u, read: true })));
  };

  // -------------------------------------------------------------
  // ROUTE DISPATCH & GUARDS
  // -------------------------------------------------------------

  // 1. UNIFIED SIGN IN ROUTE
  // All auth entry paths (/login, /signin, /provider/login, /admin/login) use ONE unified sign-in page
  if (
    currentPath === '/login' ||
    currentPath === '/signin' ||
    currentPath === '/provider/login' ||
    currentPath === '/admin/login'
  ) {
    return (
      <div className="relative">
        <UnifiedSignInView onNavigate={navigate} />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // 2. PET PARENT SIGN UP / REGISTRATION
  if (currentPath === '/signup' || currentPath === '/register') {
    return (
      <div className="relative">
        <CustomerSignUpView onNavigate={navigate} />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // 3. PROVIDER REGISTRATION ("Become a Provider" flow)
  if (
    currentPath === '/provider/register' ||
    currentPath === '/provider/signup' ||
    currentPath === '/join-provider'
  ) {
    return (
      <div className="relative">
        <ProviderRegisterView onNavigate={navigate} />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // 4. ADMIN ROUTE GUARD (/admin/*)
  if (currentPath.startsWith('/admin')) {
    if (!isAuthenticated) {
      return (
        <div className="relative">
          <AccessDeniedView
            requiredRole="ADMIN"
            attemptedPath={currentPath}
            onNavigate={navigate}
          />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }

    if (role !== 'ADMIN') {
      return (
        <div className="relative">
          <AccessDeniedView
            requiredRole="ADMIN"
            attemptedPath={currentPath}
            onNavigate={navigate}
          />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }

    // Role is verified ADMIN -> Render AdminPortal
    const subTab = currentPath.replace('/admin/', '').replace('/admin', '') || 'dashboard';
    return (
      <div className="relative">
        <AdminPortal
          initialTab={subTab}
          onNavigate={navigate}
          onExitAdmin={() => navigate('/')}
          onSignOut={() => logout('/login')}
        />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // 5. PROVIDER ROUTE GUARD (/provider/*)
  if (currentPath.startsWith('/provider')) {
    if (!isAuthenticated) {
      return (
        <div className="relative">
          <AccessDeniedView
            requiredRole="PROVIDER"
            attemptedPath={currentPath}
            onNavigate={navigate}
          />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }

    if (role !== 'PROVIDER') {
      return (
        <div className="relative">
          <AccessDeniedView
            requiredRole="PROVIDER"
            attemptedPath={currentPath}
            onNavigate={navigate}
          />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }

    // Role is verified PROVIDER -> Render ProviderPortal
    const providerTab = currentPath.replace('/provider/', '').replace('/provider', '') || 'dashboard';
    return (
      <div className="relative">
        <ProviderPortal currentTab={providerTab} onNavigate={navigate} />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // 6. ROOT PATH (/) & PUBLIC LANDING
  if (currentPath === '/') {
    // If not authenticated, show public landing page with Sign In & Get Started buttons
    if (!isAuthenticated) {
      return (
        <div className="relative">
          <PublicLandingPage
            onOpenSignIn={() => navigate('/login')}
            onOpenSignUp={() => navigate('/signup')}
            onNavigate={navigate}
          />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }

    // If authenticated as PROVIDER, direct to provider dashboard
    if (role === 'PROVIDER') {
      return (
        <div className="relative">
          <ProviderPortal currentTab="dashboard" onNavigate={navigate} />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }

    // If authenticated as ADMIN, direct to admin dashboard
    if (role === 'ADMIN') {
      return (
        <div className="relative">
          <AdminPortal
            initialTab="dashboard"
            onNavigate={navigate}
            onExitAdmin={() => navigate('/')}
            onSignOut={() => logout('/login')}
          />
          <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }
  }

  // 7. PET PARENT / CUSTOMER PAGES
  // If unauthenticated and trying to access a customer route like /dashboard, redirect to /login
  if (!isAuthenticated) {
    return (
      <div className="relative">
        <PublicLandingPage
          onOpenSignIn={() => navigate('/login')}
          onOpenSignUp={() => navigate('/signup')}
          onNavigate={navigate}
        />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // If authenticated as PROVIDER, direct to provider portal
  if (role === 'PROVIDER') {
    return (
      <div className="relative">
        <ProviderPortal currentTab="dashboard" onNavigate={navigate} />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // If authenticated as ADMIN, direct to admin portal
  if (role === 'ADMIN') {
    return (
      <div className="relative">
        <AdminPortal
          initialTab="dashboard"
          onNavigate={navigate}
          onExitAdmin={() => navigate('/')}
          onSignOut={() => logout('/login')}
        />
        <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
      </div>
    );
  }

  // PET PARENT ROLE -> Render Pet Parent customer views
  const resolvedTab =
    currentPath === '/mypets'
      ? 'mypets'
      : currentPath === '/services'
      ? 'services'
      : currentPath === '/history' || currentPath === '/bookings'
      ? 'history'
      : currentPath === '/inbox' || currentPath === '/messages'
      ? 'inbox'
      : currentPath === '/settings' || currentPath === '/profile'
      ? 'settings'
      : activeTab;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-jakarta pb-16 md:pb-0 selection:bg-[#ffdcbc] selection:text-[#683c00]">
      {/* Top Navigation Bar */}
      <Header
        activeTab={resolvedTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`);
        }}
        pets={pets}
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsInboxModalOpen(true)}
        onOpenAddPet={() => {
          setEditPetTarget(null);
          setIsAddPetModalOpen(true);
        }}
        currentUser={user}
        onOpenSignIn={() => navigate('/login')}
        onSignOut={() => logout('/login')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {resolvedTab === 'dashboard' && (
          <DashboardView
            pets={pets}
            onSelectPet={handleSelectPet}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`);
            }}
            onSelectCategory={handleSelectCategory}
            onOpenAddHealthEvent={handleOpenAddHealthEvent}
            onOpenAddPet={() => {
              setEditPetTarget(null);
              setIsAddPetModalOpen(true);
            }}
            agenda={agenda}
            updates={updates}
          />
        )}

        {resolvedTab === 'mypets' && (
          <PetProfileView
            pet={selectedPet || pets[0] || null}
            allPets={pets}
            onSelectPet={setSelectedPet}
            onOpenAddHealthEvent={handleOpenAddHealthEvent}
            onOpenBookService={handleOpenBookServiceGeneric}
            onOpenEditProfile={handleOpenEditPet}
          />
        )}

        {resolvedTab === 'services' && (
          <ServicesDiscoveryView
            providers={SERVICE_PROVIDERS}
            selectedCategory={selectedServiceCategory}
            onSelectCategory={setSelectedServiceCategory}
            onBookProvider={handleOpenBookProvider}
            activePet={selectedPet || pets[0] || null}
          />
        )}

        {resolvedTab === 'history' && (
          <HistoryView
            bookings={bookings}
            onBookNewService={() => {
              setActiveTab('services');
              navigate('/services');
            }}
          />
        )}

        {resolvedTab === 'inbox' && (
          <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 py-8 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="font-quicksand font-bold text-3xl text-[#895100]">
                Activity &amp; Messages
              </h1>
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-bold text-[#895100] hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-3">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`bg-white rounded-2xl p-5 border transition-all flex items-start gap-4 ${
                    update.read ? 'border-[#e5e0d8]' : 'border-[#ff9f1c] bg-[#ffdcbc]/15 shadow-xs'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      update.type === 'booking'
                        ? 'bg-[#dce1ff] text-[#314685]'
                        : update.type === 'reminder'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-[#c2edca] text-[#294e35]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl filled-icon">
                      {update.type === 'booking'
                        ? 'event_available'
                        : update.type === 'reminder'
                        ? 'alarm'
                        : 'pets'}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-[#1b1c1a]">{update.text}</p>
                    <span className="text-xs text-[#877462] mt-1 block">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resolvedTab === 'settings' && (
          <UserSettingsView
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`);
            }}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavBar
        activeTab={resolvedTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          navigate(`/${tab === 'dashboard' ? 'dashboard' : tab}`);
        }}
        unreadCount={unreadCount}
      />

      {/* Add / Edit Health Event Modal */}
      {healthEventPet && (
        <AddHealthEventModal
          isOpen={isAddHealthEventOpen}
          onClose={() => setIsAddHealthEventOpen(false)}
          pet={healthEventPet}
          allPets={pets}
          onSelectPet={(p) => setHealthEventPet(p)}
          onSaveHealthEvent={handleSaveHealthEvent}
        />
      )}

      {/* Book Service Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        provider={bookingProvider}
        pets={pets}
        selectedPet={selectedPet}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Inbox / Notification Modal Drawer */}
      <InboxModal
        isOpen={isInboxModalOpen}
        onClose={() => setIsInboxModalOpen(false)}
        updates={updates}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Add / Edit Pet Modal */}
      <AddPetModal
        isOpen={isAddPetModalOpen}
        onClose={() => {
          setIsAddPetModalOpen(false);
          setEditPetTarget(null);
        }}
        onSavePet={handleSavePet}
        editPet={editPetTarget}
      />

      {/* 1-Click Role & Authentication Demo Switcher */}
      <DemoRoleSwitcher currentPath={currentPath} onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ZoobyAppInner />
    </AuthProvider>
  );
}

