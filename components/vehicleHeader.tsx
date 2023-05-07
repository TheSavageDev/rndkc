export const VehicleHeader = ({
  setShowShareModal,
  router,
  bookingBegun,
  setBookingBegun,
}) => {
  return (
    <section className={`booking_sub-nav-header${bookingBegun && "--back"}`}>
      {bookingBegun ? (
        <button
          className="booking_sub-nav_header-button--back"
          onClick={() => setBookingBegun(false)}
        >
          <img src="/img/back-icon.svg" /> Back
        </button>
      ) : (
        <section className="booking_sub-nav-header">
          <button
            className="booking_sub-nav_header-button--all-inventory"
            onClick={() => router.push("/inventory")}
          >
            <img src="/img/back-icon.svg" /> Inventory
          </button>
          <button
            className="booking_sub-nav_header-button--question"
            onClick={() => router.push("/contact-us")}
          >
            Questions?
            <img src="/img/mail-icon.svg" />
          </button>
          <button
            className="booking_sub-nav_header-button--share"
            onClick={() => setShowShareModal(true)}
          >
            Share <img src="/img/share-icon.svg" />
          </button>
        </section>
      )}
    </section>
  );
};
