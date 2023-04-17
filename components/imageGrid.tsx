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

export const RentalReadyImageGrid = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<DocumentData>([]);
  const [routerReady, setRouterReady] = useState(false);
  usePageTracking(router);

  const getVehicles = () => {
    const q = query(
      collection(db, "vehicles"),
      where("rentalStatus", "==", "D")
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
            src={
              `https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F${vehicle.vin}%2F${vehicle.imageUrls[0]}.jpg?alt=media&token=c6aa8b3e-97bb-4c8d-a3c9-7c5114459cd7` ??
              "/img/car.svg"
            }
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            dayPrice={vehicle?.rentalCost?.day ?? "Coming Soon"}
            go={vehicle.type === "GO"}
            href={`/car/${vehicle.vin}`}
          />
        ))}
    </section>
  );
};
