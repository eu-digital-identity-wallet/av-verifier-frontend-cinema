import { Dialog, Separator } from 'radix-ui';
import GalaxyQuestsPreview from '../assets/galaxy-quests-preview.png';
import { Button } from '../components/ui/button';

import { VerificationSheet } from '../components/verification-sheet';

export function GalaxyQuests() {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
    .format(today)
    .toUpperCase();

  return (
    <div className="bg-light-background flex h-full w-full">
      <img src={GalaxyQuestsPreview} />
      <div className="w-full px-18 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-[400] tracking-tight">GALAXY QUEST</h2>
          <p className="text-xl text-gray-400">★ 7,5</p>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-3">
            <p className="text-gray-400">Sci-Fi</p>
            <Separator.Root
              orientation="vertical"
              className="h-4 w-[2px] bg-gray-500"
            />
            <p className="text-gray-400">112 Min</p>
          </div>
        </div>
        <p className="px-1 py-4">
          A courageos astronaut must lead her crew on a perious journey across
          the galaxy.
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
        <div className="mt-8 flex gap-4">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button text="19:00" className="cursor-pointer" />
            </Dialog.Trigger>
            <Dialog.Trigger asChild>
              <Button text="21:45" className="cursor-pointer" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-0 right-0 h-full w-[560px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out">
                <VerificationSheet />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
