import { Dialog, Separator } from 'radix-ui';
import EnchantedForestPreview from '../assets/enchanted-forest.png';
import { Button } from '../components/ui/button';

import { VerificationSheet } from '../components/verification-sheet';

export function EnchantedForest() {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
    .format(today)
    .toUpperCase();

  return (
    <div className="bg-light-background flex min-h-screen w-full flex-col lg:flex-row">
      <div className="to-light-background relative w-full overflow-hidden bg-gradient-to-b from-black lg:w-1/2">
        <div
          className="h-[360px] w-full bg-cover bg-center sm:h-[480px] lg:h-full"
          style={{ backgroundImage: `url(${EnchantedForestPreview})` }}
          role="img"
          aria-label="Enchanted Forest poster"
        />
      </div>
      <div className="w-full px-4 py-6 sm:px-8 lg:px-18 lg:py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-[400] tracking-tight">
            ENCHANTED FOREST
          </h2>
          <p className="text-xl text-gray-400">★ 8,2</p>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-3">
            <p className="text-gray-400">Fantasy</p>
            <Separator.Root
              orientation="vertical"
              className="h-4 w-[2px] bg-gray-500"
            />
            <p className="text-gray-400">98 Min</p>
            <span className="rounded bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
              FSK 16
            </span>
          </div>
        </div>
        <p className="px-1 py-4">
          A young explorer stumbles upon a hidden realm where ancient magic and
          mythical creatures guard a secret that could change the world forever.
        </p>
        <p>
          <span className="pr-2">⏵</span>read more
        </p>
        <Separator.Root
          className="my-8 h-[1px] w-full bg-gray-500"
          orientation="horizontal"
        />
        <p className="text-primary px-1">
          <span className="pr-8 text-gray-400">From</span>Pinehurst Cinema
        </p>
        <Separator.Root
          className="my-8 h-[1px] w-full bg-gray-500"
          orientation="horizontal"
        />
        <h3 className="font-[400]">NEXT SHOWTIMES FOR {formattedDate}</h3>
        <div className="mt-8 flex flex-wrap gap-4">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button text="17:30" className="cursor-pointer" />
            </Dialog.Trigger>
            <Dialog.Trigger asChild>
              <Button text="20:15" className="cursor-pointer" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-[560px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out sm:w-[480px]">
                <VerificationSheet ageRequirement="age_over_16" />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
