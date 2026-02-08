'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { db } from '@/services/indexeddb';

export default function ScenariosPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    loadScenarios();
  }, [isAuthenticated, router, selectedTheme]);

  const loadScenarios = async () => {
    try {
      const data = await apiService.getScenarios(user?.userGroup, selectedTheme || undefined);
      setScenarios(data);
      
      // Cache scenarios in IndexedDB
      for (const scenario of data) {
        await db.scenarios.put(scenario);
      }
    } catch (error) {
      console.error('Failed to load scenarios:', error);
      
      // Try loading from IndexedDB if offline
      const cached = await db.scenarios
        .where('userGroup')
        .equals(user?.userGroup || '')
        .toArray();
      setScenarios(cached);
    } finally {
      setLoading(false);
    }
  };

  const themes = ['Savings', 'Budgeting', 'Fraud Prevention'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading scenarios...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-primary hover:text-primary/80"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Financial Scenarios</h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Theme
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="block w-full md:w-64 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">All Themes</option>
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <div
                key={scenario.scenarioId}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/scenarios/${scenario.scenarioId}`)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {scenario.theme}
                    </span>
                    <span className={`text-sm font-medium ${
                      scenario.difficulty === 'Easy' ? 'text-green-600' :
                      scenario.difficulty === 'Medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {scenario.context}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {scenarios.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No scenarios found for the selected theme.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
