import Link from "next/link";
import Cta from "./components/Cta";

function Pricing({ data }) {
  const {
    frontmatter: { title, image, sections, members, call_to_action, description },
  } = data;
  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">{title}</h1>
          {image && (
            <img
              src={image}
              alt={title}
              className="mx-auto mt-4 w-64 h-64"
              style={{ display: "block" }}
            />
          )}

          {/*section*/}
          <p className="text-center mt-4">{description}</p>
          {sections && sections.map((section, index) => (
              <div key={index} className="mt-8">
                <div className="container mx-auto max-w-2xl">
                  {section.text && (
                    <p className="text-center mt-2 max-w-xl mx-auto"></p>
                  )}
                  {section.title && (
                    <h2 className="font-bold text-xl text-center">{section.title}</h2>
                  )}
                  {section.image && (
                  <div className="text-center mt-2">
                    <img src={section.image} alt={section.title || ''} className="max-w-full" />
                  </div>
                  )}
                  {}
                </div>
              </div>
            ))}
          <div className="section row -mt-10 justify-center md:mt-0">
            {members.map((member, index) => (
              <div
                className={`col-12 md:col-4`}
                key={member.name + index}
              >
                <div className="card text-center">
                  <img src={member.image} alt={member.name} className="rounded-full w-24 h-24 mx-auto mt-4" />
                  <h4 className="mt-4">{member.name}</h4>
                  <p className="text-text">{member.position}</p>
                  {/* You can add more fields as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Pricing;
