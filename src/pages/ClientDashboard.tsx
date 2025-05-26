import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Calendar, 
  CreditCard, 
  Activity, 
  Star, 
  History, 
  LogOut 
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ClientDashboard: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('preventive');
  const navigate = useNavigate();

  const handleSearchNavigation = () => {
    navigate('/client/search');
  };

  const menuItems = [
    { title: "Accueil", icon: Home, active: true, onClick: () => {} },
    { title: "Recherche", icon: Search, active: false, onClick: handleSearchNavigation },
    { title: "Réservation", icon: Calendar, active: false, onClick: () => {} },
    { title: "Paiement", icon: CreditCard, active: false, onClick: () => {} },
    { title: "Suivi", icon: Activity, active: false, onClick: () => {} },
    { title: "Évaluation", icon: Star, active: false, onClick: () => {} },
    { title: "Historique", icon: History, active: false, onClick: () => {} },
  ];

  const serviceTypes = [
    {
      id: 'preventive',
      title: 'Préventive',
      description: 'Planifiez vos interventions pour éviter les pannes',
      icon: '✅',
      selected: selectedService === 'preventive'
    },
    {
      id: 'corrective',
      title: 'Corrective',
      description: 'Intervention rapide en cas de panne',
      icon: '🔧',
      selected: selectedService === 'corrective'
    },
    {
      id: 'regulatory',
      title: 'Réglementaire',
      description: 'Conformité aux normes en vigueur',
      icon: '📋',
      selected: selectedService === 'regulatory'
    }
  ];

  const getServiceLabel = () => {
    const service = serviceTypes.find(s => s.id === selectedService);
    return service ? `Maintenance ${service.title}` : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <SidebarProvider>
        {/* Sidebar */}
        <Sidebar className="w-64 bg-slate-800 text-white">
          <SidebarHeader className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#d9534f] rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="font-bold text-lg">ROFEX</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="flex-1">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        isActive={item.active}
                        className={`w-full justify-start px-4 py-3 text-left hover:bg-slate-700 cursor-pointer ${
                          item.active ? 'bg-slate-700 text-white' : 'text-slate-300'
                        }`}
                        onClick={item.onClick}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-700">
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                className="w-full justify-start px-4 py-3 text-red-400 hover:bg-red-900/20 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header with gradient */}
          <div className="rofex-gradient p-6 text-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Bonjour, Jean</h1>
                  <p className="text-white/90">Gérez vos interventions techniques en toute simplicité</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="bg-white text-[#d9534f] hover:bg-gray-100 font-medium"
                    onClick={handleSearchNavigation}
                  >
                    Nouvelle recherche
                  </Button>
                  <Button className="bg-white/20 text-white border border-white/30 hover:bg-white/30 font-medium">
                    Mes rendez-vous
                  </Button>
                  <Button className="bg-white/20 text-white border border-white/30 hover:bg-white/30 font-medium">
                    Suivi en direct
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto p-6">
            {/* Service Finder Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Search className="h-6 w-6 text-[#d9534f]" />
                <h2 className="text-2xl font-bold text-gray-800">Trouver un technicien</h2>
              </div>

              {/* Service Type Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {serviceTypes.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`card-rofex cursor-pointer transition-all duration-300 ${
                      service.selected 
                        ? 'ring-2 ring-green-500 bg-green-50 scale-105' 
                        : 'hover:scale-102'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{service.icon}</div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        Maintenance {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Service Display */}
              {selectedService && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Sélection actuelle :</span>
                  <Badge 
                    className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium"
                  >
                    {getServiceLabel()}
                    <button 
                      onClick={() => setSelectedService('')}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </Badge>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card-rofex text-center">
                <div className="text-2xl font-bold text-[#d9534f] mb-1">24</div>
                <div className="text-gray-600 text-sm">Interventions ce mois</div>
              </div>
              <div className="card-rofex text-center">
                <div className="text-2xl font-bold text-[#5bc0de] mb-1">2.3h</div>
                <div className="text-gray-600 text-sm">Temps moyen</div>
              </div>
              <div className="card-rofex text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
                <div className="text-gray-600 text-sm">Satisfaction</div>
              </div>
              <div className="card-rofex text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                <div className="text-gray-600 text-sm">En cours</div>
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default ClientDashboard;
