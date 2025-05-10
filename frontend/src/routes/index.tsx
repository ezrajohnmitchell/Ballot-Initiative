import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="mb-8 text-left">
      <h1 className="text-3xl mb-4">Welcome to the Ballot Initiative Project! 👋</h1>
      <p className="mb-6">
        This project aims to
      </p>

      <blockquote className="pl-4 border-l-4 border-solid border-black dark:border-white mb-5">
        Provide a cheap, quick, and accurate way to validate signed petitions for local ballot measures
      </blockquote>

      <p className="mb-6">
        It does this by performing{" "}
        <a href="https://en.wikipedia.org/wiki/Optical_character_recognition" className="text-blue-400 underline">
          OCR
        </a>{" "}
        on the signatures, matching the results against official voter records, and providing a score for each signature.
      </p>

      <figure className="text-center my-5">
      {/* Light mode image */}
      <img src="ballot_initiative_schematic.png" alt="Ballot Initiative Schematic" className="mx-auto block dark:hidden" />
      {/* Dark mode image */}
      <img src="ballot_initiative_schematic_negative.png" alt="Ballot Initiative Schematic (Dark)" className="mx-auto hidden dark:block" />
        <figcaption className="text-black dark:text-white">
          <em>Core process for validating signatures</em>
        </figcaption>
      </figure>

      <p className="mb-6">
        Signature verification is typically a tedious process that requires human reviewers to inspect submitted signatures one by one, searching a voter database for the associated voter, and then ensuring the voter was registered at the time of signing. 
        This process takes hundreds of person-hours and moves resources away from the more impactful work of advocating for the ballot measures themselves.
      </p>

      <p className="mb-6">
        There is software that can perform signature verification, but it is generally expensive and inaccessible to more grassroots organizations. 
        By building a cheap, quick, and accurate way to automate this process, we hope to help even the smallest organizations get their ballot measures off the ground.
      </p>

      <h3 className="text-2xl font-semibold mt-10 mb-4">The Builders</h3>

      <p className="mb-6">
        This project was created by the members of{" "}
        <a href="https://www.civictechdc.org/" className="text-blue-400 underline">
          Civic Tech DC
        </a>
        , a group of tech-savvy volunteers passionate about building software for the public good.
      </p>

      <p className="mb-6">
        Because of our experience with the DC ballot initiative process, we built the current version of the application for{" "}
        <strong>Washington DC petitions</strong> of the type{" "}
        <a href="https://github.com/Civic-Tech-Ballot-Inititiave/Ballot-Initiative/blob/main/sample_data/fake_signed_petitions_1-10.pdf" className="text-blue-400 underline">
          here
        </a>
        . However, the code is open source and easy to modify for your use case. Contact the Civic Tech DC team if you have questions about implementing it for your organization.
      </p>

      <h3 className="text-2xl font-semibold mt-10 mb-4">Want to learn more?</h3>

      <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
        <li>
          Check out the project repository{" "}
          <a href="https://github.com/Civic-Tech-Ballot-Inititiave/Ballot-Initiative" className="text-blue-400 underline">
            (Ballot Initiative Repository)
          </a>
        </li>
        <li>
          Ballot Initiatives around the US{" "}
          <a href="https://ballotpedia.org/Ballot_initiative" className="text-blue-400 underline">
            (Ballotpedia)
          </a>
        </li>
        <li>
          Civic Tech DC Homepage{" "}
          <a href="https://www.civictechdc.org/" className="text-blue-400 underline">
            (Civic Tech DC)
          </a>
        </li>
      </ul>
    </div>
  );
}
