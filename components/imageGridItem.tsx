import Image from "next/image";

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
  dayPrice: number;
  go?: boolean;
  href?: string;
}) => {
  return (
    <article className="rental-ready_image-grid_image-box">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img
          src={go ? "/img/slices/go_icon.svg" : "/img/slices/show_icon.svg"}
          className="rental-ready_image-grid_image-icon"
        />
        <img src={src} alt={alt} />
        <section className="rental-ready_image-grid_image-banner">
          <article className="rental-ready_image-grid_image-banner_title">
            {title}
          </article>
          <article className="rental-ready_image-grid_image-banner_cost itemHeaderPrice">
            <span>${dayPrice} Day</span>
          </article>
        </section>
      </a>
    </article>
  );
};
