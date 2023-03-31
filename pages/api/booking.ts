import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/clientApp";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    email,
    vin,
    startDateTime,
    endDateTime,
    endRefitTime,
    vehicle,
    startDate,
    startTime,
    endDate,
    endTime,
  } = req.body;

  console.log(req.body);
  const vehicleDoc = collection(db, "vehicles", vin, "bookings");
  try {
    await addDoc(vehicleDoc, {
      name,
      email,
      startDate: startDateTime,
      endDate: endDateTime,
      endRefitTime: endRefitTime,
    });

    const msg = {
      to: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
      from: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
      subject: `New Booking for ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      text: `New Booking for ${vehicle.year} ${vehicle.make} ${vehicle.model} check Firestore for the booking information`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>New booking on ${vehicle.year} ${vehicle.make} ${vehicle.model} from ✉️<a href="mailto:${email}">${email}</a> </h3>
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

  // return res.status(200).json({});
  return res.status(200).json({ success: "Booking completed" });
};
