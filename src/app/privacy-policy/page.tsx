import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 text-gray-800 mt-12">
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-orange-500 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="mb-6 text-lg text-center">
          Our privacy policy explains how we handle and protect your personal information.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Information We Collect
          </h2>
          <p className="mb-4">
            We may collect the following information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Your name and contact information</li>
            <li>Demographic information</li>
            <li>Other information relevant to customer surveys and/or offers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            How We Use the Information
          </h2>
          <p className="mb-4">
            We use your information to improve our services and provide a better user experience:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Internal record keeping</li>
            <li>Improving our products and services</li>
            <li>
              Sending promotional emails about new products, special offers, or other information you may find
              interesting
            </li>
            <li>
              Contacting you for market research via email, phone, or mail
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Security
          </h2>
          <p className="mb-4">
            We are committed to safeguarding your information. Suitable physical, electronic, and managerial
            procedures are in place to secure the information we collect online.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Cookies
          </h2>
          <p className="mb-4">
            Cookies help us analyze web traffic and customize your experience. They allow us to tailor our website
            to your preferences. Cookies do not give us access to your computer or personal information beyond what
            you choose to share.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Links to Other Websites
          </h2>
          <p className="mb-4">
            Our website may contain links to external websites. We are not responsible for their privacy practices
            or the content they provide. Exercise caution and review their privacy policies when visiting.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Controlling Your Personal Information
          </h2>
          <p className="mb-4">
            You can restrict the collection or use of your personal information in the following ways:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Update your preferences for direct marketing by contacting us at{" "}
              <Link
                href="mailto:support@yourwebsite.com"
                className="text-orange-500 underline"
              >
                support@yourwebsite.com
              </Link>
              .
            </li>
            <li>
              Request details of personal information we hold by emailing us at{" "}
              <a
                href="mailto:support@yourwebsite.com"
                className="text-orange-500 underline"
              >
                support@yourwebsite.com
              </a>
              .
            </li>
            <li>
              If any information is incorrect, notify us, and we will promptly correct it.
            </li>
          </ul>
          <p className="mt-4">
            This privacy policy is subject to change without notice.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
