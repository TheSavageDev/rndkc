export const VehicleImages = ({ vehicle, bigImageUrl, setBigImageUrl }) => {
  return (
    <>
      <section className="booking_images">
        <section className="booking_images_main-image">
          {vehicle.imageUrls && vehicle.imageUrls.length !== 0 ? (
            <>
              <img
                src={bigImageUrl}
                className="booking_images_main-image_img"
              />
              <section className="booking_images_main-image_icon">
                <img
                  src="/img/slices/icon_camera.svg"
                  className="booking_images_main-image_icon-svg"
                />
                <p className="booking_images_main-image_icon-text">
                  {`${vehicle.imageUrls.indexOf(bigImageUrl) + 1}/${
                    vehicle.imageUrls.length
                  }`}
                </p>
              </section>
            </>
          ) : (
            <>
              <img
                src="/img/car.svg"
                className="booking_images_main-image_img--placeholder"
              />
              <section className="booking_images_main-image_icon--placeholder">
                <p className="booking_images_main-image_icon-text--placeholder">
                  Pictures Coming Soon...
                </p>
              </section>
            </>
          )}
        </section>
      </section>
      {vehicle.imageUrls && vehicle.imageUrls.length !== 0 && (
        <section className="booking_images-previews">
          {vehicle.imageUrls.map((url) => (
            <img src={url} onClick={() => setBigImageUrl(url)} />
          ))}
        </section>
      )}
    </>
  );
};
