import options from "../lib/vote-options";

export const Vote = ({}) => {
  return (
    <section className="vote_container">
      <section className="vote_header-container">
        <h2 className="vote_header">
          <span className="vote_header_text--bold">YOU</span> decide what our
          next build will be!
        </h2>
        <p className="vote_paragraph">
          Vote on which car you would like to see us build next. The car with
          the highest votes will be our next build. The winner will be announced
          in our newsletter at the end of the month when all votes are tallied.
        </p>
      </section>
      <section className="vote_form">
        <select className="vote_form_select">
          <option>Select Vehicle</option>
          {options.map((vehicle) => (
            <option>{vehicle}</option>
          ))}
        </select>
        <input className="vote_form_input" placeholder="Enter Email Address" />
        <button className="vote_form_button">Vote Now</button>
      </section>
      <img src="/img/slices/img_kcsilhouette.png" className="vote_kc" />
    </section>
  );
};
