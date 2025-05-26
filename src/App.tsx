
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/ClientDashboard";
import TechnicianSearch from "./pages/TechnicianSearch";
import TechnicianResults from "./pages/TechnicianResults";
import TechnicianProfile from "./pages/TechnicianProfile";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import TechnicianAvailability from "./pages/TechnicianAvailability";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Client routes */}
            <Route path="/client/dashboard" element={
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/client/create-request" element={<NotFound />} />
            <Route path="/client/search" element={
              <ProtectedRoute requiredRole="client">
                <TechnicianSearch />
              </ProtectedRoute>
            } />
            <Route path="/client/search/results" element={
              <ProtectedRoute requiredRole="client">
                <TechnicianResults />
              </ProtectedRoute>
            } />
            <Route path="/client/technician/:id" element={
              <ProtectedRoute requiredRole="client">
                <TechnicianProfile />
              </ProtectedRoute>
            } />
            <Route path="/client/register" element={<NotFound />} />
            
            {/* Technician routes */}
            <Route path="/technician/register" element={<NotFound />} />
            <Route path="/technician/dashboard" element={
              <ProtectedRoute requiredRole="technicien">
                <TechnicianDashboard />
              </ProtectedRoute>
            } />
            <Route path="/technician/availability" element={
              <ProtectedRoute requiredRole="technicien">
                <TechnicianAvailability />
              </ProtectedRoute>
            } />
            
            {/* Information routes */}
            <Route path="/how-it-works" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/login" element={<NotFound />} />
            <Route path="/register" element={<NotFound />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
