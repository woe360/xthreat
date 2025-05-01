import React from 'react';
import ShadCnUI from '@/components/svg-components/shadcn-ui';

export const SimulationsComponent = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ShadCnUI 
        className="h-40 w-full" 
        circleText="Sim"
        triangleText="UI"
        diamondText="Config"
        showPersonIcon={true}
        animatedBoxText="Threat"
        hintText=""
        appName="XThreat"
      />
    </div>
  );
}; 