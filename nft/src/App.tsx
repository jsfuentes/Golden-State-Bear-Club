import React, { useRef } from "react";
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
        <ParallaxLayer
          offset={1}
          speed={0}
          style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={2}
          style={{
            backgroundImage: `url(/moon.svg)`,
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
        <ParallaxLayer
          offset={0.4}
          speed={0.05}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={im7}
            style={{ display: "block", width: "3%", marginLeft: "51%" }}
          />
        </ParallaxLayer>

        {/*  HOW IT WORKS */}
        <ParallaxLayer
          offset={1.25}
          speed={0.5}
          style={{ pointerEvents: "none" }}
        >
          <div className={"w-4/6 h-1/2 mx-auto bg-green-200"} />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0}>
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
      </Parallax>
    </div>
  );
}

export default App;
