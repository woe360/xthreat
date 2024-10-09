// "use client";
// import React, { useRef } from 'react';
// import { useScroll, useTransform, motion } from 'framer-motion';
// import Image from 'next/image';

// export const ContainerScroll = ({
//   titleComponent,
// }: {
//   titleComponent: string | React.ReactNode
// }) => {
//   const containerRef = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//   });
//   const [isMobile, setIsMobile] = React.useState(false);

//   React.useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//     };
//   }, []);

//   const scaleDimensions = () => {
//     return isMobile ? [0.6, 1] : [0.7, 1];
//   };

//   const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
//   const translate = useTransform(scrollYProgress, [0, 1], [30, 100]);

//   return (
//     // <div
//     //   className="h-[90rem] md:h-[110rem] lg:h-[100rem] sm:h-[120rem] flex items-center justify-center relative p-8"
//     //   ref={containerRef}
//     // >
//     <div
//   className={`
//     h-[90rem]
//     sm:h-[120rem]
//     md:h-[100rem]
//     lg:h-[90rem]
//     xl:h-[80rem]
//     2xl:h-[60rem]
//     [@media(min-width:1600px)]:h-[80rem]
//     flex items-center justify-center relative p-8
//   `}
//   ref={containerRef}
// >
//       <div
//         className="py-40 w-full relative"
//         style={{
//           perspective: '1000px',
//         }}
//       >
//         <Header
//           translate={translate}
//           titleComponent={titleComponent}
//         />
//         <Card
//           rotate={rotate}
//           translate={translate}
//           scale={scale}
//         />
//       </div>
//     </div>
//   );
// }

// export const Header = ({ translate, titleComponent }: any) => {
//   return (
//     <motion.div
//       style={{
//         translateY: translate,
//       }}
//       className="div max-w-6xl mx-auto text-center mb-50"
//     >
//       {titleComponent}
//     </motion.div>
//   );
// }

// export const Card = ({
//   rotate,
//   scale,
//   translate,
// }: {
//   rotate: any;
//   scale: any;
//   translate: any;
// }) => {
//   return (
//     <motion.div
//       style={{
//         rotateX: rotate,
//         scale,
//         translateY: translate,
//         boxShadow:
//           '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
//       }}
//       className="max-w-6xl -mt-12 h-[30rem] md:h-[40rem] w-full  p-[2px] backdrop-blur-lg bg-gray-800 rounded-[18px] shadow-2xl"
//     >
//       <div className="bg-gray-700 h-full w-full rounded-2xl gap-4 overflow-hidden transition-all flex flex-col">
//         <div className="relative h-full w-full">
//           <video
//             src=""
//             controls
//             className="object-cover rounded-xl h-full w-full"
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";
import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

export const ContainerScroll = ({
  titleComponent,
}: {
  titleComponent: string | React.ReactNode
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.6, 1] : [0.7, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [30, 100]);

  return (
    <div
      className={`
        h-[90rem]
        sm:h-[80rem]
        md:h-[90rem]
        lg:h-[90rem]
        xl:h-[105rem]
        2xl:h-[60rem]
        [@media(min-width:1600px)]:h-[105rem]
        flex items-center justify-center relative p-8
        max-w-6xl mx-auto
      `}
      ref={containerRef}
    >
      <div
        className="py-40 w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <Header
          translate={translate}
          titleComponent={titleComponent}
        />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
        />
      </div>
    </div>
  );
}

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div w-full text-center mb-50"
    >
      {titleComponent}
    </motion.div>
  );
}

export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: any;
  scale: any;
  translate: any;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="-mt-12 h-[30rem] md:h-[40rem] w-full p-[2px] backdrop-blur-lg bg-gray-800 rounded-[18px] shadow-2xl"
    >
      <div className="bg-gray-700 h-full w-full rounded-2xl gap-4 overflow-hidden transition-all flex flex-col">
        <div className="relative h-full w-full">
          <video
            src=""
            controls
            className="object-cover rounded-xl h-full w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}