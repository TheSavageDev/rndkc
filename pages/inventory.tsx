import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  collection,
  where,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Footer } from "../components/footer";
import { ImageGridItem } from "../components/imageGridItem";
import { NavBar } from "../components/navBar";
import { NavSubheader } from "../components/navSubheader";
import { usePageTracking } from "../hooks/usePageTracking";
import { db } from "../firebase/clientApp";

export default function Inventory() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<DocumentData>([]);
  const [routerReady, setRouterReady] = useState(false);
  usePageTracking(router);

  const getVehicles = () => {
    const q = query(collection(db, "vehicles"));
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

  usePageTracking(router, router.query.id);
  return (
    <>
      <Head>
        <title>RND - Rental Inventory</title>
      </Head>
      <section className="inventory-container">
        <>
          <NavBar />
          <section className="main">
            <NavSubheader title="Rental Inventory" />
            <section className="inventory_header">
              <img src="/img/slices/icon_manual.svg" />
              <h2 className="inventory_header_text">
                Drive Your Dreams <span>by the</span> day <span>or</span> week.
              </h2>
            </section>
            <section className="inventory_cars">
              {vehicles &&
                vehicles?.length !== 0 &&
                vehicles?.map((vehicle) => (
                  <ImageGridItem
                    key={vehicle.vin}
                    src={vehicle.imageUrls[0] ?? "/img/car.svg"}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    dayPrice={vehicle?.rentalCost?.day ?? "Coming Soon"}
                    go={vehicle.type === "GO"}
                    href={`/car/${vehicle.vin}`}
                  />
                ))}
            </section>
          </section>
        </>
      </section>
      <Footer />
    </>
  );
}
