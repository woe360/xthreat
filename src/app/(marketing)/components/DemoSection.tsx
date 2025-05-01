import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Trophy, BookOpen, Check, TrendingUp, TrendingDown } from 'lucide-react';
import { SimulationsComponent } from './SimulationsComponent';

interface StatItem {
  label: string;
  value: string;
}

interface DemoCardProps {
  title: string;
  description: string;
  demoPrompt?: string;
  stats?: StatItem[];
  icon?: React.ReactNode;
  isLearningCard?: boolean;
  isSimulationsCard?: boolean;
}

const LearningProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [isComplete]);

  useEffect(() => {
    if (!isComplete) {
      const stepTimer = setInterval(() => {
        setCurrentStep(prev => (prev % 3) + 1);
      }, 2000);
      return () => clearInterval(stepTimer);
    }
  }, [isComplete]);

  const steps = [
    "Understanding Phishing Patterns",
    "Identifying Suspicious Elements",
    "Practice Scenarios"
  ];

  return (
    <div className="space-y-4">
      {!isComplete ? (
        <>
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Current Progress</span>
            <span className="text-gray-200 font-medium">{progress}%</span>
          </div>
          <div className="h-1.5  rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500/50 to-blue-500/50"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="pt-2">
            <div className="text-sm text-gray-400">
              Step {currentStep}: {steps[currentStep - 1]}
            </div>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className={`h-1 flex-1 rounded-full ${
                    step === currentStep ? 'bg-purple-500/50' : ''
                  }`}
                  animate={{
                    backgroundColor: step === currentStep ? 'rgba(168, 85, 247, 0.5)' : 'rgba(26, 26, 26, 1)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3"
          >
            <Check className="w-5 h-5 text-purple-400" />
          </motion.div>
          <p className="text-gray-200 font-medium text-sm">Module Complete!</p>
          <p className="text-gray-400 text-xs mt-1">Great job on mastering phishing prevention</p>
        </motion.div>
      )}
    </div>
  );
};

const SkillsTriangle = () => {
  const [metrics, setMetrics] = useState({
    awareness: 85,
    phishing: 78,
    compliance: 92,
    passwords: 88,
    devices: 82,
    privacy: 75,
    reporting: 89
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        awareness: Math.min(100, Math.max(50, prev.awareness + (Math.random() > 0.5 ? 1 : -1))),
        phishing: Math.min(100, Math.max(50, prev.phishing + (Math.random() > 0.5 ? 1 : -1))),
        compliance: Math.min(100, Math.max(50, prev.compliance + (Math.random() > 0.5 ? 1 : -1))),
        passwords: Math.min(100, Math.max(50, prev.passwords + (Math.random() > 0.5 ? 1 : -1))),
        devices: Math.min(100, Math.max(50, prev.devices + (Math.random() > 0.5 ? 1 : -1))),
        privacy: Math.min(100, Math.max(50, prev.privacy + (Math.random() > 0.5 ? 1 : -1))),
        reporting: Math.min(100, Math.max(50, prev.reporting + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getPoint = (value: number, index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = (value / 200) * 40 + 10; // Scale from 0-100 to 10-50
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return `${x},${y}`;
  };

  const getPathD = (metrics: Record<string, number>) => {
    const values = Object.values(metrics);
    return values.map((value, i) => {
      const point = getPoint(value, i, values.length);
      return i === 0 ? `M ${point}` : `L ${point}`;
    }).join(' ') + ' Z';
  };

  const getGridPathD = (level: number) => {
    const radius = level * 10 + 10; // 10, 20, 30, 40, 50
    return Array.from({ length: 7 }).map((_, i) => {
      const point = getPoint(radius * 2, i, 7);
      return i === 0 ? `M ${point}` : `L ${point}`;
    }).join(' ') + ' Z';
  };

  return (
    <div className="relative w-full h-[200px] flex items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full absolute"
      >
        {/* Grid Lines */}
        {[1, 2, 3, 4].map((level) => (
          <path
            key={level}
            d={getGridPathD(level)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Axis Lines */}
        {Object.values(metrics).map((_, i) => {
          const point = getPoint(80, i, 7);
          return (
            <path
              key={i}
              d={`M 50,50 L ${point}`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Animated Skills Shape */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ 
            d: getPathD(metrics)
          }}
          transition={{ duration: 0.5 }}
          fill="rgba(147, 51, 234, 0.2)"
          stroke="rgba(147, 51, 234, 0.5)"
          strokeWidth="1"
        />

        {/* Points */}
        {Object.entries(metrics).map(([key, value], i) => {
          const point = getPoint(value, i, 7);
          const [x, y] = point.split(',');
          return (
            <motion.circle
              key={key}
              cx={x}
              cy={y}
              r="1.5"
              fill="rgba(147, 51, 234, 0.8)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Labels */}
      {Object.entries(metrics).map(([key, value], i) => {
        const angle = (i / 7) * 2 * Math.PI - Math.PI / 2;
        const radius = 45;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        const textAnchor = x > 50 ? "start" : x < 50 ? "end" : "middle";
        const dy = y > 50 ? "0.8em" : y < 50 ? "-0.5em" : "0.3em";
        return (
          <div
            key={key}
            className="absolute text-[10px] text-neutral-400"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              width: '60px',
              textAlign: 'center'
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </div>
        );
      })}
    </div>
  );
};

const DemoCard: React.FC<DemoCardProps> = ({ title, description, demoPrompt, stats, icon, isLearningCard, isSimulationsCard }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 border-l border-gray-600/40 transition-all group"
    >
      <h3 className="text-xl font-normal text-white mb-3">{title}</h3>
      <p className="text-neutral-400 mb-8">{description}</p>
      
      <div className="relative">
        <div className="bg-[#0d0f15] rounded-lg p-5 group-hover:bg-[#161616] transition-colors">
          {isLearningCard ? (
            <LearningProgress />
          ) : isSimulationsCard ? (
            <SimulationsComponent />
          ) : title === "Analytics" ? (
            <SkillsTriangle />
          ) : stats ? (
            <div className="space-y-3">
              {stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-gray-200 font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500/50 animate-pulse"></div>
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{demoPrompt}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const DemoSection: React.FC = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-16">
          <h2 className="text-4xl font-normal mb-4">
            Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DemoCard
            title="Microlearning"
            description="Bite-sized, interactive lessons that make security training engaging and memorable for your team."
            isLearningCard={true}
          />
          
          <DemoCard
            title="Simulations"
            description="Interactive security simulations that test and improve your team's ability to detect and respond to threats."
            isSimulationsCard={true}
          />
          
          <DemoCard
            title="Analytics"
            description="Comprehensive insights into your organization's security awareness progress and vulnerabilities."
          />
        </div>
      </div>
    </section>
  );
};

export default DemoSection; 