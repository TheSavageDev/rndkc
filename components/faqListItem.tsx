import { ReactNode, useState } from "react";

export const FAQListItem = ({
  title,
  content,
  children,
}: {
  title: string;
  content?: string;
  children?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <section className="faq_list-item_container" onClick={handleClick}>
      <section className="faq_list-item">
        <section className="faq_list-item_header">
          <h2 className="faq_list-item_title">{title}</h2>
          <img
            src="/img/slices/arrow_icon.svg"
            className={`faq_list-item_arrow${open ? "--open" : ""}`}
          />
        </section>
        <article className={`faq_list-item_content${open ? "--open" : ""}`}>
          {children ? (
            children
          ) : (
            <p className="faq_list-item_content-text">{content}</p>
          )}
        </article>
      </section>
    </section>
  );
};
