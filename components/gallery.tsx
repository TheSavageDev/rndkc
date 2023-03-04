import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/clientApp";
import { RentalReadyImageGrid } from "./imageGrid";

export const Gallery = () => {
  const router = useRouter();
  const [vehiclesCount, setVehiclesCount] = useState<number>();
  const [routerReady, setRouterReady] = useState(false);

  const getVehicles = () => {
    const q = query(collection(db, "vehicles"));
    onSnapshot(q, (snap) => {
      setVehiclesCount(snap.docs.length);
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
      getVehicles();
    }
  }, [router.isReady]);
  return (
    <section className="rental-ready_container">
      <section className="rental-ready">
        <section className="rental-ready_header">
          <section className="rental-ready_header_title-box">
            <img
              src="/img/slices/tread.svg"
              alt="tread icon"
              className="rental-ready_header_title_icon"
            />
            <article className="rental-ready_header_title">
              <h2>
                <span className="rental-ready_header_title--orange">
                  Rental{" "}
                </span>
                Ready
              </h2>
            </article>
          </section>
          <section className="rental-ready_header_divider"></section>
          <p className="rental-ready_paragraph">
            These rentals are currently available and ready to roll! Crank the
            windows down, drop the top, and enjoy the ride cruising Kansas City
            in a classic muscle car!
          </p>
        </section>
        <RentalReadyImageGrid />
        <Link href="/inventory" className="rental-ready_view-all-button">
          View All Inventory{" "}
          <span className="rental-ready_view-all-button--count">
            ({vehiclesCount})
          </span>
        </Link>
      </section>
    </section>
  );
};
