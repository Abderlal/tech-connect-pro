import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Settings, CheckCircle2, Wrench, AlertTriangle, Shield, Construction, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type InterventionType = 'preventive' | 'corrective' | 'regulatory' | 'construction' | null;

const TechnicianSearch = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<InterventionType>(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [formData, setFormData] = useState({
    domain: '',
    location: '',
    radius: '20',
    date: '',
    equipment: '',
    maintenanceLevel: '',
    maintenanceRange: '',
    siteType: '',
    frequency: '',
    certifiedOnly: false,
    urgent: false
  });

  const categories = [
    {
      id: 'preventive' as const,
      title: 'Maintenance Préventive',
      icon: CheckCircle2,
      color: 'bg-green-100 hover:bg-green-200 border-green-300',
      iconColor: 'text-green-600',
      description: 'Maintenance planifiée pour prévenir les pannes'
    },
    {
      id: 'corrective' as const,
      title: 'Maintenance Corrective',
      icon: Wrench,
      color: 'bg-orange-100 hover:bg-orange-200 border-orange-300',
      iconColor: 'text-orange-600',
      description: 'Réparation suite à une panne ou dysfonctionnement'
    },
    {
      id: 'regulatory' as const,
      title: 'Maintenance Réglementaire',
      icon: Shield,
      color: 'bg-blue-100 hover:bg-blue-200 border-blue-300',
      iconColor: 'text-blue-600',
      description: 'Contrôles obligatoires et certifications'
    },
    {
      id: 'construction' as const,
      title: 'Travaux',
      icon: Construction,
      color: 'bg-purple-100 hover:bg-purple-200 border-purple-300',
      iconColor: 'text-purple-600',
      description: 'Génie civil, second œuvre, aménagements'
    }
  ];

  const domains = [
    'Électricité',
    'Plomberie',
    'CVC (Chauffage, Ventilation, Climatisation)',
    'Sécurité incendie',
    'Climatisation',
    'Ascenseurs',
    'Électronique',
    'Mécanique',
    'Informatique',
    'Télécommunications'
  ];

  const handleCategorySelect = (categoryId: InterventionType) => {
    setSelectedCategory(categoryId);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Recherche lancée avec:', { selectedCategory, ...formData });
    
    // Build search parameters
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (formData.domain) params.set('domain', formData.domain);
    if (formData.location) params.set('location', formData.location);
    if (formData.radius) params.set('radius', formData.radius);
    if (formData.date) params.set('date', formData.date);
    
    // Navigate to results page with search parameters
    navigate(`/client/search/results?${params.toString()}`);
  };

  const handleReset = () => {
    setFormData({
      domain: '',
      location: '',
      radius: '20',
      date: '',
      equipment: '',
      maintenanceLevel: '',
      maintenanceRange: '',
      siteType: '',
      frequency: '',
      certifiedOnly: false,
      urgent: false
    });
    setSelectedCategory(null);
    setIsAdvancedOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Trouver un technicien
          </h1>
          <p className="text-gray-600">
            Sélectionnez un type d'intervention pour rechercher un technicien adapté à vos besoins.
          </p>
        </div>

        {/* Category Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                    : 'hover:shadow-lg hover:scale-102'
                } ${category.color}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full bg-white shadow-sm ${category.iconColor}`}>
                      <Icon size={32} />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search Form - Only show when category is selected */}
        {selectedCategory && (
          <Card className="mb-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="text-blue-600" size={20} />
                Recherche de technicien - {categories.find(c => c.id === selectedCategory)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domaine d'intervention</Label>
                  <Select value={formData.domain} onValueChange={(value) => handleInputChange('domain', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localisation</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        id="location"
                        placeholder="Ville ou adresse"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                    <Select value={formData.radius} onValueChange={(value) => handleInputChange('radius', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="20">20 km</SelectItem>
                        <SelectItem value="50">50 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date souhaitée</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
              </div>

              {/* Advanced Search */}
              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Recherche avancée
                    {isAdvancedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="equipment">Équipement concerné</Label>
                      <Input
                        id="equipment"
                        placeholder="Ex: chaudière, compresseur..."
                        value={formData.equipment}
                        onChange={(e) => handleInputChange('equipment', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maintenanceLevel">Niveau de maintenance</Label>
                      <Select value={formData.maintenanceLevel} onValueChange={(value) => handleInputChange('maintenanceLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N1">N1 - Visuelle</SelectItem>
                          <SelectItem value="N2">N2 - Fonctionnelle</SelectItem>
                          <SelectItem value="N3">N3 - Technique approfondie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maintenanceRange">Gamme de maintenance</Label>
                      <Select value={formData.maintenanceRange} onValueChange={(value) => handleInputChange('maintenanceRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="critique">Critique</SelectItem>
                          <SelectItem value="securite">Sécurité</SelectItem>
                          <SelectItem value="reglementaire">Réglementaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteType">Type de site</Label>
                      <Select value={formData.siteType} onValueChange={(value) => handleInputChange('siteType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="industrie">Industrie</SelectItem>
                          <SelectItem value="public">Établissement public</SelectItem>
                          <SelectItem value="logistique">Logistique</SelectItem>
                          <SelectItem value="sante">Santé</SelectItem>
                          <SelectItem value="tertiaire">Tertiaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequency">Fréquence d'intervention</Label>
                      <Select value={formData.frequency} onValueChange={(value) => handleInputChange('frequency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ponctuelle">Ponctuelle</SelectItem>
                          <SelectItem value="mensuelle">Mensuelle</SelectItem>
                          <SelectItem value="trimestrielle">Trimestrielle</SelectItem>
                          <SelectItem value="annuelle">Annuellement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="certified"
                        checked={formData.certifiedOnly}
                        onCheckedChange={(checked) => handleInputChange('certifiedOnly', checked as boolean)}
                      />
                      <Label htmlFor="certified">Technicien certifié uniquement</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgent}
                        onCheckedChange={(checked) => handleInputChange('urgent', checked as boolean)}
                      />
                      <Label htmlFor="urgent">Intervention en urgence (&lt; 24h)</Label>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={handleReset}>
                  Réinitialiser
                </Button>
                <Button 
                  onClick={handleSearch} 
                  className="btn-rofex-primary"
                  disabled={!formData.domain || !formData.location}
                >
                  Rechercher des techniciens
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TechnicianSearch;
