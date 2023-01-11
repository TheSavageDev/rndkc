import { SocialIcon } from "react-social-icons";

export const Social = ({ fgColor, bgColor, text, justify }) => {
  return (
    <article className={`flex flex-col items-${justify}`}>
      <small
        className={`font-gemunuLibre text-xl md:text-2xl font-normal text-${text}`}
      >
        Follow Us for Updates and Special Offers
      </small>
      <article className="flex space-x-5 pt-2">
        <SocialIcon
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: 30, width: 30 }}
          url="https://facebook.com/RNDKansasCity"
        />
        <SocialIcon
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: 30, width: 30 }}
          url="https://instagram.com/rnd_kc"
        />
        {/* <SocialIcon
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: 30, width: 30 }}
          url="https://twitter.com"
        /> */}
      </article>
    </article>
  );
};
