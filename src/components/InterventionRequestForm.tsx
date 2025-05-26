
import React, { useState } from 'react';
import { Calendar, Upload, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface InterventionRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  technicianName: string;
  technicianSpecialties: string[];
}

const InterventionRequestForm: React.FC<InterventionRequestFormProps> = ({
  isOpen,
  onClose,
  technicianName,
  technicianSpecialties,
}) => {
  const [formData, setFormData] = useState({
    interventionType: '',
    domain: '',
    equipment: '',
    address: '',
    date: '',
    time: '',
    isUrgent: false,
    details: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const interventionTypes = [
    'Maintenance Préventive',
    'Maintenance Corrective',
    'Maintenance Réglementaire',
    'Travaux'
  ];

  const domains = [
    'CVC (Chauffage, Ventilation, Climatisation)',
    'Électricité industrielle',
    'Plomberie',
    'Sécurité incendie',
    'Télécommunications',
    'Climatisation'
  ];

  const equipmentOptions = [
    'Systèmes CVC industriels',
    'Pompes à chaleur',
    'Climatisation réversible',
    'Ventilation mécanique contrôlée',
    'Équipements électriques basse tension',
    'Équipements électriques haute tension',
    'Systèmes de sécurité incendie',
    'Installation télécom',
    'Autre (préciser dans les détails)'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.interventionType || !formData.domain || !formData.address || !formData.date) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    console.log('Intervention request submitted:', {
      technician: technicianName,
      ...formData,
      files: uploadedFiles
    });

    toast({
      title: "Demande envoyée",
      description: `Votre demande a bien été transmise à ${technicianName}`,
    });

    onClose();
  };

  const resetForm = () => {
    setFormData({
      interventionType: '',
      domain: '',
      equipment: '',
      address: '',
      date: '',
      time: '',
      isUrgent: false,
      details: '',
    });
    setUploadedFiles([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Demande d'intervention
          </DialogTitle>
          <p className="text-gray-600">
            Technicien : <span className="font-medium">{technicianName}</span>
          </p>
          <p className="text-sm text-gray-500">
            Spécialités : {technicianSpecialties.join(', ')}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type d'intervention */}
          <div className="space-y-2">
            <Label htmlFor="interventionType" className="text-sm font-medium">
              Type d'intervention *
            </Label>
            <Select value={formData.interventionType} onValueChange={(value) => handleInputChange('interventionType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type d'intervention" />
              </SelectTrigger>
              <SelectContent>
                {interventionTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Domaine */}
          <div className="space-y-2">
            <Label htmlFor="domain" className="text-sm font-medium">
              Domaine *
            </Label>
            <Select value={formData.domain} onValueChange={(value) => handleInputChange('domain', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le domaine" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Équipement */}
          <div className="space-y-2">
            <Label htmlFor="equipment" className="text-sm font-medium">
              Équipement concerné
            </Label>
            <Select value={formData.equipment} onValueChange={(value) => handleInputChange('equipment', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez l'équipement" />
              </SelectTrigger>
              <SelectContent>
                {equipmentOptions.map((equipment) => (
                  <SelectItem key={equipment} value={equipment}>{equipment}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Adresse */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Adresse d'intervention *
            </Label>
            <Textarea
              id="address"
              placeholder="Saisissez l'adresse complète"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          {/* Date et heure */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date souhaitée *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">
                Créneau horaire
              </Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'heure" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Urgence */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={formData.isUrgent}
              onCheckedChange={(checked) => handleInputChange('isUrgent', checked as boolean)}
            />
            <Label htmlFor="urgent" className={`text-sm font-medium flex items-center gap-2 ${formData.isUrgent ? 'text-red-600' : 'text-gray-700'}`}>
              <AlertTriangle size={16} className={formData.isUrgent ? 'text-red-500' : 'text-gray-400'} />
              Intervention urgente
            </Label>
          </div>

          {/* Upload de documents */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Documents à joindre
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Cliquez pour ajouter des fichiers (PDF, Images)
                </span>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Détails complémentaires */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-sm font-medium">
              Détails complémentaires
            </Label>
            <Textarea
              id="details"
              placeholder="Décrivez votre besoin, problème rencontré, contraintes particulières..."
              value={formData.details}
              onChange={(e) => handleInputChange('details', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 btn-rofex-primary"
            >
              ✅ Envoyer la demande
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              ❌ Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterventionRequestForm;
