// "use client";

// import createGlobe, { COBEOptions } from "cobe";
// import { useCallback, useEffect, useRef, useState } from "react";

// import { cn } from "@/lib/utils";

// const GLOBE_CONFIG: COBEOptions = {
//   width: 200,
//   height: 200,
//   onRender: () => {},
//   devicePixelRatio: 2,
//   phi: 0,
//   theta: 0.3,
//   dark: 1,
//   diffuse: 0.8,
//   mapSamples: 16000,
//   mapBrightness: 1.2,
//   baseColor: [1, 1, 1],
//   markerColor: [251 / 255, 100 / 255, 21 / 255],
//   glowColor: [0.4, 0.4, 0.4],
//   markers: [
//     { location: [14.5995, 120.9842], size: 0.03 },
//     { location: [19.076, 72.8777], size: 0.1 },
//     { location: [23.8103, 90.4125], size: 0.05 },
//     { location: [30.0444, 31.2357], size: 0.07 },
//     { location: [39.9042, 116.4074], size: 0.08 },
//     { location: [-23.5505, -46.6333], size: 0.1 },
//     { location: [19.4326, -99.1332], size: 0.1 },
//     { location: [40.7128, -74.006], size: 0.1 },
//     { location: [34.6937, 135.5022], size: 0.05 },
//     { location: [41.0082, 28.9784], size: 0.06 },
//   ],
// };

// export default function Globe({
//   className,
//   config = GLOBE_CONFIG,
// }: {
//   className?: string;
//   config?: COBEOptions;
// }) {
//   let phi = 0;
//   let width = 0;
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const pointerInteracting = useRef(null);
//   const pointerInteractionMovement = useRef(0);
//   const [r, setR] = useState(0);

//   const updatePointerInteraction = (value: any) => {
//     pointerInteracting.current = value;
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = value ? "grabbing" : "grab";
//     }
//   };

//   const updateMovement = (clientX: any) => {
//     if (pointerInteracting.current !== null) {
//       const delta = clientX - pointerInteracting.current;
//       pointerInteractionMovement.current = delta;
//       setR(delta / 200);
//     }
//   };

//   const onRender = useCallback(
//     (state: Record<string, any>) => {
//       if (!pointerInteracting.current) phi += 0.005;
//       state.phi = phi + r;
//       state.width = width * 2;
//       state.height = width * 2;
//     },
//     [r],
//   );

//   const onResize = () => {
//     if (canvasRef.current) {
//       width = canvasRef.current.offsetWidth;
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("resize", onResize);
//     onResize();

//     const globe = createGlobe(canvasRef.current!, {
//       ...config,
//       width: width * 2,
//       height: width * 2,
//       onRender,
//     });

//     setTimeout(() => (canvasRef.current!.style.opacity = "1"));
//     return () => globe.destroy();
//   }, []);

//   return (
//     <div
//       className={cn(
//         "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[400px]",
//         className,
//       )}
//     >
//       <canvas
//         className={cn(
//           "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
//         )}
//         ref={canvasRef}
//         onPointerDown={(e) =>
//           updatePointerInteraction(
//             e.clientX - pointerInteractionMovement.current,
//           )
//         }
//         onPointerUp={() => updatePointerInteraction(null)}
//         onPointerOut={() => updatePointerInteraction(null)}
//         onMouseMove={(e) => updateMovement(e.clientX)}
//         onTouchMove={(e) =>
//           e.touches[0] && updateMovement(e.touches[0].clientX)
//         }
//       />
//     </div>
//   );
// }



// "use client";

// import createGlobe, { COBEOptions } from "cobe";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { cn } from "@/lib/utils";

// const DEFAULT_MARKERS = [
//   { location: [14.5995, 120.9842], size: 0.03 },
//   { location: [19.076, 72.8777], size: 0.1 },
//   { location: [23.8103, 90.4125], size: 0.05 },
//   { location: [30.0444, 31.2357], size: 0.07 },
//   { location: [39.9042, 116.4074], size: 0.08 },
//   { location: [-23.5505, -46.6333], size: 0.1 },
//   { location: [19.4326, -99.1332], size: 0.1 },
//   { location: [40.7128, -74.006], size: 0.1 },
//   { location: [34.6937, 135.5022], size: 0.05 },
//   { location: [41.0082, 28.9784], size: 0.06 },
// ];

// const GLOBE_CONFIG: COBEOptions = {
//   width: 200,
//   height: 200,
//   onRender: () => {},
//   devicePixelRatio: 2,
//   phi: 0,
//   theta: 0.3,
//   dark: 1,
//   diffuse: 0.8,
//   mapSamples: 16000,
//   mapBrightness: 1.2,
//   baseColor: [1, 1, 1],
//   markerColor: [251 / 255, 100 / 255, 21 / 255],
//   glowColor: [0.4, 0.4, 0.4],
//   markers: DEFAULT_MARKERS,
// };

