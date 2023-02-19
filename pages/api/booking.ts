import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, startDate, startTime, endDate, endTime, vin } = req.body;
  const vehicleDoc = doc(db, "vehicles", vin);
  const vehicleSnap = await getDoc(vehicleDoc);
  try {
    console.log(vehicleSnap.data());
    await setDoc(
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

    const msg = {
      to: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
      from: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
      subject: `New Booking for ${vin}`,
      text: `New Booking for ${vin} check Firestore for the booking information`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>New booking on ${vin} from ✉️<a href="mailto:${email}">${email}</a> </h3>
              <div style="font-size: 16px;">
              <p>Booking:</p>
              <ul>
                <li>Name: ${name}</li>
                <li>Email Address: <a href="mailto:${email}">${email}</a></li>
                <li>Start Date and Time: ${startDate} at ${startTime}</li>
                <li>End Date and Time: ${endDate} at ${endTime}</li>
              </ul>
              <br>
              </div>
              </div>
              </div>
      </body>
      </html>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ vehicle: vehicleSnap.data() });
};
