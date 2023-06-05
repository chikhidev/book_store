import { motion } from "framer-motion";
import React from "react";
import '../../css/loader.css'

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "black",
  borderRadius: "50%"
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around"
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut"
};

export default function ThreeDotsWave() {
  return (
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] ">
    <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
      <div class="flex justify-center">
        <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  );
}