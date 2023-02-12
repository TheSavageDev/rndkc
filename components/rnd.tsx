export const RND = () => {
  return (
    <section className="rental-status_card-container">
      <article className="rental-status_card reverse">
        <img src="/img/slices/reverse.svg" />
        <p>
          <span>R</span> vehicles are in stock but not currently available for
          rent. These vehicles are undergoing maintenance, repairs are being
          made, or the vehicle is currently rented or otherwise unavailable.
        </p>
      </article>
      <article className="rental-status_card neutral">
        <img src="/img/slices/neutral.svg" />
        <p>
          <span>N</span> vehicles are in stock and are available for rent but
          unable to be driven. These vehicles are primarily rented as props for
          photoshoots, commercials, and special events.
        </p>
      </article>
      <article className="rental-status_card drive">
        <img src="/img/slices/drive.svg" />
        <p>
          <span>D</span> vehicles are in stock and are available for rent. These
          vehicles have been inspected for roadworthiness and are gassed up and
          ready to cruise Kansas City!
        </p>
      </article>
    </section>
  );
};
