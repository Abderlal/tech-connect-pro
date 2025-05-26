export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      disponibilites: {
        Row: {
          created_at: string
          disponible: boolean
          heure_debut: string
          heure_fin: string
          id: string
          jour: string
          technicien_id: string
          updated_at: string
          zone_geographique: string | null
        }
        Insert: {
          created_at?: string
          disponible?: boolean
          heure_debut: string
          heure_fin: string
          id?: string
          jour: string
          technicien_id: string
          updated_at?: string
          zone_geographique?: string | null
        }
        Update: {
          created_at?: string
          disponible?: boolean
          heure_debut?: string
          heure_fin?: string
          id?: string
          jour?: string
          technicien_id?: string
          updated_at?: string
          zone_geographique?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disponibilites_technicien_id_fkey"
            columns: ["technicien_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      evaluations: {
        Row: {
          auteur_id: string
          commentaire: string | null
          created_at: string
          date_avis: string
          id: string
          intervention_id: string
          note: number
          technicien_id: string
        }
        Insert: {
          auteur_id: string
          commentaire?: string | null
          created_at?: string
          date_avis?: string
          id?: string
          intervention_id: string
          note: number
          technicien_id: string
        }
        Update: {
          auteur_id?: string
          commentaire?: string | null
          created_at?: string
          date_avis?: string
          id?: string
          intervention_id?: string
          note?: number
          technicien_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_auteur_id_fkey"
            columns: ["auteur_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "evaluations_intervention_id_fkey"
            columns: ["intervention_id"]
            isOneToOne: false
            referencedRelation: "interventions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_technicien_id_fkey"
            columns: ["technicien_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      interventions: {
        Row: {
          adresse: string
          client_id: string
          created_at: string
          date_souhaitee: string
          description: string | null
          domaine: string
          equipement: string | null
          id: string
          rapport_pdf_url: string | null
          statut: Database["public"]["Enums"]["intervention_status"]
          technicien_id: string | null
          type_intervention: Database["public"]["Enums"]["intervention_type"]
          updated_at: string
        }
        Insert: {
          adresse: string
          client_id: string
          created_at?: string
          date_souhaitee: string
          description?: string | null
          domaine: string
          equipement?: string | null
          id?: string
          rapport_pdf_url?: string | null
          statut?: Database["public"]["Enums"]["intervention_status"]
          technicien_id?: string | null
          type_intervention: Database["public"]["Enums"]["intervention_type"]
          updated_at?: string
        }
        Update: {
          adresse?: string
          client_id?: string
          created_at?: string
          date_souhaitee?: string
          description?: string | null
          domaine?: string
          equipement?: string | null
          id?: string
          rapport_pdf_url?: string | null
          statut?: Database["public"]["Enums"]["intervention_status"]
          technicien_id?: string | null
          type_intervention?: Database["public"]["Enums"]["intervention_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interventions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interventions_technicien_id_fkey"
            columns: ["technicien_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      paiements: {
        Row: {
          created_at: string
          date_paiement: string | null
          id: string
          intervention_id: string
          methode: Database["public"]["Enums"]["payment_method"] | null
          montant: number
          statut_paiement: Database["public"]["Enums"]["payment_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_paiement?: string | null
          id?: string
          intervention_id: string
          methode?: Database["public"]["Enums"]["payment_method"] | null
          montant: number
          statut_paiement?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_paiement?: string | null
          id?: string
          intervention_id?: string
          methode?: Database["public"]["Enums"]["payment_method"] | null
          montant?: number
          statut_paiement?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paiements_intervention_id_fkey"
            columns: ["intervention_id"]
            isOneToOne: false
            referencedRelation: "interventions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          certifications: string[] | null
          created_at: string
          date_creation: string
          domaine_activite: string | null
          email: string
          entreprise: string | null
          id: string
          localisation: string | null
          nom: string
          prenom: string
          role: Database["public"]["Enums"]["user_role"]
          siret: string | null
          telephone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string
          date_creation?: string
          domaine_activite?: string | null
          email: string
          entreprise?: string | null
          id?: string
          localisation?: string | null
          nom: string
          prenom: string
          role: Database["public"]["Enums"]["user_role"]
          siret?: string | null
          telephone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certifications?: string[] | null
          created_at?: string
          date_creation?: string
          domaine_activite?: string | null
          email?: string
          entreprise?: string | null
          id?: string
          localisation?: string | null
          nom?: string
          prenom?: string
          role?: Database["public"]["Enums"]["user_role"]
          siret?: string | null
          telephone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      intervention_status:
        | "en_attente"
        | "acceptee"
        | "en_cours"
        | "terminee"
        | "refusee"
      intervention_type:
        | "preventive"
        | "corrective"
        | "controle_reglementaire"
        | "travaux_specialises"
      payment_method: "cb" | "virement"
      payment_status: "en_attente" | "paye" | "echoue"
      user_role: "technicien" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      intervention_status: [
        "en_attente",
        "acceptee",
        "en_cours",
        "terminee",
        "refusee",
      ],
      intervention_type: [
        "preventive",
        "corrective",
        "controle_reglementaire",
        "travaux_specialises",
      ],
      payment_method: ["cb", "virement"],
      payment_status: ["en_attente", "paye", "echoue"],
      user_role: ["technicien", "client"],
    },
  },
} as const
