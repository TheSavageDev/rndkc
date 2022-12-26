import { useState } from "react";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="flex flex-col justify-between space-y-3 w-full"
      data-netlify="true"
      method="POST"
      action="/"
    >
      <input type="hidden" name="contact-form" value="contact" />
      <input
        type="name"
        id="name-input"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className="mt-4 px-4 py-2 rounded font-thin text-black"
      />
      <input
        type="email"
        id="email-input"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoCapitalize="off"
        autoCorrect="off"
        className="mt-4 px-4 py-2 rounded font-thin text-black"
      />
      <textarea
        placeholder="Message"
        className="mt-4 px-4 py-2 rounded font-thin text-black h-40"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <button
        type="submit"
        className="border uppercase font-thin text-sm text-white border-black px-4 py-2 bg-accent rounded hover:bg-secondary hover:text-white hover:border-secondary"
      >
        Send Message
      </button>
    </form>
  );
};
