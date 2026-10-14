import React from "react";

const TermsOfUseComponent: React.FC = () => {
  return (
    <div className="legal-prose">
      <h1>Terms of Use</h1>
      <p>
        Welcome to Ruh-Roh Retreat! These terms and conditions outline the rules
        and regulations for the use of my website and services.
      </p>

      <h2>
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing and using my services, you accept and agree to be bound by
        these Terms of Use. If you do not agree, please do not use my services.
      </p>

      <h2>2. Use of Services</h2>
      <p>
        You agree to use Ruh-Roh Retreat responsibly and in compliance with all
        applicable laws and regulations. Any misuse of the service may result in
        termination of access.
      </p>

      <h2>
        3. User Responsibilities
      </h2>
      <p>
        Users are responsible for maintaining the security of their accounts and
        personal information. Ruh-Roh Retreat is not responsible for any data
        loss or unauthorized access.
      </p>

      <h2>
        4. Intellectual Property
      </h2>
      <p>
        All content, trademarks, and logos on Ruh-Roh Retreat are the property
        of their respective owners. Unauthorized use is strictly prohibited.
      </p>

      <h2>5. Termination</h2>
      <p>
        I reserve the right to suspend or terminate your access to my services
        if you violate these terms.
      </p>

      <h2>6. Changes to Terms</h2>
      <p>
        Ruh-Roh Retreat may update these Terms of Use from time to time.
        Continued use of my services constitutes acceptance of any changes.
      </p>

      <h2>7. Contact Me</h2>
      <p>
        If you have any questions about these Terms of Use, please contact me at{" "}
        <a href="mailto:hello@thejoydigi.com" className="text-blue-500">
          hello@thejoydigi.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsOfUseComponent;
