import React from "react";
import { motion } from "framer-motion";

interface AnimatedEnterTitleProps {
  userName: string;
  signedIn: boolean;
  failedSignIn: boolean;
}

const AnimatedEnterTitle = ({ userName, signedIn, failedSignIn }: AnimatedEnterTitleProps) => {
  const titleAnimations = {
    offscreen: { opacity: 0, scale: 0.7 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.5, duration: 1.5 }
    }
  };

  return (
    <>
      <motion.div
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: true, amount: 1 }}
        variants={titleAnimations}
      >
        {userName !== "" && signedIn && !failedSignIn && (
          <h1 className={"mx-auto mt-auto mb-20 text-3xl sm:text-3xl md:text-4xl lg:text-6xl text-cC px-2"}>
            <span className="text-cB">{userName}</span>, are you ready to run?
          </h1>
        )}
        {userName !== "" && !signedIn && !failedSignIn && (
          <h1 className={"mx-auto mt-auto mb-20 text-3xl sm:text-3xl md:text-4xl lg:text-6xl text-cC px-2"}>
            <span className="text-cB">{userName}</span>, please sign in to run.
          </h1>
        )}
        {userName !== "" && failedSignIn && (
          <h1 className={"mx-auto mt-auto mb-20 text-3xl sm:text-3xl md:text-4xl lg:text-6xl text-cC px-2"}>
            Failed to sign in. Please try again.
          </h1>
        )}
        {userName === "" && (
          <h1 className={"mx-auto mt-auto mb-20 text-3xl sm:text-3xl md:text-4xl lg:text-6xl text-cC px-2"}>
            Are you ready to run?
          </h1>
        )}
      </motion.div>
    </>
  );
};

export default AnimatedEnterTitle;
