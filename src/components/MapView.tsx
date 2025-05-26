
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Eye } from 'lucide-react';

interface Technician {
  id: number;
  name: string;
  specialties: string[];
  location: string;
  rating: number;
  totalReviews: number;
  available: boolean;
  distance: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface MapViewProps {
  technicians: Technician[];
  onTechnicianSelect: (techId: number) => void;
  onTechnicianRequest: (tech: Technician) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  technicians, 
  onTechnicianSelect, 
  onTechnicianRequest 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [4.8357, 45.7640], // Lyon coordinates
        zoom: 11
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for technicians
      addTechnicianMarkers();

      setShowTokenInput(false);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error);
    }
  };

  const addTechnicianMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    technicians.forEach(tech => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'technician-marker';
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${tech.available ? '#d9534f' : '#6b7280'};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      `;
      
      // Add initials
      const initials = tech.name.split(' ').map(n => n[0]).join('').toUpperCase();
      markerElement.textContent = initials;

      // Create popup content
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <h3 class="font-semibold text-lg mb-2">${tech.name}</h3>
          <div class="flex items-center gap-1 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="text-sm font-medium">${tech.rating}/10</span>
            <span class="text-xs text-gray-500">(${tech.totalReviews} avis)</span>
          </div>
          <div class="flex flex-wrap gap-1 mb-3">
            ${tech.specialties.map(specialty => `
              <span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">${specialty}</span>
            `).join('')}
          </div>
          <div class="flex gap-2">
            <button 
              class="flex-1 px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
              onclick="window.handleViewProfile(${tech.id})"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-1">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Voir profil
            </button>
            <button 
              class="flex-1 px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 ${!tech.available ? 'opacity-50 cursor-not-allowed' : ''}"
              onclick="window.handleRequestIntervention(${tech.id})"
              ${!tech.available ? 'disabled' : ''}
            >
              ${tech.available ? 'Demander' : 'Indisponible'}
            </button>
          </div>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(popupContent);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(tech.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Set global functions for popup buttons
    (window as any).handleViewProfile = (techId: number) => {
      onTechnicianSelect(techId);
    };

    (window as any).handleRequestIntervention = (techId: number) => {
      const tech = technicians.find(t => t.id === techId);
      if (tech) {
        onTechnicianRequest(tech);
      }
    };
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (map.current) {
      addTechnicianMarkers();
    }
  }, [technicians]);

  if (showTokenInput) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <MapPin size={48} className="mx-auto text-gray-400" />
            <h3 className="text-lg font-semibold">Configuration de la carte</h3>
            <p className="text-sm text-gray-600">
              Pour afficher la carte interactive, veuillez entrer votre token Mapbox.
            </p>
            <p className="text-xs text-gray-500">
              Obtenez votre token gratuit sur{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="mapbox-token">Token Mapbox</Label>
            <Input
              id="mapbox-token"
              type="password"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button 
              onClick={initializeMap}
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Initialiser la carte
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Indisponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
