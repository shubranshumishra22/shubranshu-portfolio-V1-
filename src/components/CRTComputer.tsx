"use client";

import CRTScreen from "./CRTScreen";

export default function CRTComputer() {
  return (
    <div className="absolute top-1/2 left-[46%] -translate-x-1/2 -translate-y-1/2 fullscreen-cover-3-2 select-none">
      <div className="relative w-full h-full select-none">
        
        {/* Vintage Computer Full-Size Image Base */}
        <img
          src="/pexels-piotrbaranowski-22763683.jpg"
          alt="Vintage computer workspace"
          className="relative z-10 w-full h-full object-cover select-none pointer-events-none filter brightness-[0.88] contrast-[1.03]"
        />

        {/* Live Terminal screen overlay positioned exactly inside the CRT monitor screen bezel */}
        <div
          className="absolute z-20 overflow-hidden"
          style={{
            top: "22.2%",
            left: "39.2%",
            width: "30.2%",
            height: "35.8%",
          }}
        >
          <CRTScreen />
        </div>
      </div>
    </div>
  );
}
