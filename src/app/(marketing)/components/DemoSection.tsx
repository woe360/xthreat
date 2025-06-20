import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
}

interface DemoCard {
  title: string;
  description: string;
  demoPrompt?: string;
  stats?: StatItem[];
  icon?: React.ReactNode;
  isLearningCard?: boolean;
  isSimulationsCard?: boolean;
}

// SIMPLIFIED MICROLEARNING COMPONENT WITH SHIELD
const SimplifiedLearningProgress: React.FC<{ isHovering: boolean }> = ({ isHovering }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);
  const totalBlocks = 5;

  useEffect(() => {
    if (!isHovering || isComplete) return;
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        const block = Math.min(Math.ceil(newProgress / (100 / totalBlocks)), totalBlocks);
        setActiveBlock(block);
        if (newProgress >= 100) {
          setIsComplete(true);
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isHovering, isComplete]);

  useEffect(() => {
    if (!isHovering && !isComplete) {
      setProgress(0);
      setActiveBlock(0);
    }
  }, [isHovering, isComplete]);

  useEffect(() => {
    if (!isHovering && isComplete) {
      const timeout = setTimeout(() => {
        setIsComplete(false);
        setProgress(0);
        setActiveBlock(0);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [isHovering, isComplete]);

  // Minimalist block dimensions
  const blockWidth = 28;
  const blockHeight = 36;
  const blockGap = 12;
  const blockY = 44;
  const blockXStart = 10;
  const svgWidth = blockXStart * 2 + totalBlocks * blockWidth + (totalBlocks - 1) * blockGap;
  const svgHeight = 100;
  const accent = "rgba(147, 51, 234, 0.7)";
  const accentStroke = "rgba(147, 51, 234, 0.9)";
  const outline = "rgba(255,255,255,0.13)";

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-56 h-28">
        {/* Minimal checkmark above blocks when complete */}
        {isComplete && (
          <motion.path
            d={`M${blockXStart + 2},28 L${blockXStart + blockWidth / 2 + 2},${blockY - 10} L${blockXStart + blockWidth * 2.5 + blockGap * 1.5},14`}
            fill="none"
            stroke={accentStroke}
            strokeWidth="2.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7 }}
          />
        )}
        {/* Minimalist building blocks */}
        {[...Array(totalBlocks)].map((_, i) => {
          const isFilled = activeBlock > i || isComplete;
          return (
            <motion.rect
              key={i}
              x={blockXStart + i * (blockWidth + blockGap)}
              y={blockY}
              width={blockWidth}
              height={blockHeight}
              rx={7}
              fill={isFilled ? accent : "none"}
              stroke={isFilled ? accentStroke : outline}
              strokeWidth={1.5}
              initial={{ fill: "none" }}
              animate={{ fill: isFilled ? accent : "none" }}
              transition={{ duration: 0.32, delay: isHovering && isFilled ? i * 0.09 : 0 }}
            />
          );
        })}
      </svg>
      <p className="text-gray-400 text-base mt-3 min-h-[1.5em]">
        {isComplete ? "Module Complete" : ""}
      </p>
    </div>
  );
};

// SIMPLIFIED PHISHING SIMULATION COMPONENT
const SimplifiedSimulations: React.FC<{ isHovering: boolean }> = ({ isHovering }) => {
  const [step, setStep] = useState(0); // Start at step 0, will be set by useEffect

  // Set initial "opened email" state (up to step 4)
  useEffect(() => {
    setStep(4); // Draw browser, address bar, email header, body, button
  }, []); // Runs once on mount
  
  // Phishing detection animation (step 5) on hover
  useEffect(() => {
    if (isHovering) {
      setStep(5); // Trigger phishing detection visuals
    } else {
      setStep(4); // Revert to "opened email" state (step 4) without warnings
    }
  }, [isHovering]); // Rerun effect only when hover state changes

  return (
    <div className="flex items-center justify-center h-full">
      <motion.svg 
        viewBox="0 0 350 177" // User's viewBox
        className="w-full h-full"
      >
        {/* Browser window outline - User's dimensions */}
        <motion.rect
          x="7" y="7" width="325" height="170" rx="2" // User's main rect dimensions
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.4" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Window Control Buttons - Scaled and Repositioned */}
        <motion.circle cx="24" cy="26" r="4" fill="rgba(255,255,255,0.2)" initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }} transition={{ delay: 0.2 }} />
        <motion.circle cx="41" cy="26" r="4" fill="rgba(255,255,255,0.2)" initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }} transition={{ delay: 0.3 }} />
        <motion.circle cx="58" cy="26" r="4" fill="rgba(255,255,255,0.2)" initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }} transition={{ delay: 0.4 }} />
        
        {/* Address bar rectangle - Scaled and Repositioned */}
        <motion.rect
          x="75" y="20" width="248" height="15" rx="3"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Fake text lines in address bar - Scaled and Repositioned */}
        <motion.path
          d="M84,28 h188 M84,32 h171" // User's previous second h was 100, now scaled from that
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        
        {/* Lock icon (broken) - Scaled and Repositioned */}
        <motion.path
          d="M298,28 m-4,-4 a4,4 0 1 0 8,0 a4,4 0 1 0 -8,0 M298,28 v4"
          fill="none"
          stroke={step >= 5 ? "rgba(255,70,70,0.6)" : "rgba(255,255,255,0.3)"}
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
        
        {/* Email header separator line - Scaled and Repositioned */}
        <motion.path
          d="M24,54 h291"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* From: field line - Scaled and Repositioned */}
        <motion.path
          d="M33,66 h171"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />

        {/* Subject: field line - Scaled and Repositioned */}
        <motion.path
          d="M33,77 h205"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        
        {/* Email body text lines - Scaled and Repositioned */}
        <motion.path
          d="M33,96 h274 M33,107 h257 M33,118 h265 M33,130 h240"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 4 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* "Click Here" button - Scaled and Repositioned */}
        <motion.rect
          x="118" y="145" width="103" height="19" rx="4"
          fill="none"
          stroke={step >= 5 ? "rgba(255,70,70,0.6)" : "rgba(255,255,255,0.3)"}
          strokeWidth="0.4" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 4 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        
        {/* Text in button "Click Here" - Scaled and Repositioned */}
        <motion.path
          d="M127,154 h86"
          stroke={step >= 5 ? "rgba(255,70,70,0.6)" : "rgba(255,255,255,0.3)"}
          strokeWidth="0.3" // Kept thin
          initial={{ pathLength: 0 }}
          animate={{ pathLength: step >= 4 ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
        
        {/* Warning symbol - Scaled and Repositioned */}
        {step >= 5 && (
          <>
            <motion.circle
              cx="306" cy="154" r="16"
              fill="none"
              stroke="rgba(255,70,70,0.6)"
              strokeWidth="0.6" // Kept thin
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M306,147 v11 M306,164 v-2"
              stroke="rgba(255,70,70,0.8)"
              strokeWidth="0.6" // Kept thin
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
          </>
        )}
        
        {/* Phishing trap text - Scaled and Repositioned */}
        <motion.text
          x="170" y="170" // Adjusted position for new scale
          fontSize="11px" // Scaled font size
          fill={step >= 5 ? "rgba(255,70,70,0.8)" : "transparent"}
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 5 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          PHISHING TRAP DETECTED
        </motion.text>
      </motion.svg>
    </div>
  );
};

