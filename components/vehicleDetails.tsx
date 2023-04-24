import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

export const VehicleDetails = ({ vehicle }) => {
  const matches = useMediaQuery("(min-width: 1024px)");
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  return (
    <section className="booking_information">
      <h2 className="booking_information_header">{vehicle?.blurbs?.title}</h2>
      {!matches && (
        <section className="view-details_container">
          <button
            className="view-details_box"
            onClick={() => setViewDetailsOpen(!viewDetailsOpen)}
          >
            {viewDetailsOpen ? (
              <>Hide Specs & Details</>
            ) : (
              <>View Specs & Details</>
            )}
          </button>
        </section>
      )}

      {(viewDetailsOpen || matches) && (
        <section className="booking_information-paragraphs">
          <p className="booking_information-paragraphs-text">
            {vehicle?.blurbs?.description}
          </p>
          <section>
            <header>
              <h4 className="vehicle-details_section_header">
                Included with every rental
              </h4>
            </header>
            <ul className="vehicle-details_section_list">
              <li className="vehicle-details_section_text">
                200 miles per day
              </li>
              <li className="vehicle-details_section_text">
                Comprehensive Insurance
              </li>
              <li className="vehicle-details_section_text">
                24/7 Roadside Assistance
              </li>
            </ul>
          </section>
          <section>
            <header>
              <h4 className="vehicle-details_section_header">Vehicle Specs</h4>
            </header>
            <section className="vehicle-details_rental_specs">
              <section className="vehicle-details_rental-type">
                {["Convertible", "Dune Buggy"].includes(
                  vehicle.vehicleType
                ) && (
                  <>
                    <section className="vehicle-details_rental-type_section">
                      <img src="/img/convertible-icon.svg" />
                      <article className="vehicle-details_section_text">
                        {vehicle.vehicleType}
                      </article>
                    </section>
                  </>
                )}
                {["Coupe", "SUV"].includes(vehicle.vehicleType) && (
                  <>
                    <section className="vehicle-details_rental-type_section">
                      <img src="/img/coupe-icon.svg" />
                      <article className="vehicle-details_section_text">
                        {vehicle.vehicleType}
                      </article>
                    </section>
                  </>
                )}
                {vehicle.transmission === "M" ? (
                  <>
                    <section className="vehicle-details_rental-status_section">
                      <img src="/img/slices/icon_manual.svg" />
                      <article className="vehicle-details_section_text">
                        Manual
                      </article>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="vehicle-details_rental-status_section">
                      <img src="/img/auto-icon.svg" />
                      <article className="vehicle-details_section_text">
                        Automatic
                      </article>
                    </section>
                  </>
                )}
              </section>
              <section className="vehicle-details_rental-type">
                {vehicle.cylinders === "V8" ? (
                  <>
                    <section className="vehicle-details_rental-type_section">
                      <img src="/img/v8-icon.svg" />
                      <article className="vehicle-details_section_text">
                        {vehicle.engine} V8
                      </article>
                    </section>
                  </>
                ) : vehicle.cylinders === "V6" ? (
                  <section className="vehicle-details_rental-type_section">
                    <img src="/img/6-cyl-icon.svg" />
                    <article className="vehicle-details_section_text">
                      {vehicle.engine} 6 Cyl
                    </article>
                  </section>
                ) : vehicle.cylinders === "4" ? (
                  <section className="vehicle-details_rental-type_section">
                    <img src="/img/4-cyl-icon.svg" />
                    <article className="vehicle-details_section_text">
                      {vehicle.engine} 4 Cyl
                    </article>
                  </section>
                ) : (
                  <section className="vehicle-details_rental-type_section">
                    <img src="/img/engine-icon.svg" />
                    <article className="vehicle-details_section_text">
                      {vehicle.engine}
                    </article>
                  </section>
                )}

                <section className="vehicle-details_rental-status_section">
                  <img src="/img/pax-icon.svg" />
                  <article className="vehicle-details_section_text">
                    {`${vehicle.seats} Passenger`}
                  </article>
                </section>
              </section>
            </section>
          </section>
          <section>
            <header>
              <h4 className="vehicle-details_section_header">Vehicle Type</h4>
            </header>
            <section className="vehicle-details_rental-type">
              {vehicle.type === "SHOW" ? (
                <>
                  <section className="vehicle-details_rental-type_section">
                    <img src="/img/show-icon.svg" />
                    <article className="vehicle-details_section_text">
                      Show Car - treat it like you own it.
                    </article>
                  </section>
                  <section className="vehicle-details_rental-type_section">
                    <img src="/img/go-icon-grey.svg" />
                    <article className="vehicle-details_section_text">
                      Go Car - drive it like you stole it.
                    </article>
                  </section>
                </>
              ) : (
                <>
                  <section className="vehicle-details_rental-status_section">
                    <img src="/img/show-icon-grey.svg" />
                    <article className="vehicle-details_section_text">
                      Show Car - treat it like you own it.
                    </article>
                  </section>
                  <section className="vehicle-details_rental-status_section">
                    <img src="/img/go-icon.svg" />
                    <article className="vehicle-details_section_text">
                      Go Car - drive it like you stole it.
                    </article>
                  </section>
                </>
              )}
            </section>
          </section>
          <section>
            <header>
              <h4 className="vehicle-details_section_header">Vehicle Status</h4>
            </header>
            <section className="vehicle-details_rental-status">
              {vehicle.rentalStatus === "D" ? (
                <section className="vehicle-details_rental-status_section">
                  <img src="/img/d-icon.svg" />
                  <article className="vehicle-details_section_text">
                    Drive - vehicle is in stock, gassed up, inspected for
                    reliability, and is ready to cruise Kansas City.
                  </article>
                </section>
              ) : vehicle.rentalStatus === "R" ? (
                <article className="vehicle-details_section_text">
                  Reverse - vehicle is in stock but not currently available for
                  rent. These vehicles are undergoing maintenance, repairs are
                  being made, or the vehicle is currently rented or otherwise
                  unavailable.
                </article>
              ) : (
                <article className="vehicle-details_section_text">
                  Neutral - vehicle is in stock and is available for rent but
                  unable to be driven. These vehicles are primarily rented as
                  props for photo shoots, commercials, and special events.
                </article>
              )}
            </section>
          </section>
          <section>
            <header>
              <h4 className="vehicle-details_section_header">Requirements</h4>
            </header>
            <section className="vehicle-details_rental-status">
              <section className="vehicle-details_rental-status_section">
                <img src="/img/license.svg" />
                <article className="vehicle-details_section_text">
                  All self-drive renters must be 30+ years old and have a
                  relatively clean driving record.
                </article>
              </section>
              <section className="vehicle-details_rental-status_section">
                <img src="/img/creditcard.svg" />
                <article className="vehicle-details_section_text">
                  All bookings must be made with a valid Credit Card. Debit
                  Cards are not accepted.
                </article>
              </section>
            </section>
          </section>
          {!matches && (
            <section className="view-details_container">
              <button
                className="view-details_box"
                onClick={() => setViewDetailsOpen(!viewDetailsOpen)}
              >
                {viewDetailsOpen ? (
                  <>Hide Specs & Details</>
                ) : (
                  <>View Specs & Details</>
                )}
              </button>
            </section>
          )}
        </section>
      )}
    </section>
  );
};
