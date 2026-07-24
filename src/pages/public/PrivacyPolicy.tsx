const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold md:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: July 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f] dark:text-gray-100">
            1. Information We Collect
          </h2>
          <p>
            When you create an account, enroll in a course, or contact
            support, we collect information such as your name, email
            address, and payment details. We also collect usage data like
            which lectures you watch and your progress to improve your
            learning experience.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f] dark:text-gray-100">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide access to purchased courses,
            process payments, send important account or course updates, and
            respond to support requests. We do not sell your personal data
            to third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f] dark:text-gray-100">
            3. Cookies
          </h2>
          <p>
            We use cookies to keep you logged in, remember your preferences,
            and understand how the platform is used. You can disable cookies
            in your browser settings, though some features may not work
            correctly as a result.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f] dark:text-gray-100">
            4. Data Sharing
          </h2>
          <p>
            We share data only with service providers necessary to operate
            the platform (e.g. payment processors), and only to the extent
            required to provide our services. These providers are bound by
            confidentiality obligations.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f] dark:text-gray-100">
            5. Your Rights
          </h2>
          <p>
            You can access, update, or delete your account information at
            any time from your account settings. You may also request a copy
            of the data we hold about you by contacting support.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#1c1d1f] dark:text-gray-100">
            6. Contact
          </h2>
          <p>
            Questions about this policy can be sent to
            support@lms-platform.com, or through our{" "}
            <a href="/contact-us" className="text-indigo-600 underline dark:text-indigo-400">
              Contact Us
            </a>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;