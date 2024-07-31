import { React, useEffect } from "react";
import { gsap } from "gsap";
import { testanimation2 } from "./animation";
import Image from "next/image";
import { upparseniche } from "./animation";

export default function gsaptest() {
  useEffect(() => {
    upparseniche();
  }, []);

  return (
    <div>
      {/* <div className="box a h-[100px] w-[100px] bg-red-300 border-black z-10 p-10 m-10"></div> */}

      <Image
        src="/img/background.png"
        alt="Background"
        width={2800}
        height={1600}
        className="bg-img absolute object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-390px] z-1 pointer-events-none scale-[2] transform"
        id="background-image"
        data-speedx="0.28"
        data-speedy="0.34"
        data-speedz="0"
        data-rotation="0"
      />
    </div>
  );
}
