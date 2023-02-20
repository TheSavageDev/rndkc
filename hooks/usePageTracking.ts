import { useEffect } from "react";
import { NextRouter } from "next/router";

export const usePageTracking = (
  router?: NextRouter,
  id?: string | string[]
) => {
  useEffect(() => {
    window.gtag("event", "page_view", {
      page_path: router.pathname,
      car_id: id,
    });
  }, [router]);
};
