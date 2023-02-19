import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";
import axios from "axios";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { vehicle, email } = req.body;
  const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
  const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
  const API_SERVER = process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER;
  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  const data = {
    email_address: email,
    status: "subscribed",
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api-key ${API_KEY}`,
    },
  };
  await axios.post(url, data, options);
  const vehicleDoc = doc(db, "marketing", "voting", "nextVehicle", vehicle);
  const vehicleSnap = await getDoc(vehicleDoc);
  const msg = {
    to: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
    from: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
    subject: `${email} voted on ${vehicle}`,
    text: `${email} voted on ${vehicle}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
    <head>
      <meta charset="utf-8">
    </head>

    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
            </div>
            <div class="container" style="margin-left: 20px;margin-right: 20px;">
            <div style="font-size: 16px;">
            <p>✉️<a href="mailto:${email}">${email}</p> voted on ${vehicle} </p>
            <br>
            </div>
            </div>
            </div>
    </body>
    </html>`,
  };
  try {
    if (vehicleSnap.exists()) {
      if (vehicleSnap.data().emails.includes(email)) {
        await setDoc(
          vehicleDoc,
          {
            name: vehicle,
            votes: vehicleSnap.data().votes + 1,
          },
          { merge: true }
        );
      } else {
        await setDoc(
          vehicleDoc,
          {
            name: vehicle,
            votes: vehicleSnap.data().votes + 1,
            emails: [...vehicleSnap.data().emails, email],
          },
          { merge: true }
        );
      }
      await sgMail.send(msg);
      return res.status(200).json({ vehicle: vehicleSnap.data() });
    } else {
      const addRes = await setDoc(vehicleDoc, {
        name: vehicle,
        votes: 1,
        emails: [email],
      });
      await sgMail.send(msg);
      return res.status(200).json({ vehicle: addRes });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
