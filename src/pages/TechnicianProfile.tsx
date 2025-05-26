import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Shield, Zap, Trophy, Calendar, MessageSquare, Heart, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import InterventionRequestForm from '@/components/InterventionRequestForm';

// Mock data for technician profile
const mockTechnicianProfile = {
  id: 1,
  name: 'Marc Dubois',
  specialties: ['CVC', 'Électricité industrielle', 'Climatisation'],
  location: 'Lyon, Rhône-Alpes',
  serviceArea: 'Lyon métropole et environs (50km)',
  rating: 9.2,
  totalReviews: 47,
  avatar: null,
  badges: ['certified', 'reactive', 'top-rated'],
  nextAvailability: '2024-05-28',
  certifications: [
    'Qualification RGE',
    'Habilitation électrique BR',
    'Certification QUALIPAC',
    'Formation sécurité incendie'
  ],
  equipment: [
    'Systèmes CVC industriels',
    'Pompes à chaleur',
    'Climatisation réversible',
    'Ventilation mécanique contrôlée',
    'Équipements électriques basse et haute tension'
  ],
  reviews: [
    {
      id: 1,
      clientName: 'Entreprise ABC',
      rating: 10,
      comment: 'Intervention très professionnelle, délais respectés. Marc a résolu notre problème de climatisation rapidement.',
      date: '2024-05-15'
    },
    {
      id: 2,
      clientName: 'Société XYZ',
      rating: 9,
      comment: 'Technicien compétent et réactif. Bon rapport qualité-prix.',
      date: '2024-05-10'
    },
    {
      id: 3,
      clientName: 'Bureau DEF',
      rating: 9,
      comment: 'Service excellent, diagnostic précis et solution efficace.',
      date: '2024-05-05'
    }
  ]
};

const TechnicianProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tech = mockTechnicianProfile;
  const [showInterventionForm, setShowInterventionForm] = useState(false);

  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case 'certified':
        return { icon: Shield, label: 'Certifié', color: 'bg-blue-100 text-blue-800' };
      case 'reactive':
        return { icon: Zap, label: 'Réactif', color: 'bg-yellow-100 text-yellow-800' };
      case 'top-rated':
        return { icon: Trophy, label: 'Top noté', color: 'bg-green-100 text-green-800' };
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 10; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} className="text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={16} className="text-yellow-400 fill-current opacity-50" />);
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRequestIntervention = () => {
    setShowInterventionForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour aux résultats
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={tech.avatar || undefined} alt={tech.name} />
                  <AvatarFallback className="bg-[#d9534f] text-white text-2xl font-bold">
                    {getInitials(tech.name)}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {tech.name}
                </h1>
                
                <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-4">
                  <MapPin size={16} />
                  <span>{tech.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {renderStars(tech.rating)}
                  </div>
                  <span className="font-medium text-gray-900">
                    {tech.rating}/10
                  </span>
                  <span className="text-sm text-gray-500">
                    ({tech.totalReviews} avis)
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {tech.badges.map((badge) => {
                    const badgeInfo = getBadgeInfo(badge);
                    if (!badgeInfo) return null;
                    
                    const Icon = badgeInfo.icon;
                    return (
                      <Badge key={badge} className={`${badgeInfo.color} text-xs`}>
                        <Icon size={12} className="mr-1" />
                        {badgeInfo.label}
                      </Badge>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full btn-rofex-primary"
                    onClick={handleRequestIntervention}
                  >
                    <Calendar size={16} className="mr-2" />
                    Demander une intervention
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare size={16} className="mr-2" />
                    Envoyer un message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart size={16} className="mr-2" />
                    Ajouter aux favoris
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock size={18} />
                  Disponibilités
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Prochain créneau libre :</p>
                <p className="font-medium text-green-600">
                  {formatDate(tech.nextAvailability)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Specialties & Service Area */}
            <Card>
              <CardHeader>
                <CardTitle>Spécialités et zone d'intervention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Domaines d'expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {tech.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Zone de service</h4>
                  <p className="text-gray-600">{tech.serviceArea}</p>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Certifications & Agréments
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-1" />
                    Télécharger PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tech.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield size={16} className="text-blue-600" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card>
              <CardHeader>
                <CardTitle>Équipements pris en charge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tech.equipment.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Avis clients récents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tech.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{review.clientName}</span>
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Intervention Request Form Modal */}
      <InterventionRequestForm
        isOpen={showInterventionForm}
        onClose={() => setShowInterventionForm(false)}
        technicianName={tech.name}
        technicianSpecialties={tech.specialties}
      />
    </div>
  );
};

export default TechnicianProfile;
