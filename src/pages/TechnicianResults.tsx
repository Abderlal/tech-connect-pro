import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Shield, Zap, Trophy, Eye, Calendar, Map, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InterventionRequestForm from '@/components/InterventionRequestForm';
import MapView from '@/components/MapView';

// Mock data for technicians with coordinates
const mockTechnicians = [
  {
    id: 1,
    name: 'Marc Dubois',
    specialties: ['CVC', 'Électricité industrielle'],
    location: 'Lyon, Rhône-Alpes',
    rating: 9.2,
    totalReviews: 47,
    avatar: null,
    badges: ['certified', 'reactive', 'top-rated'],
    lastReview: 'Intervention très professionnelle, délais respectés.',
    available: true,
    distance: '5 km',
    coordinates: [4.8357, 45.7640] as [number, number] // Lyon center
  },
  {
    id: 2,
    name: 'Sophie Martin',
    specialties: ['Plomberie', 'Sécurité incendie'],
    location: 'Villeurbanne, Rhône-Alpes',
    rating: 8.7,
    totalReviews: 32,
    avatar: null,
    badges: ['certified', 'reactive'],
    lastReview: 'Très réactive, travail de qualité.',
    available: true,
    distance: '8 km',
    coordinates: [4.8789, 45.7681] as [number, number] // Villeurbanne
  },
  {
    id: 3,
    name: 'Thomas Leroy',
    specialties: ['Climatisation', 'CVC'],
    location: 'Décines, Rhône-Alpes',
    rating: 8.9,
    totalReviews: 68,
    avatar: null,
    badges: ['certified', 'top-rated'],
    lastReview: 'Excellent technicien, je recommande vivement.',
    available: false,
    distance: '12 km',
    coordinates: [4.9578, 45.7701] as [number, number] // Décines
  },
  {
    id: 4,
    name: 'Caroline Petit',
    specialties: ['Électricité', 'Télécommunications'],
    location: 'Bron, Rhône-Alpes',
    rating: 9.5,
    totalReviews: 89,
    avatar: null,
    badges: ['certified', 'reactive', 'top-rated'],
    lastReview: 'Parfait ! Dépannage rapide et efficace.',
    available: true,
    distance: '6 km',
    coordinates: [4.9139, 45.7306] as [number, number] // Bron
  }
];

const TechnicianResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('rating');
  const [technicians, setTechnicians] = useState(mockTechnicians);
  const [showInterventionForm, setShowInterventionForm] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const category = searchParams.get('category') || 'preventive';
  const domain = searchParams.get('domain') || '';
  const location = searchParams.get('location') || '';

  const categoryTitles = {
    preventive: 'Maintenance Préventive',
    corrective: 'Maintenance Corrective',
    regulatory: 'Maintenance Réglementaire',
    construction: 'Travaux'
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...technicians].sort((a, b) => {
      switch (value) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        default:
          return 0;
      }
    });
    setTechnicians(sorted);
  };

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
        stars.push(<Star key={i} size={14} className="text-yellow-400 fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={14} className="text-yellow-400 fill-current opacity-50" />);
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleViewProfile = (techId: number) => {
    navigate(`/client/technician/${techId}`);
  };

  const handleRequestIntervention = (tech: any) => {
    setSelectedTechnician(tech);
    setShowInterventionForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/client/search')}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour à la recherche
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Techniciens disponibles
          </h1>
          <p className="text-gray-600">
            {categoryTitles[category as keyof typeof categoryTitles]} 
            {domain && ` • ${domain}`}
            {location && ` • ${location}`}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="text-gray-600">
              {technicians.length} technicien{technicians.length > 1 ? 's' : ''} trouvé{technicians.length > 1 ? 's' : ''}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid size={16} className="mr-1" />
                Grille
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="px-3"
              >
                <Map size={16} className="mr-1" />
                Carte
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Trier par :</span>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Note</SelectItem>
                <SelectItem value="distance">Proximité</SelectItem>
                <SelectItem value="reviews">Avis clients</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'map' ? (
          <div className="h-[600px] mb-6">
            <MapView
              technicians={technicians}
              onTechnicianSelect={handleViewProfile}
              onTechnicianRequest={handleRequestIntervention}
            />
          </div>
        ) : (
          /* Technicians Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicians.map((tech) => (
              <Card key={tech.id} className="card-rofex">
                <CardContent className="p-6">
                  {/* Header with Avatar and Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={tech.avatar || undefined} alt={tech.name} />
                      <AvatarFallback className="bg-[#d9534f] text-white text-lg font-bold">
                        {getInitials(tech.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {tech.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                        <MapPin size={14} />
                        <span>{tech.location}</span>
                        <span className="text-gray-400">• {tech.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {tech.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {renderStars(tech.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tech.rating}/10
                    </span>
                    <span className="text-xs text-gray-500">
                      ({tech.totalReviews} avis)
                    </span>
                  </div>

                  {/* Badges */}
                  {tech.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
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
                  )}

                  {/* Last Review */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 italic">
                      "{tech.lastReview}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewProfile(tech.id)}
                    >
                      <Eye size={14} className="mr-1" />
                      Voir profil
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 btn-rofex-primary"
                      disabled={!tech.available}
                      onClick={() => handleRequestIntervention(tech)}
                    >
                      <Calendar size={14} className="mr-1" />
                      {tech.available ? 'Demander' : 'Indisponible'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {technicians.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin size={48} className="mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun technicien trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Essayez d'élargir vos critères de recherche ou modifier la localisation.
            </p>
            <Button onClick={() => navigate('/client/search')}>
              Modifier la recherche
            </Button>
          </div>
        )}
      </div>

      {/* Intervention Request Form Modal */}
      {selectedTechnician && (
        <InterventionRequestForm
          isOpen={showInterventionForm}
          onClose={() => {
            setShowInterventionForm(false);
            setSelectedTechnician(null);
          }}
          technicianName={selectedTechnician.name}
          technicianSpecialties={selectedTechnician.specialties}
        />
      )}
    </div>
  );
};

export default TechnicianResults;
