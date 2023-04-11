import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  where,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { ImageGridItem } from "./imageGridItem";
import { usePageTracking } from "../hooks/usePageTracking";
import { db } from "../firebase/clientApp";

export const ComingSoonImageGrid = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<DocumentData>([]);
  const [routerReady, setRouterReady] = useState(false);
  usePageTracking(router);

  const getVehicles = () => {
    const q = query(
      collection(db, "vehicles"),
      where("rentalStatus", "==", "N")
    );
    onSnapshot(q, (snap) => {
      const cars = snap.docs.map((doc) => doc.data());
      setVehicles(cars);
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
      getVehicles();
    }
  }, [router.isReady]);
  return (
    <section className="rental-ready_image-grid">
      {vehicles &&
        vehicles.length !== 0 &&
        vehicles.map((vehicle) => (
          <ImageGridItem
            key={vehicle.vin}
            src={vehicle.imageUrls[0] ?? "/img/car.svg"}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            dayPrice={"Coming Soon"}
            go={vehicle.type === "GO"}
            href={`/car/${vehicle.vin}`}
          />
        ))}
    </section>
  );
};
