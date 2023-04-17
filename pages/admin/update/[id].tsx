import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/clientApp";
import { Formik } from "formik";
import { TextField } from "../../../components/TextField";

export const UpdateVehicle = () => {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<DocumentData>({});
  const [initialValues, setInitialValues] = useState({});
  const [routerReady, setRouterReady] = useState(false);
  const [success, setSuccess] = useState(false);

  const getVehicle = (id) => {
    const q = query(collection(db, "vehicles"), where("vin", "==", id));
    onSnapshot(q, (snap) => {
      setVehicle(snap.docs[0].data());
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
      const { id } = router.query;
      getVehicle(id);
    }
  }, [router.isReady]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({});
  console.log(vehicle);
  return (
    <section className="update-vehicle">
      <h2 className="update-vehicle-title">{`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        className="update-vehicle-form"
      >
        {({ values }) => (
          <section className="update-vehicle-form-fields">
            <TextField label="Year" name="year" placeholder={vehicle?.year} />
            <TextField label="Make" name="make" placeholder={vehicle?.make} />
            <TextField
              label="Model"
              name="model"
              placeholder={vehicle?.model}
            />
            <TextField label="VIN" name="vin" placeholder={vehicle?.vin} />
            <TextField
              label="GO/SHOW"
              name="type"
              placeholder={vehicle?.type}
            />
            <TextField
              label="Rental Status"
              name="rentalStatus"
              placeholder={vehicle?.rentalStatus}
            />
          </section>
        )}
      </Formik>
    </section>
  );
};

export default UpdateVehicle;
