
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationData {
  technicien_email: string;
  technicien_name: string;
  client_name: string;
  client_entreprise?: string;
  type_intervention: string;
  domaine: string;
  adresse: string;
  date_souhaitee: string;
  intervention_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data }: { data: NotificationData } = await req.json();
    
    console.log('Sending intervention notification email to:', data.technicien_email);
    
    // Create email content
    const clientDisplay = data.client_entreprise || data.client_name;
    const subject = '🔔 Nouvelle demande ROFEX';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nouvelle demande d'intervention</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #d9534f 0%, #5bc0de 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🔔 Nouvelle demande ROFEX</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #333;">Bonjour ${data.technicien_name},</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              Vous avez reçu une nouvelle demande d'intervention :
            </p>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3 style="margin-top: 0; color: #d9534f;">Détails de l'intervention</h3>
              <p><strong>Client :</strong> ${clientDisplay}</p>
              <p><strong>Type d'intervention :</strong> ${data.type_intervention}</p>
              <p><strong>Domaine :</strong> ${data.domaine}</p>
              <p><strong>Date souhaitée :</strong> ${new Date(data.date_souhaitee).toLocaleDateString('fr-FR')}</p>
              <p><strong>Adresse :</strong> ${data.adresse}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/technician/dashboard" 
               style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px;">
              ✅ Accepter
            </a>
            <a href="${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/technician/dashboard" 
               style="background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              ❌ Refuser
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>Connectez-vous à votre tableau de bord ROFEX pour gérer cette demande.</p>
            <p>ROFEX - Plateforme de mise en relation professionnelle</p>
          </div>
        </body>
      </html>
    `;

    // For now, we'll just log the email content
    // In production, you would integrate with an email service like Resend
    console.log('Email would be sent with subject:', subject);
    console.log('Email content:', htmlContent);
    
    return new Response(
      JSON.stringify({ success: true, message: 'Notification email logged' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-intervention-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
