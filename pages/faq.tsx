import { useRouter } from "next/router";
import { FAQListItem } from "../components/faqListItem";
import { NavBar } from "../components/navBar";
import { NavSubheader } from "../components/navSubheader";
import { usePageTracking } from "../hooks/usePageTracking";

export default function FAQ() {
  const router = useRouter();
  usePageTracking(router);
  return (
    <section className="faq-container">
      <>
        <NavBar />
        <NavSubheader title="Frequently Asked Questions" />
        <h2 className="faq_header-text">
          Kansas City's new way to enjoy classic and exotic vehicles
        </h2>
        <h3 className="faq_header-subtext">
          (without the hassle and headache of ownership)
        </h3>
        <img
          src="/img/slices/img_kcsilhouette.png"
          className="faq_header-image"
        />
        <section className="faq-list">
          <FAQListItem
            title="Is there an age requirement for renting?"
            content="Drivers and renters must be at least 25 years old."
          />
          <FAQListItem
            title="What are the cleaning and safety policies?"
            content="As part of our commitment to safety, RND will clean and disinfect vehicles before trips. This include keys, exterior door handles, trunk latches, and vehicle interiors."
          />
          <FAQListItem
            title="Can I get the car delivered to me?"
            content="$100 delivery fee within 25 mile radius "
          />
          <FAQListItem
            title="How many miles are included in the rental?"
            content="200"
          />
          <FAQListItem
            title="Is there an age requirement for renting?"
            content="Drivers and renters must be at least 25 years old."
          />
          <FAQListItem
            title="Do the vehicles have manual or automatic transmissions?"
            content="RND offers a mix of both manual and automatic transmissions. Drivers renting a manual transmission vehicle must be an expert in using clutches and have extensive experience with manual transmissions. Note: If the drivetrain of a manual transmission is damaged, the renter will be presumed to be at fault and will be held liable for repair of any damaged components of the car."
          />
          <FAQListItem
            title="What methods of payment can I use?"
            content="RND accepts all major credit cards, including Visa, Mastercard, Discover and American Express. Pre-paid credit cards are not accepted."
          />
          <FAQListItem
            title="When do I get charged for a rental?"
            content="Your card will be charged the full rental as soon as your reservation is confirmed. The deposit will be held for 72 hours before the rental period begins, then released 72 hours after the rental period ends, assuming no damages were incurred."
          />
          <FAQListItem title="What is the security deposit for?">
            <article>
              <p className="faq_list-item_content-text">
                RND requires a security deposit (minimum $250) before you can
                drive any car. If your payment type is a debit card, this amount
                will be deducted from your account; if it is a credit card, the
                amount will be pre-authorized. In either case, you will be
                charged when you initially rent the car. However, if the trip is
                scheduled to begin more than a week from the time you’ve paid
                for the rental, the security deposit will be charged one week
                prior to day one of the trip. If the security deposit is
                declined, your trip will be automatically canceled.
              </p>
              <p className="faq_list-item_content-text">
                This deposit will be refunded 72 hours after you return the car
                in the condition in which you received it. Depending on your
                bank or payment method, it may take up to seven business days
                after we release the deposit for the funds to be available in
                your account. Credit cards will usually be refunded more
                quickly, as there will be a release of authorization.
              </p>
            </article>
          </FAQListItem>
          <FAQListItem
            title="Can I cancel my rental?"
            content="Rentals may be canceled with at least 48 hours notification at no charge. If a cancellation is made with less than 48 hours notification, the canceling user will be charged the full fee of the rental plus a $25 inconvenience fee. Contact RND at support@rndkc.com to initiate cancellation. "
          />
          <FAQListItem
            title="Can I let other people drive my rental?"
            content="Absolutely not.  Permitting someone who is not an approved RND driver to drive an RND vehicle is strictly prohibited."
          />
          <FAQListItem
            title="Do I need my own insurance or is it included with the rental?"
            content="All DriveShare rentals include liability, collision and comprehensive insurance, which is active throughout every rental period, from the time the trip begins and the vehicle is picked up or delivered, to the time it is returned to the owner and the trip is ended."
          />
          <FAQListItem title="Is roadside assistance included?">
            <section>
              <p className="faq_list-item_content-text">
                Should there be a mechanical issue with the vehicle, all RND
                rentals include comprehensive roadside service during the rental
                period. This roadside assistance is included with every rental
                at no cost to the owner or renter. This service is provided
                through Hagerty Drivers Club® and includes:
              </p>
              <ul className="faq_list-item_content-text_list">
                <li>Guaranteed flatbed towing with soft straps</li>
                <li>
                  Dispatch operators who understand and care about special cars
                </li>
                <li>24-hours-a-day, 7-days-a-week coverage</li>
                <li>
                  Dispatch for lockouts, battery jumps, tire changes and
                  emergency fuel delivery
                </li>
                <li>
                  Live truck tracking, text status updates, Lyft credit and more
                </li>
                <li>
                  Depending on the circumstances, a refund of the rental costs
                  may be offered to the renter
                </li>
              </ul>
              <p className="faq_list-item_content-text">
                If you are having a problem with an RND car you rented and need
                roadside assistance, please call 1-877-922-1702 (prompt #3).
              </p>
              <p className="faq_list-item_content-text">
                Depending on the circumstances of the issue, a full or partial
                refund of the rental fee may be offered to the renter. Please
                contact us at support@rndkc.com.
              </p>
            </section>
          </FAQListItem>
          <FAQListItem
            title="Can I rent your vehicles for a photoshoot or special event?"
            content="Absolutely! Many of the vehicles listed on our site are also available for events and special occasions, such as weddings or photo shoots."
          />
          <FAQListItem
            title="Can I rent a car with a non-US drivers license?"
            content="Our site can accommodate United States driver’s licenses for automated verification. If you hold an international or foreign driver’s license, we will need a copy of your driver's record report. Contact the driving authority from which you received or currently maintain your license to obtain your records. Please contact us at support@rndkc.com for further assistance."
          />
          <FAQListItem title="What are prohibited vehicle uses?">
            <p className="faq_list-item_content-text">
              At this time, we are unable to include vehicles described as being
              used for any off-road, racing, timed events or driver's education
              on the DriveShare.com platform due to insurance restrictions.
            </p>
            <p className="faq_list-item_content-text">
              Further prohibited vehicle uses and activities include:
            </p>
            <ul className="faq_list-item_content-text_list">
              <li>
                Permitting someone who is not an approved RND driver to drive an
                RND vehicle.
              </li>
              <li>
                Driving a manual transmission car without being expert in the
                use of clutches and manual transmissions. Note: If the
                drivetrain of a manual transmission car is damaged, the renter
                will be presumed to be at fault and will be held fully liable
                for repair of any damaged components of the car.
              </li>
              <li>
                Allowing the RND vehicle to be pushed or towed by anyone other
                than an authorized law enforcement or a RND-approved service
                vehicle.
              </li>
            </ul>
            <p className="faq_list-item_content-text">Using an RND vehicle:</p>
            <ul className="faq_list-item_content-text_list">
              <li>to tow or push anything</li>
              <li>
                other than on paved roads (whether "off-roading", driving on
                unimproved roads or parking areas, or otherwise)
              </li>
              <li>in any race, test or competition</li>
              <li>
                with the intention to cause damage, or with deliberate, willful
                or reckless disregard for safety
              </li>
              <li>
                to carry persons or property for hire, such as a taxi or parcel
                delivery service. You may, however, use the car for business
                purposes, such as attending meetings and carrying associated
                materials
              </li>
              <li>
                unless a reservation has been booked. Using DriveShare vehicles
                without reservations or outside your reservation time
                constitutes unauthorized use
              </li>
              <li>
                during or due to use in the commission of a crime or any other
                illegal activity or purpose
              </li>
              <li>while the driver is under the influence of</li>
              <ul className="faq_list-item_content-text_list">
                <li>alcohol above the legal limit or</li>
                <li>
                  any drug or medication under the effects of which the
                  operation of a vehicle is prohibited or not recommended
                </li>
              </ul>
            </ul>
            <p className="faq_list-item_content-text">
              Engaging in any Prohibited Uses with an RND vehicle will be
              grounds for fees, suspension or cancellation of your membership.
              It will also lower the renter's liability coverage to state
              minimum limits or nullify coverage where allowable by applicable
              state law; if the owner has encouraged the engagement in a
              Prohibited Use, their coverage may be similarly reduced. Engaging
              in any Prohibited Uses may also eliminate any coverage for the
              renter for any claims related to physical damage.
            </p>
          </FAQListItem>
        </section>
      </>
    </section>
  );
}
