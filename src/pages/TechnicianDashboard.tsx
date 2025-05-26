import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, User, Calendar, FileText, Wrench, BarChart3, Euro, LogOut } from "lucide-react";
import { useAuthContext } from '@/contexts/AuthContext';
import { useInterventions } from '@/hooks/useInterventions';
import { useNotifications } from '@/hooks/useNotifications';
import ProtectedRoute from '@/components/ProtectedRoute';
import NotificationsDropdown from '@/components/NotificationsDropdown';

const TechnicianDashboard = () => {
  return (
    <ProtectedRoute requiredRole="technicien">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <TechnicianSidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <SidebarTrigger />
              <NotificationsDropdown />
            </div>
            <DashboardContent />
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

const TechnicianSidebar = () => {
  const { signOut } = useAuthContext();
  
  const menuItems = [
    { title: "Accueil", icon: Home, active: true, href: "/technician/dashboard" },
    { title: "Profil", icon: User },
    { title: "Disponibilités", icon: Calendar, href: "/technician/availability" },
    { title: "Demandes", icon: FileText },
    { title: "Interventions", icon: Wrench },
    { title: "Performances", icon: BarChart3 },
    { title: "Paiements", icon: Euro },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="rofex-gradient rounded-lg p-2">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#d9534f] to-[#5bc0de] bg-clip-text text-transparent">
              ROFEX Pro
            </span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={item.active ? "bg-[#d9534f] text-white" : ""}>
                    <a href={item.href || "#"} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-6">
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-600 hover:bg-red-50"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const DashboardContent = () => {
  const { profile } = useAuthContext();
  const { interventions, updateInterventionStatus } = useInterventions();
  const { notifications, unreadCount } = useNotifications();

  const handleAcceptRequest = async (interventionId: string) => {
    await updateInterventionStatus(interventionId, 'acceptee');
  };

  const handleRejectRequest = async (interventionId: string) => {
    await updateInterventionStatus(interventionId, 'refusee');
  };

  // Filter interventions for this technician
  const myInterventions = interventions.filter(
    intervention => intervention.technicien_id === profile?.user_id && intervention.statut !== 'en_attente'
  );
  
  const pendingRequests = interventions.filter(
    intervention => intervention.statut === 'en_attente'
  );

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="rofex-gradient rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Bonjour, {profile?.prenom}</h1>
        <p className="text-lg opacity-90">Voici votre tableau de bord pour aujourd'hui</p>
        {unreadCount > 0 && (
          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <p className="text-sm">
              🔔 Vous avez {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} notification{unreadCount > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Interventions acceptées</CardTitle>
            <Wrench className="h-4 w-4 text-[#d9534f]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myInterventions.length}</div>
            <p className="text-xs text-muted-foreground">Interventions en cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Nouvelles demandes</CardTitle>
            <FileText className="h-4 w-4 text-[#5bc0de]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">En attente de réponse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Note moyenne</CardTitle>
            <BarChart3 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              ★ 4.9<span className="text-sm font-normal text-gray-500">/5</span>
            </div>
            <p className="text-xs text-muted-foreground">Basé sur les avis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ce mois</CardTitle>
            <Euro className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847 €</div>
            <p className="text-xs text-muted-foreground">+12% vs mois précédent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interventions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#d9534f]" />
              Mes interventions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myInterventions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune intervention en cours</p>
            ) : (
              myInterventions.slice(0, 3).map((intervention) => (
                <div key={intervention.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{intervention.domaine}</h4>
                        <Badge className={
                          intervention.statut === 'acceptee' ? 'bg-green-100 text-green-800' :
                          intervention.statut === 'en_cours' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {intervention.statut}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{intervention.adresse}</p>
                      <p className="text-sm text-gray-500">{new Date(intervention.date_souhaitee).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Détail</Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* New Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#5bc0de]" />
              Nouvelles demandes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune nouvelle demande</p>
            ) : (
              pendingRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{request.domaine}</h4>
                      <p className="text-sm text-gray-600">{request.type_intervention}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>📍 {request.adresse}</span>
                        <span>📅 {new Date(request.date_souhaitee).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      ❌ Refuser
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      ✅ Accepter
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
