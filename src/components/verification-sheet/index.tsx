import { useState } from 'react';
import {
  CreatePresentationRequest,
  GetPresentationState,
} from '../../lib/presentation';
import { useQuery } from '@tanstack/react-query';
import { SheetHeader } from './sheet-header';
import { ScrollArea } from 'radix-ui';
import { AgeVerification } from './age-verification';
import { VerificationSuccess } from './verification-success';
import { BuyTickets } from './buy-tickets';

export function VerificationSheet() {
  const [verified, setVerified] = useState(false);
  const [buyTickets, setBuyTickets] = useState(false);

  const query = useQuery({
    queryKey: ['proofRequest'],
    queryFn: async () => CreatePresentationRequest(),
    refetchOnWindowFocus: false,
  });

  const state = useQuery({
    queryKey: ['proofState', query.data?.transaction_id],
    queryFn: async () => GetPresentationState(query.data.transaction_id),
    enabled: !!query.data?.transaction_id && !verified,
    refetchInterval: 1500,
  });

  if (!verified && state.data === true) {
    setVerified(true);
  }

  return (
    <>
      <SheetHeader buyTickets={buyTickets} />
      <ScrollArea.Root className="h-[calc(100vh-160px)] w-full overflow-auto px-8 pb-8">
        {!verified ? (
          <AgeVerification verified={verified} data={query.data} />
        ) : !buyTickets ? (
          <VerificationSuccess setBuyTicket={setBuyTickets} />
        ) : (
          <BuyTickets />
        )}
      </ScrollArea.Root>
    </>
  );
}