// function latLongToVector3(lat: number, lon: number) {
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lon + 180) * (Math.PI / 180);
//   const x = -Math.sin(phi) * Math.cos(theta);
//   const z = Math.sin(phi) * Math.sin(theta);
//   const y = Math.cos(phi);
//   return [x, y, z];
// }

// function slerp(start: number[], end: number[], t: number) {
//   const dot = start[0] * end[0] + start[1] * end[1] + start[2] * end[2];
//   const theta = Math.acos(Math.min(Math.max(dot, -1), 1));
  
//   if (Math.abs(theta) < 1e-6) return start;
  
//   const w1 = Math.sin((1 - t) * theta) / Math.sin(theta);
//   const w2 = Math.sin(t * theta) / Math.sin(theta);
  
//   const result = [
//     w1 * start[0] + w2 * end[0],
//     w1 * start[1] + w2 * end[1],
//     w1 * start[2] + w2 * end[2]
//   ];
  
//   const magnitude = Math.sqrt(result[0]**2 + result[1]**2 + result[2]**2);
//   return result.map(v => v / magnitude);
// }

// function vector3ToLatLong(v: number[]) {
//   const lat = 90 - (Math.acos(v[1]) * 180 / Math.PI);
//   const lon = (Math.atan2(v[2], -v[0]) * 180 / Math.PI) - 180;
//   return [lat, lon];
// }

// class Beam {
//   start: number[];
//   end: number[];
//   progress: number;
//   speed: number;
//   trail: number[][];
//   controlPoint: number[];

//   constructor(start: number[], end: number[], speed: number) {
//     this.start = start;
//     this.end = end;
//     this.progress = 0;
//     this.speed = speed;
//     this.trail = [];
//     this.controlPoint = this.generateControlPoint();
//   }

//   generateControlPoint() {
//     const midPoint = slerp(this.start, this.end, 0.5);
//     const perpVector = [
//       midPoint[1] * this.start[2] - midPoint[2] * this.start[1],
//       midPoint[2] * this.start[0] - midPoint[0] * this.start[2],
//       midPoint[0] * this.start[1] - midPoint[1] * this.start[0]
//     ];
//     const magnitude = Math.sqrt(perpVector[0]**2 + perpVector[1]**2 + perpVector[2]**2);
//     const normalizedPerp = perpVector.map(v => v / magnitude);
//     const controlFactor = 0.3 + Math.random() * 0.4; // Random curve intensity
//     return midPoint.map((v, i) => v + normalizedPerp[i] * controlFactor);
//   }

//   // update() {
//   //   this.progress += this.speed;
//   //   const position = this.getPosition();
//   //   this.trail.push(position);
//   //   if (this.trail.length > 100) {
//   //     this.trail.shift();
//   //   }
//   //   return this.progress <= 1;
//   // }
//   update() {
//     this.progress += this.speed;
//     if (this.progress > 1) {
//       this.progress = 1; // Clamp progress to 1
//     }
//     const position = this.getPosition();
//     this.trail.push(position);
//     if (this.trail.length > 100) {
//       this.trail.shift();
//     }
//     return this.progress < 1; // Return false when the beam reaches its destination
//   }


//   // getPosition() {
//   //   const t = this.progress;
//   //   const p0 = slerp(this.start, this.controlPoint, t);
//   //   const p1 = slerp(this.controlPoint, this.end, t);
//   //   return slerp(p0, p1, t);
//   // }
//   getPosition() {
//     const t = this.progress;
//     const p0 = slerp(this.start, this.controlPoint, t);
//     const p1 = slerp(this.controlPoint, this.end, t);
//     const pos = slerp(p0, p1, t);
//     // Normalize the position to ensure it's on the globe's surface
//     const magnitude = Math.sqrt(pos[0]**2 + pos[1]**2 + pos[2]**2);
//     return pos.map(v => v / magnitude);
//   }
// }

// export default function Globe({
//   className,
//   config = GLOBE_CONFIG,
// }: {
//   className?: string;
//   config?: COBEOptions;
// }) {
//   let phi = 0;
//   let width = 0;
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
//   const pointerInteracting = useRef(null);
//   const pointerInteractionMovement = useRef(0);
//   const [r, setR] = useState(0);
//   const beamsRef = useRef<Beam[]>([]);
//   const lastBeamTimeRef = useRef(0);

//   const updatePointerInteraction = (value: any) => {
//     pointerInteracting.current = value;
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = value ? "grabbing" : "grab";
//     }
//   };

//   const updateMovement = (clientX: any) => {
//     if (pointerInteracting.current !== null) {
//       const delta = clientX - pointerInteracting.current;
//       pointerInteractionMovement.current = delta;
//       setR(delta / 200);
//     }
//   };

