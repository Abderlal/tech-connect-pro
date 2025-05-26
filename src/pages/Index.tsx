
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("client");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden">
          <div className="rofex-hero-gradient">
            <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl animate-fade-in">
                Maintenance simplifiée, résultats garantis
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl text-white/90 animate-fade-in" style={{ animationDelay: '100ms' }}>
                La plateforme B2B qui connecte les entreprises aux meilleurs techniciens certifiés pour tous vos besoins de maintenance technique et travaux spécialisés.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Button className="btn-rofex-primary h-14 px-10 text-lg shadow-2xl" asChild>
                  <a href="#client-services">Trouver un technicien</a>
                </Button>
                <Button className="btn-rofex-secondary h-14 px-10 text-lg shadow-2xl" asChild>
                  <a href="#technician-benefits">Devenir technicien</a>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>

        {/* 2. Services Cards Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Nos Services de Maintenance</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Des solutions professionnelles adaptées à tous vos besoins de maintenance technique
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-rofex relative">
                <Badge className="absolute -top-2 -right-2 bg-[#d9534f] text-white border-none">Recommandé</Badge>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Maintenance Préventive</h3>
                  <p className="text-gray-600 mb-4">
                    Planifiez vos interventions pour éviter les pannes et optimiser la durée de vie de vos équipements.
                  </p>
                  <Button variant="outline" className="w-full border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
              
              <div className="card-rofex">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
                      <path d="M15 7h6v6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Maintenance Corrective</h3>
                  <p className="text-gray-600 mb-4">
                    Intervention rapide en cas de panne pour remettre vos équipements en service dans les meilleurs délais.
                  </p>
                  <Button variant="outline" className="w-full border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
              
              <div className="card-rofex">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Maintenance Réglementaire</h3>
                  <p className="text-gray-600 mb-4">
                    Conformité aux normes et réglementations en vigueur avec certification et traçabilité complète.
                  </p>
                  <Button variant="outline" className="w-full border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white">
                    Découvrir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 3. Comment ça marche Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Comment ça marche ?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Un processus simple et efficace pour connecter vos besoins aux meilleurs techniciens
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="rofex-step-icon mx-auto mb-4">1</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Créez votre demande</h3>
                <p className="text-gray-600 text-sm">
                  Décrivez votre besoin d'intervention en quelques clics
                </p>
              </div>
              
              <div className="text-center">
                <div className="rofex-step-icon mx-auto mb-4">2</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Matching intelligent</h3>
                <p className="text-gray-600 text-sm">
                  Notre algorithme trouve les techniciens les mieux adaptés
                </p>
              </div>
              
              <div className="text-center">
                <div className="rofex-step-icon mx-auto mb-4">3</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Planification</h3>
                <p className="text-gray-600 text-sm">
                  Choisissez votre technicien et planifiez l'intervention
                </p>
              </div>
              
              <div className="text-center">
                <div className="rofex-step-icon mx-auto mb-4">4</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Suivi & rapport</h3>
                <p className="text-gray-600 text-sm">
                  Suivez l'intervention et recevez le rapport détaillé
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 4. CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="rofex-gradient rounded-xl p-8 md:p-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à révolutionner votre maintenance ?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
                Rejoignez des milliers d'entreprises et de techniciens qui font confiance à ROFEX pour leurs interventions techniques.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button className="btn-rofex-outline h-14 px-8" asChild>
                  <a href="#client-services">Je suis une entreprise</a>
                </Button>
                <Button className="bg-white text-[#d9534f] hover:bg-gray-100 h-14 px-8 font-medium transition-all duration-300" asChild>
                  <a href="#technician-benefits">Je suis un technicien</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* 5. Testimonial Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Ce que disent nos clients</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Des expériences qui témoignent de la qualité de nos services
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="card-rofex text-center">
                <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6 leading-relaxed">
                  "ROFEX a complètement transformé notre approche de la maintenance. Grâce à leur programme préventif, nous avons réduit nos temps d'arrêt de 70% et économisé des milliers d'euros en réparations d'urgence."
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-[#5bc0de] text-white text-lg font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Jean Dupont</p>
                    <p className="text-gray-600 text-sm">Directeur des opérations, Entreprise XYZ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 6. Client Services Section */}
        <section id="client-services" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Tableau de bord Client</h2>
              <p className="text-gray-600 text-lg">Gérez toutes vos interventions depuis une interface unique</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-rofex">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Statistiques</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interventions ce mois</span>
                    <span className="font-bold text-[#d9534f]">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temps moyen</span>
                    <span className="font-bold text-[#5bc0de]">2.3h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taux de satisfaction</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                </div>
              </div>
              
              <div className="card-rofex">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Interventions récentes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Maintenance HVAC</p>
                      <p className="text-xs text-gray-500">Site A - 15/01</p>
                    </div>
                    <Badge className="status-preventive">Préventive</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Réparation urgente</p>
                      <p className="text-xs text-gray-500">Site B - 14/01</p>
                    </div>
                    <Badge className="status-corrective">Corrective</Badge>
                  </div>
                </div>
              </div>
              
              <div className="card-rofex">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Actions rapides</h3>
                <div className="space-y-3">
                  <Button className="w-full btn-rofex-primary text-sm">
                    Nouvelle intervention
                  </Button>
                  <Button variant="outline" className="w-full border-[#5bc0de] text-[#5bc0de] hover:bg-[#5bc0de] hover:text-white text-sm">
                    Voir l'historique
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    Télécharger rapports
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technician Benefits Section */}
        <section id="technician-benefits" className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Tableau de bord Technicien</h2>
              <p className="text-gray-600 text-lg">Gérez vos missions et développez votre activité</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-rofex">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Missions disponibles</h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">Maintenance climatisation</h4>
                      <Badge className="status-preventive text-xs">Préventive</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Paris 15e • Demain 14h</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="btn-rofex-primary text-xs px-3 py-1">Accepter</Button>
                      <Button size="sm" variant="outline" className="text-xs px-3 py-1">Détails</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-rofex">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Missions réalisées</span>
                    <span className="font-bold text-[#d9534f]">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Note moyenne</span>
                    <span className="font-bold text-[#5bc0de]">4.9/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenus ce mois</span>
                    <span className="font-bold text-green-600">3 450€</span>
                  </div>
                </div>
              </div>
              
              <div className="card-rofex">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Planning</h3>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-[#5bc0de]/10 rounded-lg">
                    <p className="text-sm font-medium text-[#5bc0de]">Aujourd'hui</p>
                    <p className="text-xs text-gray-600">2 interventions</p>
                  </div>
                  <Button className="w-full btn-rofex-secondary text-sm">
                    Gérer mes disponibilités
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
