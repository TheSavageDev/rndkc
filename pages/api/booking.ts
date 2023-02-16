import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, startDate, startTime, endDate, endTime, vin } = req.body;
  console.log(email);
  console.log(vin);
  const vehicleDoc = doc(db, "vehicles", vin);
  console.log(vehicleDoc);
  const vehicleSnap = await getDoc(vehicleDoc);
  try {
    console.log(vehicleSnap.data());
    const updateRes = await setDoc(
      vehicleDoc,
      {
        bookings: [
          {
            name,
            email,
            startDate,
            startTime,
            endDate,
            endTime,
          },
        ],
      },
      { merge: true }
    );
    console.log(updateRes);
    return res.status(200).json({ vehicle: vehicleSnap.data() });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
