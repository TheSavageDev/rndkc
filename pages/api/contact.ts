import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, message } = req.body;
  const msg = {
    to: "jason@thesavage.dev",
    from: `${process.env.NEXT_PUBLIC_FROM_EMAIL}`,
    subject: `Message from ${name} at ${email}`,
    text: message,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="en">
    <head>
      <meta charset="utf-8">
    </head>

    <body>
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
            </div>
            <div class="container" style="margin-left: 20px;margin-right: 20px;">
            <h3>You've got a new mail from ${req.body.name}, their email is: ✉️${req.body.email} </h3>
            <div style="font-size: 16px;">
            <p>Message:</p>
            <p>${req.body.message}</p>
            <br>
            </div>
            </div>
            </div>
    </body>
    </html>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
};
