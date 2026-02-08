'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { db } from '@/services/indexeddb';
import { SyncService } from '@/services/sync';
import { v4 as uuidv4 } from 'uuid';

export default function ScenarioDetailPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    loadScenario();
  }, [isAuthenticated, router, scenarioId]);

  const loadScenario = async () => {
    try {
      const data = await apiService.getScenarios(user?.userGroup);
      const found = data.find((s: any) => s.scenarioId === scenarioId);
      setScenario(found);
    } catch (error) {
      console.error('Failed to load scenario:', error);
      
      // Try loading from IndexedDB
      const cached = await db.scenarios.get(scenarioId);
      setScenario(cached);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = async (choiceId: string) => {
    if (submitting) return;
    
    setSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const clientEventId = uuidv4();

    try {
      const result = await apiService.submitDecision({
        scenarioId,
        choiceId,
        clientEventId,
        timestamp: new Date().toISOString(),
        timeSpent
      });

      setFeedback(result);
    } catch (error: any) {
      console.error('Failed to submit decision:', error);
      
      // Queue for offline sync
      await db.decisions.add({
        clientEventId,
        userId: user!.userId,
        scenarioId,
        choiceId,
        timestamp: new Date().toISOString(),
        timeSpent,
        synced: false,
        createdAt: new Date().toISOString()
      });

      // Trigger background sync
      await SyncService.registerSync();

      // Show offline feedback
      setFeedback({
        feedback: {
          message: 'Decision saved offline. Will sync when online.',
          type: 'Neutral',
          visualCue: 'yellow'
        },
        scoreChange: 0
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading scenario...</p>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Scenario not found</p>
          <button
            onClick={() => router.push('/scenarios')}
            className="text-primary hover:text-primary/80"
          >
            Back to Scenarios
          </button>
        </div>
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
                onClick={() => router.push('/scenarios')}
                className="text-primary hover:text-primary/80"
              >
                ← Back to Scenarios
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {!feedback ? (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {scenario.theme}
                </span>
                <span className={`ml-2 text-sm font-medium ${
                  scenario.difficulty === 'Easy' ? 'text-green-600' :
                  scenario.difficulty === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {scenario.difficulty}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {scenario.title}
              </h1>

              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {scenario.context}
              </p>

              {scenario.culturalContext && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    💡 {scenario.culturalContext}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  What will you do?
                </h2>
                {scenario.choices.map((choice: any) => (
                  <button
                    key={choice.choiceId}
                    onClick={() => handleChoice(choice.choiceId)}
                    disabled={submitting}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-start">
                      {choice.icon && (
                        <span className="text-2xl mr-3">{choice.icon}</span>
                      )}
                      <span className="text-gray-900">{choice.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <div className={`text-center mb-6 p-6 rounded-lg ${
                feedback.feedback.visualCue === 'green' ? 'bg-green-50' :
                feedback.feedback.visualCue === 'red' ? 'bg-red-50' :
                'bg-yellow-50'
              }`}>
                <div className="text-4xl mb-4">
                  {feedback.feedback.visualCue === 'green' ? '✅' :
                   feedback.feedback.visualCue === 'red' ? '❌' : '⚠️'}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {feedback.feedback.type} Decision
                </h2>
                <p className={`text-lg ${
                  feedback.feedback.visualCue === 'green' ? 'text-green-700' :
                  feedback.feedback.visualCue === 'red' ? 'text-red-700' :
                  'text-yellow-700'
                }`}>
                  Score Change: {feedback.scoreChange > 0 ? '+' : ''}{feedback.scoreChange}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Feedback</h3>
                <p className="text-gray-700">{feedback.feedback.message}</p>
              </div>

              {feedback.feedback.tips && feedback.feedback.tips.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Tips</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {feedback.feedback.tips.map((tip: string, index: number) => (
                      <li key={index} className="text-gray-700">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.badgesEarned && feedback.badgesEarned.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">🎉 New Badge Earned!</h3>
                  {feedback.badgesEarned.map((badge: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <span className="text-2xl mr-2">{badge.icon}</span>
                      <div>
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/scenarios')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  More Scenarios
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  View Progress
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
