
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ClientFlow: React.FC = () => {
  // Mock data for client services
  const services = [
    {
      id: 1,
      title: 'Maintenance Préventive',
      description: 'Planifiez la maintenance régulière de vos équipements pour éviter les pannes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Maintenance Corrective',
      description: 'Intervention rapide en cas de panne pour remettre vos équipements en service.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Contrôle Réglementaire',
      description: 'Mettez-vous en conformité avec les normes et réglementations en vigueur.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Travaux Spécialisés',
      description: 'Réalisez des travaux spécifiques nécessitant l\'expertise de professionnels qualifiés.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    }
  ];

  return (
    <div className="container py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">Solutions pour Entreprises</h2>
      <p className="text-muted-foreground text-lg mb-12 text-center max-w-2xl mx-auto">
        TechConnect vous aide à trouver rapidement des techniciens qualifiés pour tous vos besoins de maintenance technique et travaux spécialisés.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="card-hover">
            <CardHeader>
              <div className="feature-icon mb-4">
                {service.icon}
              </div>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/client/create-request">
                  Demander une intervention
                </Link>
              </Button>
            </CardFooter>
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
                  <span className="font-medium">Créez une demande d'intervention</span>
                  <p className="text-muted-foreground mt-1">Décrivez votre besoin, le type d'intervention, le niveau d'urgence, et l'emplacement.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                <div>
                  <span className="font-medium">Recevez des propositions</span>
                  <p className="text-muted-foreground mt-1">Les techniciens qualifiés dans votre zone vous envoient leurs disponibilités et tarifs.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                <div>
                  <span className="font-medium">Sélectionnez le technicien</span>
                  <p className="text-muted-foreground mt-1">Choisissez le professionnel qui correspond le mieux à vos besoins et votre budget.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary rounded-full text-white h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                <div>
                  <span className="font-medium">Intervention et suivi</span>
                  <p className="text-muted-foreground mt-1">Le technicien intervient sur site et vous recevez un rapport détaillé à la fin de l'intervention.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Button className="btn-accent h-14 px-8" size="lg" asChild>
              <Link to="/client/register">
                Créer un compte client
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFlow;
