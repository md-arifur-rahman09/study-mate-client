const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-primary">Privacy Policy</h1>
      <p className="mb-4 text-gray-700">
        Your privacy matters deeply to us. This document outlines how we collect, use, store, and safeguard your personal data.
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>We collect personal details such as your name, email address, profile image, and optionally phone number.</li>
        <li>All collected data is securely stored using industry-standard encryption techniques.</li>
        <li>We never share or sell your information to third parties without your express permission.</li>
        <li>Cookies and similar technologies are used to improve your browsing experience and personalize content.</li>
        <li>Usage data (like pages visited or time spent) may be collected for analytics and service improvements.</li>
        <li>You can access, update, or delete your personal data by contacting our support team.</li>
        <li>Your data may be stored in international servers; we ensure compliance with relevant data protection laws.</li>
        <li>Children under 13 are not permitted to register, and we do not knowingly collect their data.</li>
        <li>Only authorized personnel have access to user data, and they follow strict confidentiality agreements.</li>
        <li>If the Privacy Policy changes, users will be notified via email or site updates.</li>
        <li>We may process anonymized data for research and service enhancement purposes.</li>
        <li>Third-party services used (e.g. payment gateways) have separate privacy policies users should review.</li>
        <li>We provide two-factor authentication for added account protection where available.</li>
        <li>By using the site, you agree to the terms outlined in this Privacy Policy.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
