import { IParallax } from "@react-spring/parallax";
import React from "react";
import { useSpring, animated } from "react-spring";

interface TitleProps {
  parallaxRef: React.MutableRefObject<IParallax>;
}

const Title = (props: TitleProps) => {
  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <animated.div
      className={
        " w-2/6 h-1/2 text-center mx-auto bg-white opacity-70 rounded-xl font-source flex flex-col items-center justify-center"
      }
      style={styles}
    >
      <div className={"text-5xl font-bold "}>Golden State Bear Club</div>
      <div className={"text-4xl"}>
        An NFT to earn{" "}
        <span className={" underline font-semibold decoration-amber-300"}>
          rewards
        </span>{" "}
      </div>
      <div className={"text-3xl"}>while </div>
      <div className={"text-5xl"}>
        <span
          className={
            "text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-yellow-500"
          }
        >
          helping
        </span>{" "}
        others{" "}
      </div>
      <div className={"flex items-center mt-4 gap-3"}>
        <a
          target="_blank"
          className={"bg-yellow-400 px-4 py-2 rounded-xl hover:bg-yellow-500"}
          href="https://gsbc-deploy-b0s5ha5ai-shak360.vercel.app/"
        >
          Connect your wallet
        </a>
        <div
          className={"hover:text-black text-gray-600"}
          onClick={() => props.parallaxRef.current.scrollTo(1)}
        >
          learn more
        </div>
      </div>
    </animated.div>
  );
};

export default Title;
