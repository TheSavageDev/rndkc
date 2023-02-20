import { useEffect } from "react";
import { useRouter } from "next/router";

export const usePageTracking = ({ id }: { id?: string }) => {
  const router = useRouter();

  useEffect(() => {
    window.gtag("event", "page_view", {
      page_path: router.pathname,
      car_id: id,
    });
  }, [router]);
};
