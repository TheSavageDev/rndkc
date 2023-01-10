import axios from "axios";
import mailchimpClient from "@mailchimp/mailchimp_transactional";
import * as gtag from "../../lib/gtag";

export default async (req, res) => {
  const { email, name, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const run = async () => {
    const response = await mailchimpClient.messages.send({ message });
    console.log(response);
  };

  const API_KEY = process.env.NEXT_PUBLIC_MANDRILL_API_KEY;
  const url = `https://mandrillapp.com/api/1.0/messages/send`;
  const data = {
    key: API_KEY,
    message: {
      from_email: email,
      from_name: name,
      to: [
        {
          email: "hello@rndkc.com",
          name: "Ryan Wager",
        },
      ],
      subject: "Message from RNDKC.com",
      text: message,
    },
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `api-key ${API_KEY}`,
    },
  };

  try {
    const response = await axios.post(url, data, options);
    console.log(response);
    if (response.status >= 400) {
      return res.status(400).json({
        error:
          "There was an error sending your message. Contact me at ryan@randdgarage.com to solve this issue",
      });
    }

    if (response.status >= 200 && response.status < 300) {
      gtag.event({
        action: "submit_form",
        category: "Contact",
        label: message,
        value: email,
      });
    }
    return res
      .status(201)
      .json({ message: `Message Successfully Sent ${email}` });
  } catch (error) {
    console.log(res);
    return res.status(500).json({ error: error.message });
  }
};
