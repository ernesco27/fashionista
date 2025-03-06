import React from "react";
import {
  domAnimation,
  LazyMotion,
  MotionConfig as MotionProvider,
} from "framer-motion";

const FramerMotionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionProvider reducedMotion="user">
      <LazyMotion strict features={domAnimation}>
        {children}
      </LazyMotion>
    </MotionProvider>
  );
};

export default FramerMotionProvider;
