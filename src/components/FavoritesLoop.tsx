"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Clapperboard } from "lucide-react";

const favorites = [
  {
    label: "Fav TV Series",
    value: "GOT",
    note: "kingdoms, betrayals, and impossible choices",
    image: "/got.jpg",
    imageAlt: "Game of Thrones poster artwork",
    imagePosition: "center",
  },
  {
    label: "Fav Movie",
    value: "Harry Potter",
    note: "magic with a home-team kind of heart",
    image: "/harrypotter.jpg",
    imageAlt: "Harry Potter movie poster artwork",
    imagePosition: "center",
  },
  {
    label: "Fav Anime Character",
    value: "Itachi Uchiha",
    note: "quiet pain, impossible loyalty, iconic aura",
    image: "/itachi.jpg",
    imageAlt: "Itachi Uchiha character artwork",
    imagePosition: "center",
  },
  {
    label: "Fav Anime",
    value: "Naruto",
    note: "friendship, grit, and shinobi-scale emotion",
    image: "/naruto-uzumaki-3840x2160-10225.jpg",
    imageAlt: "Naruto poster artwork",
    imagePosition: "center",
  },
];

const loopedFavorites = [...favorites, ...favorites];

export default function FavoritesLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const stackY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0vh", "0vh"] : ["0vh", "-400vh"]);

  return (
    <section
      ref={sectionRef}
      id="favorites"
      className="relative min-h-[520vh] overflow-clip bg-transparent"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ y: stackY }}
          className="absolute inset-x-0 top-0 flex flex-col will-change-transform"
          aria-label="Favorite things loop"
        >
          {loopedFavorites.map((favorite, index) => (
            <motion.article
              key={`${favorite.label}-${index}`}
              initial={{ opacity: 0.9, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 0.7 }}
              className="group relative h-screen min-h-screen w-full shrink-0 overflow-hidden bg-transparent"
            >
              <Image
                src={favorite.image}
                alt={favorite.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover saturate-[0.94] transition duration-700 group-hover:scale-[1.025]"
                style={{ objectPosition: favorite.imagePosition }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.64)_0%,rgba(5,5,5,0.36)_38%,rgba(5,5,5,0.04)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,5,0.62)_0%,transparent_56%)]" />

              <div className="relative z-10 flex h-full items-end px-6 pb-24 pt-28 md:px-12 md:pb-28 lg:px-24">
                <div className="max-w-4xl">
                  <div className="terminal-text mb-5 inline-flex items-center gap-2 bg-white/12 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_10px_35px_rgba(0,0,0,0.22)] backdrop-blur-md">
                    <Clapperboard className="h-3.5 w-3.5 text-[#7CFF8A]" />
                    more about me
                  </div>
                  <p className="terminal-text text-[11px] uppercase tracking-[0.2em] text-[#7CFF8A] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:text-xs">
                    {favorite.label}
                  </p>
                  <h3 className="mt-3 max-w-[12ch] text-5xl font-bold leading-[0.92] tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.62)] sm:text-7xl lg:text-8xl">
                    {favorite.value}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-white/82 drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)] md:text-lg">
                    {favorite.note}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
