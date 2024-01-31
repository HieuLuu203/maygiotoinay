import config from "@config/config.json";
import social from "@config/social.json";
import Social from "@components/Social";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
          <div className="content col-12 md:col-6 lg:col-5" style={{ margin: "0 auto", textAlign: "center" }}>
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
    </section>
  );
};

export default Contact;
