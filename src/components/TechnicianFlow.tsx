
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const TechnicianFlow: React.FC = () => {
  // Mock benefits for technicians
  const benefits = [
    {
      id: 1,
      title: 'Trouvez des Missions',
      description: 'Accédez à des opportunités de mission correspondant à vos compétences et à votre zone géographique.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Gagnez en Flexibilité',
      description: 'Choisissez vos horaires et les missions qui vous intéressent selon votre disponibilité.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Augmentez vos Revenus',
      description: 'Développez votre activité et augmentez votre chiffre d\'affaires grâce à notre large réseau d\'entreprises clientes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Bâtissez votre Réputation',
      description: 'Recevez des évaluations pour chaque mission terminée et construisez votre profil professionnel en ligne.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  return (
    <div className="container py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">Pour les Techniciens</h2>
      <p className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto">
        Rejoignez notre réseau de techniciens spécialisés et développez votre activité en accédant à de nouvelles opportunités professionnelles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <Card key={benefit.id} className="card-hover">
            <CardHeader>
              <div className="feature-icon mb-4">
                {benefit.icon}
              </div>
              <CardTitle>{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{benefit.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-secondary rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Comment ça fonctionne ?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                <div>
                  <span className="font-medium">Créez votre profil professionnel</span>
                  <p className="text-muted-foreground mt-1">Renseignez vos compétences, certifications, zone d'intervention et disponibilités.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                <div>
                  <span className="font-medium">Recevez des notifications</span>
                  <p className="text-muted-foreground mt-1">Soyez alerté des demandes d'intervention qui correspondent à votre profil et à votre zone.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                <div>
                  <span className="font-medium">Proposez vos services</span>
                  <p className="text-muted-foreground mt-1">Répondez rapidement aux demandes et proposez votre expertise et vos tarifs.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                <div>
                  <span className="font-medium">Réalisez l'intervention et soyez payé</span>
                  <p className="text-muted-foreground mt-1">Intervenez sur site, validez le travail effectué et recevez votre paiement rapidement.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Button className="btn-accent h-14 px-8" size="lg" asChild>
              <Link to="/technician/register">
                Devenir technicien
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianFlow;
