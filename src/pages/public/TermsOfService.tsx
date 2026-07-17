const TermsOfService = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold md:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            1. Acceptance of Terms
          </h2>
          <p>
            By creating an account or using this platform, you agree to
            these Terms of Service. If you do not agree, please do not use
            the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            2. Account Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity that occurs under your
            account. Notify us immediately of any unauthorized use.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            3. Course Purchases and Refunds
          </h2>
          <p>
            Purchasing a course grants you a personal, non-transferable
            license to access its content. Refunds are available within 30
            days of purchase, in line with our money-back guarantee, unless
            otherwise stated on a specific course.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            4. Instructor Content
          </h2>
          <p>
            Instructors retain ownership of the courses they create but
            grant the platform a license to host, distribute, and promote
            that content. Instructors are responsible for ensuring their
            content does not infringe on third-party rights.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            5. Prohibited Conduct
          </h2>
          <p>
            You may not share your account, redistribute course content,
            reverse-engineer the platform, or use the service for any
            unlawful purpose. Violations may result in suspension or
            termination of your account.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            6. Limitation of Liability
          </h2>
          <p>
            The platform is provided "as is." We are not liable for any
            indirect, incidental, or consequential damages arising from your
            use of the service, to the extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            7. Changes to These Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            the platform after changes are posted constitutes acceptance of
            the revised terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f]">
            8. Contact
          </h2>
          <p>
            Questions about these terms can be sent through our{" "}
            <a href="/contact-us" className="text-indigo-600 underline">
              Contact Us
            </a>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;