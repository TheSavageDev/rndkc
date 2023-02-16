import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, vin } = req.body;
  console.log(email);
  console.log(vin);
  const vehicleDoc = doc(db, "marketing", "updates", "rentalStatus", vin);
  console.log(vehicleDoc);
  const vehicleSnap = await getDoc(vehicleDoc);
  try {
    if (vehicleSnap.exists()) {
      console.log(vehicleSnap.data());
      if (vehicleSnap.data().emails.includes(email)) {
        return res.status(500).json({ message: "Already Subscribed" });
      } else {
        const updateRes = await setDoc(
          vehicleDoc,
          {
            emails: [...vehicleSnap.data().emails, email],
          },
          { merge: true }
        );
        console.log(updateRes);
      }
      return res.status(200).json({ vehicle: vehicleSnap.data() });
    } else {
      const addRes = await setDoc(vehicleDoc, {
        emails: [email],
      });
      return res.status(200).json({ vehicle: addRes });
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