//   const onRender = useCallback(
//     (state: Record<string, any>) => {
//       if (!pointerInteracting.current) phi += 0.005;
//       state.phi = phi + r;
//       state.width = width * 2;
//       state.height = width * 2;
//     },
//     [r]
//   );

//   const createBeam = useCallback(() => {
//     const markers = config.markers || DEFAULT_MARKERS;
//     if (markers.length === 0) {
//       console.warn('No markers available for beam creation');
//       return;
//     }
//     const start = markers[Math.floor(Math.random() * markers.length)].location;
//     let end;
//     do {
//       end = markers[Math.floor(Math.random() * markers.length)].location;
//     } while (end === start);

//     const startVector = latLongToVector3(start[0], start[1]);
//     const endVector = latLongToVector3(end[0], end[1]);
//     const speed = 0.001 + Math.random() * 0.002;

//     beamsRef.current.push(new Beam(startVector, endVector, speed));
//   }, [config.markers]);

//   const drawBeams = useCallback(() => {
//     const canvas = overlayCanvasRef.current;
//     if (!canvas) return;

//     const context = canvas.getContext('2d');
//     if (!context) return;

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.save();

//     const currentTime = Date.now();
//     if (currentTime - lastBeamTimeRef.current > 100 && beamsRef.current.length < 35) {
//       createBeam();
//       lastBeamTimeRef.current = currentTime;
//     }

//     beamsRef.current = beamsRef.current.filter(beam => {
//       if (beam.progress >= 1) return false;  // Remove beam if it has reached its target

//       context.beginPath();
//       beam.trail.forEach((position, index) => {
//         const [lat, lon] = vector3ToLatLong(position);
//         const x = (lon + 180) * (canvas.width / 360);
//         const y = (90 - lat) * (canvas.height / 180);

//         if (index === 0) {
//           context.moveTo(x, y);
//         } else {
//           context.lineTo(x, y);
//         }
//       });

//       context.strokeStyle = `rgba(255, 100, 0, ${0.7 * (1 - beam.progress)})`;
//       context.lineWidth = 2;
//       context.stroke();

//       const headPosition = beam.getPosition();
//       const [headLat, headLon] = vector3ToLatLong(headPosition);
//       const headX = (headLon + 180) * (canvas.width / 360);
//       const headY = (90 - headLat) * (canvas.height / 180);

//       context.beginPath();
//       context.arc(headX, headY, 3, 0, 2 * Math.PI);
//       context.fillStyle = `rgba(255, 100, 0, ${1 - beam.progress})`;
//       context.fill();

//       return beam.update();
//     });

//     context.restore();

//     requestAnimationFrame(drawBeams);
//   }, [createBeam]);

//   const onResize = () => {
//     if (canvasRef.current) {
//       width = canvasRef.current.offsetWidth;
//       if (overlayCanvasRef.current) {
//         overlayCanvasRef.current.width = width * 2;
//         overlayCanvasRef.current.height = width * 2;
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("resize", onResize);
//     onResize();

//     const globe = createGlobe(canvasRef.current!, {
//       ...config,
//       width: width * 2,
//       height: width * 2,
//       onRender,
//     });

//     drawBeams();

//     setTimeout(() => {
//       if (canvasRef.current) canvasRef.current.style.opacity = "1";
//       if (overlayCanvasRef.current) overlayCanvasRef.current.style.opacity = "1";
//     });

//     return () => {
//       globe.destroy();
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   return (
//     <div
//       className={cn(
//         "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[400px]",
//         className
//       )}
//     >
//       <canvas
//         className={cn(
//           "absolute inset-0 size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
//         )}
//         ref={canvasRef}
//         onPointerDown={(e) =>
//           updatePointerInteraction(
//             e.clientX - pointerInteractionMovement.current
//           )
//         }
//         onPointerUp={() => updatePointerInteraction(null)}
//         onPointerOut={() => updatePointerInteraction(null)}
//         onMouseMove={(e) => updateMovement(e.clientX)}
//         onTouchMove={(e) =>
//           e.touches[0] && updateMovement(e.touches[0].clientX)
//         }
//       />
//       <canvas
//         className={cn(
//           "absolute inset-0 size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] pointer-events-none"
//         )}
//         ref={overlayCanvasRef}
//       />
//     </div>
//   );
// }


"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_MARKERS = [
  { location: [14.5995, 120.9842], size: 0.03 },
  { location: [19.076, 72.8777], size: 0.1 },
  { location: [23.8103, 90.4125], size: 0.05 },
  { location: [30.0444, 31.2357], size: 0.07 },
  { location: [39.9042, 116.4074], size: 0.08 },
  { location: [-23.5505, -46.6333], size: 0.1 },
  { location: [19.4326, -99.1332], size: 0.1 },
  { location: [40.7128, -74.006], size: 0.1 },
  { location: [34.6937, 135.5022], size: 0.05 },
  { location: [41.0082, 28.9784], size: 0.06 },
];

