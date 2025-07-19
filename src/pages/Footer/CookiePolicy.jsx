const CookiePolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-primary">Cookie Policy</h1>
      <p className="mb-4 text-gray-700">
        StudyMate uses cookies to ensure a smooth and personalized user experience. By using our platform, you consent to the use of cookies as described below.
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>Cookies store your login status and personal preferences between sessions.</li>
        <li>Session cookies are temporary and disappear once you close your browser.</li>
        <li>Persistent cookies remain on your device to recognize you on future visits.</li>
        <li>Third-party services (e.g., Google Analytics, payment providers) may use their own cookies.</li>
        <li>Cookies help us track performance, usage patterns, and troubleshoot issues.</li>
        <li>We do not use cookies to collect sensitive personal information.</li>
        <li>You can delete or disable cookies through your browser settings anytime.</li>
        <li>Blocking cookies may affect site functionality or features.</li>
        <li>We occasionally update our Cookie Policy to reflect new technologies or regulations.</li>
        <li>Further details on third-party cookies can be found in their respective policies.</li>
        <li>By continuing to use StudyMate, you agree to our use of cookies as outlined.</li>
      </ul>
    </div>
  );
};

export default CookiePolicy;
