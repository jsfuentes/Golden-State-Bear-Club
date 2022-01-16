import PersonCard from "PersonCard";
import React, { useRef } from "react";
import Title from "Title";
import logo from "./logo.svg";
import "./App.css";
import Sky from "react-sky";

import im1 from "img/29.png";
import im2 from "img/30.png";
import im3 from "img/31.png";
import im4 from "img/32.png";
import im5 from "img/33.png";
import im6 from "img/34.png";
import im7 from "img/35.png";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import meteor from "img/meteor";
import Clouds from "../public/clouds.svg";

import animationData from "nft.json";
import Lottie from "react-lottie";
import { useSpring, animated } from "react-spring";

import Dick from "Dick";
// {/*<Sky*/}
// {/*  images={{*/}
// {/*    0: im1,*/}
// {/*    1: im2,*/}
// {/*    2: im3,*/}
// {/*    3: im4,*/}
// {/*    4: im5,*/}
// {/*    5: im6,*/}
// {/*    6: im7,*/}
// {/*    /* 3: your other image... */*/}
//   {/*    /* 4: your other image... */*/}
//     {/*    /* 5: your other image... */*/}
//       {/*    /* ... */*/}
//         {/*  }}*/}
//         {/*  how={*/}
//         {/*    20*/}
//         {/*  } /* Pass the number of images Sky will render chosing randomly */*/}
//           {/*  time={40} /* time of animation */*/}
//             {/*  size={"400px"} /* size of the rendered images */*/}
//               {/*  background={"palettedvioletred"} /* color of background */*/}
//                 {/*/>*/}

function App() {
  const parallax = useRef<IParallax>(null!);

  return (
    <div className={"w-full h-screen"}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer offset={1} speed={0} />
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={1}
          style={{
            backgroundImage: `url(/moon-trans.svg)`,
            backgroundSize: "cover",
          }}
          // sticky={{ start: 0, end: 1 }}
        />

        <ParallaxLayer
          offset={0.9}
          speed={0.5}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={im4}
            style={{ display: "block", width: "15%", marginLeft: "80%" }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.7}
          speed={0.2}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={im1}
            style={{ display: "block", width: "12%", marginLeft: "15%" }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.3}
          speed={0.1}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={im3}
            style={{ display: "block", width: "5%", marginLeft: "20%" }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.35}
          speed={0.15}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={im2}
            style={{ display: "block", width: "7%", marginLeft: "75%" }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.2}
          speed={0.05}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={im6}
            style={{ display: "block", width: "3%", marginLeft: "45%" }}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} speed={0}>
          <Title parallaxRef={parallax} />{" "}
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0}>
          <div className={"relative w-full h-screen"}>
            <Sky
              images={{
                0: im1,
                1: im2,
                2: im3,
                3: im4,
                4: im5,
                5: im6,
                6: im7,
                /* 3: your other image... */
                /* 4: your other image... */
                /* 5: your other image... */
                /* ... */
              }}
              how={
                40
              } /* Pass the number of images Sky will render chosing randomly */
              time={40} /* time of animation */
              size={"200px"} /* size of the rendered images */
              background={"palettedvioletred"} /* color of background */
            />
          </div>
        </ParallaxLayer>

        {/*  Meet the team */}
        <ParallaxLayer
          offset={2.25}
          speed={0.5}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={
              "w-4/6 h-1/2 mx-auto bg-white rounded-2xl shadow-2xl flex items-center px-4 gap-4"
            }
          >
            <PersonCard
              name="Shakthi"
              url="https://www.redmond-reporter.com/wp-content/uploads/2018/02/10774926_web1_180221-sea-h1b-P1.jpg"
            />
            <PersonCard
              name="Jorge"
              url="https://ca-times.brightspotcdn.com/dims4/default/1b0c68f/2147483647/strip/true/crop/1880x2400+0+0/resize/840x1072!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F36%2Ff2%2F8bd51c60484799b33dd3968a1810%2Fla-fo-interview-with-taco-editor-jose-ralat-book-american-tacos.01.jpg"
            />
            <PersonCard
              name="Thomas"
              url="https://media.istockphoto.com/photos/portrait-young-confident-smart-asian-businessman-look-at-camera-and-picture-id1288538088?k=20&m=1288538088&s=612x612&w=0&h=tQPfhDfWqApLGZN_rIv6_eV464qOAH9SqXsJYAJveYY="
            />
          </div>
        </ParallaxLayer>

        {/*  HOW IT WORKS */}
        <ParallaxLayer
          offset={1.25}
          speed={0.5}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={
              "w-4/6 h-1/2 mx-auto bg-white shadow-xl rounded-xl flex flex-col px-12 py-14"
            }
          >
            <div
              className={
                "text-5xl font-bold text-transparent  bg-clip-text bg-gradient-to-br from-pink-100 to-red-600 text-center w-full"
              }
            >
              How it works
            </div>
            <div className={"flex"}>
              <div className={"flex flex-col justify-center items-center"}>
                <div className={"text-4xl font-source mt-4"}>
                  1. Volunteer for your community to earn a{" "}
                  <span className={"underline decoration-amber-400"}>
                    unique
                  </span>{" "}
                  Pooh Bear community NFT token
                </div>
                <div className={"text-4xl font-source mt-4"}>
                  2. Redeem your NFT for local discounts in the community
                </div>
              </div>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                }}
                height={300}
                width={400}
              />
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

// function App() {
//   const parallax = useRef<IParallax>(null!);
//
//   return (
//     <div className={"w-full h-screen"}>
//       <Dick />{" "}
//     </div>
//   );
// }

export default App;