const GLOBE_CONFIG: COBEOptions = {
  width: 200,
  height: 200,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.8,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [0.4, 0.4, 0.4],
  markers: DEFAULT_MARKERS,
};

function latLongToVector3(lat: number, lon: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -Math.sin(phi) * Math.cos(theta);
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);
  return [x, y, z];
}

function vector3ToLatLong(v: number[]) {
  const lat = 90 - (Math.acos(v[1]) * 180 / Math.PI);
  const lon = (Math.atan2(v[2], -v[0]) * 180 / Math.PI) - 180;
  return [lat, lon];
}

function greatCircleInterpolate(start: number[], end: number[], t: number) {
  const dot = start[0] * end[0] + start[1] * end[1] + start[2] * end[2];
  const theta = Math.acos(Math.min(Math.max(dot, -1), 1));
  const sin_theta = Math.sin(theta);

  if (sin_theta === 0) return start;

  const a = Math.sin((1 - t) * theta) / sin_theta;
  const b = Math.sin(t * theta) / sin_theta;

  const x = a * start[0] + b * end[0];
  const y = a * start[1] + b * end[1];
  const z = a * start[2] + b * end[2];

  const magnitude = Math.sqrt(x*x + y*y + z*z);
  return [x/magnitude, y/magnitude, z/magnitude];
}

class Beam {
  start: number[];
  end: number[];
  progress: number;
  speed: number;
  trail: number[][];

  constructor(start: number[], end: number[], speed: number) {
    this.start = start;
    this.end = end;
    this.progress = 0;
    this.speed = speed;
    this.trail = [];
  }

  update() {
    this.progress += this.speed;
    if (this.progress > 1) {
      this.progress = 1;
    }
    const position = this.getPosition();
    this.trail.push(position);
    if (this.trail.length > 100) {
      this.trail.shift();
    }
    return this.progress < 1;
  }

  getPosition() {
    return greatCircleInterpolate(this.start, this.end, this.progress);
  }
}

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const beamsRef = useRef<Beam[]>([]);
  const lastBeamTimeRef = useRef(0);

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  const createBeam = useCallback(() => {
    const markers = config.markers || DEFAULT_MARKERS;
    if (markers.length === 0) {
      console.warn('No markers available for beam creation');
      return;
    }
    const start = markers[Math.floor(Math.random() * markers.length)].location;
    let end;
    do {
      end = markers[Math.floor(Math.random() * markers.length)].location;
    } while (end === start);

    const startVector = latLongToVector3(start[0], start[1]);
    const endVector = latLongToVector3(end[0], end[1]);
    const speed = 0.005 + Math.random() * 0.005;

    beamsRef.current.push(new Beam(startVector, endVector, speed));
  }, [config.markers]);

  const drawBeams = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    const currentTime = Date.now();
    if (currentTime - lastBeamTimeRef.current > 100 && beamsRef.current.length < 35) {
      createBeam();
      lastBeamTimeRef.current = currentTime;
    }

    beamsRef.current = beamsRef.current.filter(beam => {
      context.beginPath();
      beam.trail.forEach((position, index) => {
        const [lat, lon] = vector3ToLatLong(position);
        const x = (lon + 180) * (canvas.width / 360);
        const y = (90 - lat) * (canvas.height / 180);

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });

      context.strokeStyle = `rgba(255, 100, 0, ${0.7 * (1 - beam.progress)})`;
      context.lineWidth = 2;
      context.stroke();

      const headPosition = beam.getPosition();
      const [headLat, headLon] = vector3ToLatLong(headPosition);
      const headX = (headLon + 180) * (canvas.width / 360);
      const headY = (90 - headLat) * (canvas.height / 180);

      context.beginPath();
      context.arc(headX, headY, 3, 0, 2 * Math.PI);
      context.fillStyle = `rgba(255, 100, 0, ${1 - beam.progress})`;
      context.fill();

      return beam.update();
    });

    context.restore();

    requestAnimationFrame(drawBeams);
  }, [createBeam]);

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
      if (overlayCanvasRef.current) {
        overlayCanvasRef.current.width = width * 2;
        overlayCanvasRef.current.height = width * 2;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    drawBeams();

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
      if (overlayCanvasRef.current) overlayCanvasRef.current.style.opacity = "1";
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[400px]",
        className
      )}
    >
      <canvas
        className={cn(
          "absolute inset-0 size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      <canvas
        className={cn(
          "absolute inset-0 size-full w-full h-full max-w-full max-h-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] pointer-events-none"
        )}
        ref={overlayCanvasRef}
      />
    </div>
  );
}