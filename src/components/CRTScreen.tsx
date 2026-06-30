"use client";

import Terminal from "./Terminal";

export default function CRTScreen() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[4px] bg-transparent pt-5 pb-2 px-3 sm:pt-8 sm:pb-3 sm:px-4 md:pt-11 md:pb-4 md:px-5 lg:pt-13 xl:pt-16 select-none flex flex-col justify-start">
      {/* Real React Terminal component */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start">
        <Terminal />
      </div>
    </div>
  );
}
