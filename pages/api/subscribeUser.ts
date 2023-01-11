import axios from "axios";

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

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

  try {
    const response = await axios.post(url, data, options);
    if (response.status >= 400) {
      return res.status(400).json({
        error:
          "There was an error subscribing. Contact me at ryan@randdgarage.com to solve this issue",
      });
    }
    return res
      .status(201)
      .json({ message: `Successfully Subscribed ${email}` });
  } catch (error) {
    console.log(res);
    return res.status(500).json({ error: error.message });
  }
};