// SIMPLIFIED ANALYTICS COMPONENT - Line Chart with Milestone
const SimplifiedAnalytics: React.FC<{ isHovering: boolean }> = ({ isHovering }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(isHovering);
  }, [isHovering]);

  // Define the points for the line chart path (upward trend)
  const linePath = "M30,80 C50,70 80,40 110,30 C140,20 170,25 190,20";
  const finalPoint = { x: 190, y: 20 }; // Coordinates of the last point
  const dimColor = "rgba(255,255,255,0.1)";
  const activeColor = "rgba(147, 51, 234, 0.6)";
  const pointColor = "rgba(147, 51, 234, 0.8)";

  return (
    <div 
      className="relative w-full h-[200px] flex items-center justify-center"
    >
      <svg viewBox="0 0 220 100" className="w-full h-full">
        {/* Y Axis */}
        <path d="M20,10 V90" stroke={dimColor} strokeWidth="0.5" />
        {/* X Axis */}
        <path d="M20,90 H200" stroke={dimColor} strokeWidth="0.5" />

        {/* Data Line - Always visible, color changes on hover */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={dimColor} // Start with dim color
          strokeWidth="1.5"
          initial={{ pathLength: 1 }} // Draw fully initially
          animate={{
            stroke: isAnimating ? activeColor : dimColor, // Animate color
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }} // Color transition
        />

        {/* Point at the end of the line - Appears on hover */}
        <motion.circle
          cx={finalPoint.x}
          cy={finalPoint.y}
          r="3"
          fill={pointColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isAnimating ? 1 : 0, opacity: isAnimating ? 1 : 0 }}
          transition={{ delay: isAnimating ? 0.2 : 0, duration: 0.3 }} // Appears slightly after line color change
        />
         {/* Point at the beginning - Appears on hover */}
        <motion.circle
          cx="30" // Start x of linePath
          cy="80" // Start y of linePath
          r="2"
          fill={pointColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isAnimating ? 1 : 0, opacity: isAnimating ? 0.7 : 0 }}
          transition={{ delay: isAnimating ? 0.1 : 0, duration: 0.3 }}
        />

        {/* Milestone Text - Appears on hover */}
        <motion.text
          x={finalPoint.x} 
          y={finalPoint.y - 10} // Position above the final point
          fontSize="8px" 
          fill={activeColor} 
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 1 : 0 }}
          transition={{ delay: isAnimating ? 0.5 : 0, duration: 0.4 }} // Appear after points
        >
          Milestone Achieved
        </motion.text>

      </svg>

    </div>
  );
};

// EXPORT THE SIMPLIFIED COMPONENTS
export const SimulationsComponent = SimplifiedSimulations;

// Define props type for DemoCard
interface DemoCardProps {
  title: string;
  description: string;
  isLearningCard?: boolean;
  isSimulationsCard?: boolean;
}

// MODIFIED DEMO CARD WITH HOVER DETECTION
const DemoCard: React.FC<DemoCardProps> = ({ title, description, isLearningCard = false, isSimulationsCard = false }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 border-l border-gray-600/40 transition-all group"
    >
      <h3 className="text-2xl font-normal text-white mb-3">{title}</h3>
      <p className="text-neutral-400 mb-8">{description}</p>
      
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="rounded-lg transition-colors">
          {isLearningCard ? (
            <SimplifiedLearningProgress isHovering={isHovering} />
          ) : isSimulationsCard ? (
            <SimplifiedSimulations isHovering={isHovering} />
          ) : title === "Analytics" ? (
            <SimplifiedAnalytics isHovering={isHovering} />
          ) : (
            <div>Fallback Content</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// EXPORT THE DEMO SECTION COMPONENT
export const DemoSection = () => {
  return (
    <section className="py-24 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-16">
          <h2 className="text-5xl font-normal mb-4">
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