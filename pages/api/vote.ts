import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { vehicle, email } = req.body;
  const vehicleDoc = doc(db, "marketing", "voting", "nextVehicle", vehicle);
  const vehicleSnap = await getDoc(vehicleDoc);
  try {
    if (vehicleSnap.exists()) {
      console.log(vehicleSnap.data());
      if (vehicleSnap.data().emails.includes(email)) {
        const updateRes = await setDoc(
          vehicleDoc,
          {
            name: vehicle,
            votes: vehicleSnap.data().votes + 1,
          },
          { merge: true }
        );
        console.log(updateRes);
      } else {
        const updateRes = await setDoc(
          vehicleDoc,
          {
            name: vehicle,
            votes: vehicleSnap.data().votes + 1,
            emails: [...vehicleSnap.data().emails, email],
          },
          { merge: true }
        );
        console.log(updateRes);
      }
      return res.status(200).json({ vehicle: vehicleSnap.data() });
    } else {
      const addRes = await setDoc(vehicleDoc, {
        name: vehicle,
        votes: 1,
        emails: [email],
      });
      return res.status(200).json({ vehicle: addRes });
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
