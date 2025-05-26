
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Intervention {
  id: string;
  client_id: string;
  technicien_id?: string;
  type_intervention: 'preventive' | 'corrective' | 'controle_reglementaire' | 'travaux_specialises';
  domaine: string;
  equipement?: string;
  adresse: string;
  date_souhaitee: string;
  statut: 'en_attente' | 'acceptee' | 'en_cours' | 'terminee' | 'refusee';
  rapport_pdf_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useInterventions = () => {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchInterventions();
    }
  }, [user]);

  const fetchInterventions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('interventions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching interventions:', error);
        return;
      }

      setInterventions(data || []);
    } catch (error) {
      console.error('Error fetching interventions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createIntervention = async (intervention: Omit<Intervention, 'id' | 'created_at' | 'updated_at' | 'client_id' | 'statut'>) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('interventions')
        .insert([{
          ...intervention,
          client_id: user.id,
          statut: 'en_attente'
        }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de créer l'intervention.",
          variant: "destructive",
        });
        return { success: false, error };
      }

      setInterventions(prev => [data, ...prev]);
      toast({
        title: "Intervention créée",
        description: "Votre demande d'intervention a été enregistrée.",
      });

      return { success: true, data };
    } catch (error) {
      console.error('Create intervention error:', error);
      return { success: false, error };
    }
  };

  const updateInterventionStatus = async (interventionId: string, statut: Intervention['statut']) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('interventions')
        .update({ statut })
        .eq('id', interventionId)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut.",
          variant: "destructive",
        });
        return { success: false, error };
      }

      setInterventions(prev => 
        prev.map(intervention => 
          intervention.id === interventionId ? data : intervention
        )
      );

      toast({
        title: "Statut mis à jour",
        description: `L'intervention a été ${statut === 'acceptee' ? 'acceptée' : 'refusée'}.`,
      });

      return { success: true, data };
    } catch (error) {
      console.error('Update intervention status error:', error);
      return { success: false, error };
    }
  };

  const assignTechnician = async (interventionId: string, technicianId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const { data, error } = await supabase
        .from('interventions')
        .update({ 
          technicien_id: technicianId,
          statut: 'acceptee'
        })
        .eq('id', interventionId)
        .select()
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'assigner le technicien.",
          variant: "destructive",
        });
        return { success: false, error };
      }

      setInterventions(prev => 
        prev.map(intervention => 
          intervention.id === interventionId ? data : intervention
        )
      );

      return { success: true, data };
    } catch (error) {
      console.error('Assign technician error:', error);
      return { success: false, error };
    }
  };

  return {
    interventions,
    loading,
    createIntervention,
    updateInterventionStatus,
    assignTechnician,
    refetch: fetchInterventions,
  };
};
