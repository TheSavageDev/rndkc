import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, yearMakeModel } = req.body;
  try {
    const msg = {
      to: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
      from: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
      subject: `New CarPay Application for ${yearMakeModel}`,
      text: `New CarPay Application for ${yearMakeModel}. check Firestore for the booking information`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>New CarPay Application for ${yearMakeModel} from ✉️<a href="mailto:${email}">${email}</a> </h3>
              <div style="font-size: 16px;">
              <p>Application:</p>
              <ul>
                <li>Name: ${name}</li>
                <li>Email Address: <a href="mailto:${email}">${email}</a></li>
                ${
                  phone && `<li>Phone: <a href="tel:${phone}">${phone}</a></li>`
                }
                <li>${yearMakeModel}</li>
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

  return res.status(200).json({ message: "Application Sent" });
};
