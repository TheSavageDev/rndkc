import { useEffect, useState } from "react";
import Head from "next/head";
import { ref, uploadBytes } from "firebase/storage";
import { Footer } from "../../components/footer";
import { NavBar } from "../../components/navBar";
import { db, storage } from "../../firebase/clientApp";
import { Input } from "../../components/input";
import { Radio } from "../../components/radio";
import { Select } from "../../components/select";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function TotallyNotAnAdminPage() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);
  const [buttonText, setButtonText] = useState("Add Vehicle");
  const [leads, setLeads] = useState([]);
  const [incompleteLeads, setIncompleteLeads] = useState([]);
  const [completeLeads, setCompleteLeads] = useState([]);
  const [cancelledLeads, setCancelledLeads] = useState([]);
  const [photos, setPhotos] = useState(null);
  const [data, setData] = useState({
    year: "",
    make: "",
    model: "",
    convertible: false,
    cylinders: "",
    engine: "",
    extColor: "",
    intColor: "",
    insurancePolicyNumber: "",
    pwrSteering: false,
    rentalCostDay: 0,
    rentalStatus: "",
    title: false,
    transmission: "",
    trim: "",
    turoLink: "",
    type: "",
    vin: "",
  });

  useEffect(() => {
    const completeQ = query(
      collection(db, "leads"),
      where("status", "==", "completed")
    );
    let tempLeads = [];
    const unsub = onSnapshot(completeQ, (snap) => {
      snap.docs.forEach((lead) => {
        tempLeads.push(lead.data());
      });
      setCompleteLeads(tempLeads);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const cancelledQ = query(
      collection(db, "leads"),
      where("status", "==", "cancelled")
    );
    let tempLeads = [];
    const unsub = onSnapshot(cancelledQ, (snap) => {
      snap.docs.forEach((lead) => {
        tempLeads.push(lead.data());
      });
      setCancelledLeads(tempLeads);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const incompleteQ = query(
      collection(db, "leads"),
      where("status", "==", "incomplete")
    );
    let tempLeads = [];
    const unsub = onSnapshot(incompleteQ, (snap) => {
      snap.docs.forEach((lead) => {
        tempLeads.push(lead.data());
      });
      setIncompleteLeads(tempLeads);
    });

    return () => unsub();
  }, []);

  console.log(leads);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    } else {
      console.log("No files found");
    }
  };

  const handleFirebaseUpload = () => {
    photos.forEach(async (photo) => {
      const path = `/inventory/${data.vin}/${photo.name}`;
      const photosRef = ref(storage, path);

      uploadBytes(photosRef, photo).then((snapshot) => {
        console.log(snapshot);
      });
    });
  };

  const handleChange = (e) => {
    setButtonText("Add Vehicle");
    if (["convertible", "pwrSteering", "title"].includes(e.target.id)) {
      setData({
        ...data,
        [e.target.id]: e.target.checked,
      });
    } else {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setButtonText("Submitting...");
    if (photos.length !== 0) {
      console.log(photos);
      handleFirebaseUpload();
    }
    if (
      data.year &&
      data.make &&
      data.model &&
      (data.convertible || !data.convertible) &&
      data.cylinders &&
      data.engine &&
      data.extColor &&
      data.intColor &&
      data.insurancePolicyNumber &&
      (data.pwrSteering || !data.pwrSteering) &&
      data.rentalCostDay &&
      data.rentalStatus &&
      (data.title || !data.title) &&
      data.transmission &&
      data.trim &&
      data.turoLink &&
      data.type &&
      data.vin
    ) {
      const res = await fetch("/api/admin/add", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        console.error(error);
        setButtonText("Add Vehicle");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setButtonText("Add Vehicle");
    } else {
      setSubmitting(false);
      setFormError(true);
      setButtonText("Please Fill out All Required Fields");
    }
  };

  return (
    <>
      <Head>
        <title>RND - CarPay</title>
      </Head>
      <section className="admin_container">
        <>
          <NavBar />
          <section className="main">
            <section>
              <h2 className="leads-header">Leads</h2>
              <h3 className="leads-subheader">Cancelled Payment</h3>
              <ul className="lead-list">
                {cancelledLeads.map((lead) => {
                  return (
                    <li className="lead-list-item">
                      <ul>
                        <li>{lead.name}</li>
                        <li>{lead.phone}</li>
                        <li>{lead.email}</li>
                        <li>{`${lead.vehicle.year} ${lead.vehicle.make} ${lead.vehicle.model}`}</li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
              <h3 className="leads-subheader">Incomplete Payment</h3>
              <ul className="lead-list">
                {incompleteLeads.map((lead) => {
                  return (
                    <li className="lead-list-item">
                      <ul>
                        <li>{lead.name}</li>
                        <li>{lead.phone}</li>
                        <li>{lead.email}</li>
                        <li>{`${lead.vehicle.year} ${lead.vehicle.make} ${lead.vehicle.model}`}</li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
              <h3 className="leads-subheader">Complete Payment</h3>
              <ul className="lead-list">
                {completeLeads.map((lead) => {
                  return (
                    <li className="lead-list-item">
                      <ul>
                        <li>{lead.name}</li>
                        <li>{lead.phone}</li>
                        <li>{lead.email}</li>
                        <li>{`${lead.vehicle.year} ${lead.vehicle.make} ${lead.vehicle.model}`}</li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </section>
            {/* <section className="admin_add-vehicle">
              <section className="admin_add-vehicle_form">
                <article className="admin_add-vehicle_meta">
                  <Input
                    label="VIN"
                    type="number"
                    id="vin"
                    placeholder="Enter VIN"
                    value={data.vin}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Vehicle Year"
                    type="text"
                    id="year"
                    placeholder="Enter Vehicle Year"
                    value={data.year}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Vehicle Make"
                    type="text"
                    id="make"
                    placeholder="Enter Vehicle Make"
                    value={data.make}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Vehicle Model"
                    type="text"
                    id="model"
                    placeholder="Enter Vehicle Model"
                    value={data.model}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Vehicle Trim"
                    type="text"
                    id="trim"
                    placeholder="Enter Vehicle Trim"
                    value={data.trim}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Insurance Policy Number"
                    type="text"
                    id="insurancePolicyNumber"
                    placeholder="Enter Vehicle Insurance Policy Number"
                    value={data.insurancePolicyNumber}
                    handleChange={handleChange}
                  />

                  <Input
                    label="Turo Link"
                    type="text"
                    id="turoLink"
                    placeholder="Enter Vehicle Turo Link"
                    value={data.turoLink}
                    handleChange={handleChange}
                    required
                  />
                </article>
                <article className="admin_add-vehicle_booleans">
                  <Radio
                    label="Convertible?"
                    handleChange={handleChange}
                    required
                    name="convertible"
                  />

                  <Radio
                    label="Power Steering?"
                    handleChange={handleChange}
                    required
                    name="pwrSteering"
                  />

                  <Radio
                    label="Title?"
                    handleChange={handleChange}
                    required
                    name="title"
                  />
                </article>
                <article className="admin_add-vehicle_internals">
                  <Input
                    label="Engine"
                    type="text"
                    id="engine"
                    placeholder="Enter Engine"
                    value={data.engine}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Cylinders"
                    type="text"
                    id="cylinders"
                    placeholder="Enter Cylinders"
                    value={data.cylinders}
                    handleChange={handleChange}
                    required
                  />

                  <Select
                    label="Transmission"
                    handleChange={handleChange}
                    id="transmission"
                    formError={formError}
                    defaultValue="A"
                  >
                    <option value="A">Automatic</option>
                    <option value="M">Manual</option>
                  </Select>

                  <Input
                    label="Exterior Color"
                    type="text"
                    id="extColor"
                    placeholder="Enter Exterior Color"
                    value={data.extColor}
                    handleChange={handleChange}
                    required
                  />

                  <Input
                    label="Interior Color"
                    type="text"
                    id="intColor"
                    placeholder="Enter Interior Color"
                    value={data.intColor}
                    handleChange={handleChange}
                    required
                  />
                </article>
                <article className="admin_add-vehicle_selects">
                  <Select
                    label="Rental Status"
                    handleChange={handleChange}
                    id="rentalStatus"
                    formError={formError}
                    defaultValue="R"
                  >
                    <option value="R">Reverse</option>
                    <option value="N">Neutral</option>
                    <option value="D">Drive</option>
                  </Select>
                  <Select
                    label="Type"
                    handleChange={handleChange}
                    id="type"
                    formError={formError}
                    defaultValue="GO"
                  >
                    <option value="GO">GO</option>
                    <option value="SHOW">SHOW</option>
                  </Select>
                  <Select
                    label="Rental Status"
                    handleChange={handleChange}
                    id="rentalStatus"
                    formError={formError}
                    defaultValue="R"
                  >
                    <option value="R">Reverse</option>
                    <option value="N">Neutral</option>
                    <option value="D">Drive</option>
                  </Select>

                  <Select
                    label="Type"
                    handleChange={handleChange}
                    id="type"
                    formError={formError}
                    defaultValue="GO"
                  >
                    <option value="GO">GO</option>
                    <option value="SHOW">SHOW</option>
                  </Select>
                </article>
                <article className="admin_add-vehicle_status">
                  <Input
                    label="Rental Cost Per Day"
                    type="number"
                    id="rentalCostDay"
                    placeholder="Enter Vehicle Rental Cost Per Day"
                    value={data.rentalCostDay}
                    handleChange={handleChange}
                    required
                  />
                </article>
                <article className="admin_add-vehicle_form_file-upload">
                  <button className="admin_add-vehicle_form_file-upload-button">
                    <img src="/img/slices/icon_camera.svg" />
                    Select Images To Upload
                  </button>
                  <input
                    type="file"
                    name="photos"
                    multiple
                    onChange={handleFileChange}
                  />
                </article>
                <button
                  className="admin_add-vehicle_form_button"
                  disabled={submitting}
                  onClick={handleSubmit}
                >
                  {buttonText}
                </button>
              </section>
            </section> */}
          </section>
        </>
      </section>
      <Footer />
    </>
  );
}
