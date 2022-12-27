import { SocialIcon } from "react-social-icons";

export const Social = ({ color }) => {
  return (
    <article className="flex flex-col items-center">
      <small
        className={`font-gemunuLibre text-xl md:text-2xl font-normal text-${color}`}
      >
        Follow Us for Updates and Special Offers
      </small>
      <article className="flex space-x-2">
        <SocialIcon
          fgColor="#fff"
          style={{ height: 40, width: 40 }}
          url="https://facebook.com"
        />
        <SocialIcon
          fgColor="#fff"
          style={{ height: 40, width: 40 }}
          url="https://instagram.com"
        />
        <SocialIcon
          fgColor="#fff"
          style={{ height: 40, width: 40 }}
          url="https://twitter.com"
        />
        <SocialIcon
          fgColor="#fff"
          style={{ height: 40, width: 40 }}
          url="https://tiktok.com"
        />
      </article>
    </article>
  );
};
