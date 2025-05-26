
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings } from 'lucide-react';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import { useAuthContext } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, profile, signOut, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserInitials = () => {
    if (profile?.prenom && profile?.nom) {
      return `${profile.prenom[0]}${profile.nom[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const getDashboardLink = () => {
    if (profile?.role === 'technicien') {
      return '/technician/dashboard';
    }
    return '/client/dashboard';
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="rofex-gradient rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#d9534f] to-[#5bc0de] bg-clip-text text-transparent">ROFEX</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center space-x-8 text-sm font-medium">
              <Link to="/" className="text-gray-700 hover:text-[#d9534f] transition-colors duration-300">Accueil</Link>
              <Link to="/services" className="text-gray-700 hover:text-[#d9534f] transition-colors duration-300">Services</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#d9534f] transition-colors duration-300">À propos</Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#d9534f] transition-colors duration-300">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {profile && (
                  <span className="text-sm text-gray-600 hidden md:block">
                    Bonjour, {profile.prenom}
                  </span>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#d9534f] text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="border-[#d9534f] text-[#d9534f] hover:bg-[#d9534f] hover:text-white transition-all duration-300"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Connexion
                </Button>
                <Button 
                  className="btn-rofex-primary"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Inscription
                </Button>
              </div>
            )}
            
            <Button variant="outline" size="icon" className="md:hidden border-[#d9534f] text-[#d9534f]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Modales */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </>
  );
};

export default Header;
