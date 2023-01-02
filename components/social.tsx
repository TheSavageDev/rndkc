import { SocialIcon } from "react-social-icons";

export const Social = ({ fgColor, bgColor, text }) => {
  return (
    <article className="flex flex-col items-center">
      <small
        className={`font-gemunuLibre text-xl md:text-2xl font-normal text-${text}`}
      >
        Follow Us for Updates and Special Offers
      </small>
      <article className="flex space-x-2">
        <SocialIcon
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: 40, width: 40 }}
          url="https://facebook.com/RNDKansasCity"
        />
        <SocialIcon
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: 40, width: 40 }}
          url="https://instagram.com/rnd_kc"
        />
        <SocialIcon
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: 40, width: 40 }}
          url="https://twitter.com"
        />
      </article>
    </article>
  );
};
