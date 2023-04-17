export const VehicleImages = ({ vehicle, bigImageUrl, setBigImageUrl }) => {
  return (
    <>
      <section className="booking_images">
        <section className="booking_images_main-image">
          {vehicle.imageUrls && vehicle.imageUrls.length !== 0 ? (
            <>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F${vehicle.vin}%2F${bigImageUrl}.jpg?alt=media&token=c6aa8b3e-97bb-4c8d-a3c9-7c5114459cd7`}
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
            <img
              src={`https://firebasestorage.googleapis.com/v0/b/rndkc-95667.appspot.com/o/inventory%2F${vehicle.vin}%2F${url}.jpg?alt=media&token=c6aa8b3e-97bb-4c8d-a3c9-7c5114459cd7`}
              onClick={() => setBigImageUrl(url)}
            />
          ))}
        </section>
      )}
    </>
  );
};
