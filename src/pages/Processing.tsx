import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSearch, CheckCircle2, Shield, TrendingUp, Loader2 } from 'lucide-react';
import { ProcessingStep } from '../types';

export const Processing: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps: ProcessingStep[] = [
    { id: '1', label: 'Parsing tender document...', status: 'pending' },
    { id: '2', label: 'Extracting eligibility criteria...', status: 'pending' },
    { id: '3', label: 'Checking vendor documents...', status: 'pending' },
    { id: '4', label: 'Running fraud detection...', status: 'pending' },
    { id: '5', label: 'Scoring vendors...', status: 'pending' },
  ];

  const [stepStatuses, setStepStatuses] = useState<ProcessingStep[]>(steps);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });

      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(prev + 20, 100);
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStepStatuses((prev) =>
      prev.map((step, index) => {
        if (index < currentStep) {
          return { ...step, status: 'completed' };
        } else if (index === currentStep) {
          return { ...step, status: 'processing' };
        }
        return step;
      })
    );

    // Navigate to results when complete
    if (currentStep >= steps.length - 1 && progress >= 100) {
      setTimeout(() => {
        navigate('/evaluations');
      }, 1500);
    }
  }, [currentStep, progress, navigate]);

  const getStepIcon = (status: string) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    } else if (status === 'processing') {
      return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />;
    }
    return <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-900" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Evaluation in Progress</h1>
          <p className="text-gray-600">Please wait while we analyze the tender and vendor bids</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-blue-900">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-900 to-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4 mb-8">
          {stepStatuses.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                step.status === 'processing'
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : step.status === 'completed'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex-shrink-0">{getStepIcon(step.status)}</div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    step.status === 'processing'
                      ? 'text-blue-900'
                      : step.status === 'completed'
                      ? 'text-green-900'
                      : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {step.status === 'completed' && (
                <div className="text-xs text-green-700 font-medium">Completed</div>
              )}
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <FileSearch className="w-6 h-6 text-blue-900 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-700">OCR Processing</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <Shield className="w-6 h-6 text-indigo-700 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-700">Fraud Detection</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-700 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-700">AI Scoring</p>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This process typically takes 2-3 minutes. You'll be redirected automatically.
          </p>
        </div>
      </div>
    </div>
  );
};
