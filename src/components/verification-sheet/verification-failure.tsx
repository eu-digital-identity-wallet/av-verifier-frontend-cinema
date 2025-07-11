export function VerificationFailure() {
  return (
    <div className="mt-4">
      <h4 className="text-xl font-bold text-black">Verification Failed</h4>
      <p className="mt-2 text-black">
        Unfortunately, we could not verify that you are over 18 years old with
        sufficient trust level. <br />
        <br />
        Please ensure you have a valid digital identity credential and try
        again.
      </p>
      <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
}
