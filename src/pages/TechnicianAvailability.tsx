
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, User, Calendar as CalendarIcon, FileText, Wrench, BarChart3, Euro, LogOut, MapPin, Clock, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const availabilitySchema = z.object({
  zones: z.array(z.string()).min(1, "Sélectionnez au moins une zone"),
  days: z.array(z.string()).min(1, "Sélectionnez au moins un jour"),
  startDate: z.date(),
  endDate: z.date(),
  maxInterventions: z.number().min(1).max(10),
});

type AvailabilityForm = z.infer<typeof availabilitySchema>;

const TechnicianAvailability = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <TechnicianSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4" />
          <AvailabilityContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

const TechnicianSidebar = () => {
  const menuItems = [
    { title: "Accueil", icon: Home, href: "/technician/dashboard" },
    { title: "Profil", icon: User },
    { title: "Disponibilités", icon: CalendarIcon, active: true },
    { title: "Demandes", icon: FileText },
    { title: "Interventions", icon: Wrench },
    { title: "Performances", icon: BarChart3 },
    { title: "Paiements", icon: Euro },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="rofex-gradient rounded-lg p-2">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#d9534f] to-[#5bc0de] bg-clip-text text-transparent">
              ROFEX Pro
            </span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={item.active ? "bg-[#d9534f] text-white" : ""}>
                    <a href={item.href || "#"} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-6">
          <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AvailabilityContent = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<AvailabilityForm>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      zones: [],
      days: [],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours plus tard
      maxInterventions: 3,
    },
  });

  const onSubmit = (data: AvailabilityForm) => {
    console.log("Données de disponibilité:", data);
    toast({
      title: "Disponibilités enregistrées",
      description: "Vos créneaux de disponibilité ont été mis à jour avec succès.",
    });
    setIsDialogOpen(false);
  };

  const zones = [
    "Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", 
    "Val-de-Marne (94)", "Seine-et-Marne (77)", "Yvelines (78)",
    "Essonne (91)", "Val-d'Oise (95)"
  ];

  const days = [
    { id: "monday", label: "Lundi" },
    { id: "tuesday", label: "Mardi" },
    { id: "wednesday", label: "Mercredi" },
    { id: "thursday", label: "Jeudi" },
    { id: "friday", label: "Vendredi" },
    { id: "saturday", label: "Samedi" },
    { id: "sunday", label: "Dimanche" },
  ];

  const timeSlots = [
    "08:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00", "18:00-20:00"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rofex-gradient rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Gestion des disponibilités</h1>
        <p className="text-lg opacity-90">Définissez vos créneaux d'intervention</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendrier */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#d9534f]" />
              Calendrier des disponibilités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Occupé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm">Non défini</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Créneaux actuels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#5bc0de]" />
              Créneaux configurés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Région Parisienne</h4>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              <p className="text-sm text-gray-600">Lun-Ven: 08h-18h</p>
              <p className="text-sm text-gray-600">Max 3 interventions/jour</p>
              <p className="text-sm text-gray-500">Du 01/01 au 31/12/2024</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Week-end urgences</h4>
                <Badge className="bg-yellow-100 text-yellow-800">Limité</Badge>
              </div>
              <p className="text-sm text-gray-600">Sam-Dim: 09h-17h</p>
              <p className="text-sm text-gray-600">Max 1 intervention/jour</p>
              <p className="text-sm text-gray-500">Du 01/01 au 31/12/2024</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full btn-rofex-primary">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Définir nouveau créneau
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nouveau créneau de disponibilité</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Zones géographiques */}
                    <FormField
                      control={form.control}
                      name="zones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Zones géographiques couvertes
                          </FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              {zones.map((zone) => (
                                <div key={zone} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.includes(zone)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, zone]);
                                      } else {
                                        field.onChange(field.value?.filter((z) => z !== zone));
                                      }
                                    }}
                                  />
                                  <Label className="text-sm">{zone}</Label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Jours disponibles */}
                    <FormField
                      control={form.control}
                      name="days"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jours disponibles</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {days.map((day) => (
                                <div key={day.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={field.value?.includes(day.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, day.id]);
                                      } else {
                                        field.onChange(field.value?.filter((d) => d !== day.id));
                                      }
                                    }}
                                  />
                                  <Label className="text-sm">{day.label}</Label>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Heures */}
                    <div>
                      <Label>Plages horaires</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map((slot) => (
                          <div key={slot} className="flex items-center space-x-2">
                            <Checkbox />
                            <Label className="text-sm">{slot}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de début</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                value={field.value?.toISOString().split('T')[0]}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de fin</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                value={field.value?.toISOString().split('T')[0]}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Capacité */}
                    <FormField
                      control={form.control}
                      name="maxInterventions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre maximum d'interventions par jour</FormLabel>
                          <FormControl>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} intervention{num > 1 ? 's' : ''}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="btn-rofex-primary flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TechnicianAvailability;
