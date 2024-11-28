"use client"

import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Mobile Sidebar Toggle */}
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <AppSidebar className="h-full w-64" />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Overlay for mobile when sidebar is open */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Content Area */}
          <main className="min-h-screen w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}