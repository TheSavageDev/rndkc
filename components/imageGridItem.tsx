import { useRouter } from "next/router";

export const ImageGridItem = ({
  src,
  alt,
  title,
  dayPrice,
  go,
  href,
}: {
  src: string;
  alt: string;
  title: string;
  dayPrice: number | string;
  go?: boolean;
  href?: string;
}) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push({
      pathname: href,
    });
  };
  return (
    <article className="rental-ready_image-grid_image-box">
      <a href={href} onClick={handleClick}>
        <img
          src={go ? "/img/slices/go_icon.svg" : "/img/slices/show_icon.svg"}
          className="rental-ready_image-grid_image-icon"
        />
        <img src={src} alt={alt} className="rental-ready_image-grid_image" />
        <section className="rental-ready_image-grid_image-banner">
          <article className="rental-ready_image-grid_image-banner_title">
            {title}
          </article>
          <article className="rental-ready_image-grid_image-banner_cost itemHeaderPrice">
            <span>{`${
              typeof dayPrice === "string" ? dayPrice : "$" + dayPrice + " Day"
            }`}</span>
          </article>
        </section>
      </a>
    </article>
  );
};
