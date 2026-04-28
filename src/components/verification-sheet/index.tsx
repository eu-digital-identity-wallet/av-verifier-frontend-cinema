// SPDX-FileCopyrightText: 2025 European Commission
//
// SPDX-License-Identifier: Apache-2.0

import { useState } from 'react';
import { ScrollArea } from 'radix-ui';
import { useAgeVerification } from '../../hooks/use-age-verification';
import { AgeVerification } from './age-verification';
import { BuyTickets } from './buy-tickets';
import { SheetHeader } from './sheet-header';
import { VerificationFailure } from './verification-failure';
import { VerificationSuccess } from './verification-success';

const DEMO_VIDEO_URL =
  'https://avstoragedev.blob.core.windows.net/videos/home/250713-eu-age-verification-v10-short.mp4';

interface VerificationSheetProps {
  ageRequirement?: string;
}

export function VerificationSheet({
  ageRequirement = 'age_over_18',
}: VerificationSheetProps) {
  const minAge = ageRequirement.match(/\d+/)?.[0] ?? '18';
  const [buyTickets, setBuyTickets] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const {
    dcApiSupported,
    dcApiReady,
    presentationRequest,
    presentationReady,
    verificationCompleted,
    verificationError,
    isAgeVerifiedAndFullyTrusted,
    runDcApiVerification,
  } = useAgeVerification(ageRequirement);

  if (!presentationReady) {
    return <div className="p-8 text-center">Loading…</div>;
  }

  return (
    <>
      <SheetHeader buyTickets={buyTickets} />
      <ScrollArea.Root className="h-[calc(100vh-160px)] w-full overflow-auto px-8 pb-8">
        {verificationError && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4">
            <p className="font-semibold text-red-800">Verification Error</p>
            <p className="text-sm text-red-600">{verificationError}</p>
          </div>
        )}
        {!verificationCompleted && (dcApiSupported || presentationRequest) ? (
          <AgeVerification
            verified={verificationCompleted}
            data={presentationRequest}
            dcApiSupported={dcApiSupported}
            onDcApiClick={runDcApiVerification}
            minAge={minAge}
            dcApiReady={dcApiReady}
          />
        ) : verificationCompleted && !isAgeVerifiedAndFullyTrusted ? (
          <VerificationFailure minAge={minAge} />
        ) : !buyTickets ? (
          <VerificationSuccess setBuyTicket={setBuyTickets} />
        ) : !showVideo ? (
          <BuyTickets onNext={() => setShowVideo(true)} />
        ) : (
          <div className="mt-4 flex flex-col items-center">
            <video
              className="w-full rounded-lg"
              controls
              autoPlay
              src={DEMO_VIDEO_URL}
            />
          </div>
        )}
      </ScrollArea.Root>
    </>
  );
}
