"use client";

import { useEffect } from "react";

export default function WOWInit() {
  useEffect(() => {
    const initWOW = async () => {
      const { WOW } = await import("wowjs");
      new WOW({
        live: false,
      }).init();
    };
    initWOW();
  }, []);

  return null;
}
