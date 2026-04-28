import SkyAdventure from '../assets/sky-adventure.png';
import GalaxyQuests from '../assets/galaxy-quests.png';
import EnchantedForest from '../assets/enchanted-forest.png';
import RoboticRenegade from '../assets/robotic-renegade.png';
import NoirStreet from '../assets/noir-street.png';
import { useLocation } from 'wouter';

export function Home() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-8 lg:grid-cols-4 lg:gap-12">
      <img
        src={SkyAdventure}
        alt="SkyAdventure Header"
        className="col-span-1 w-full sm:col-span-2 lg:col-span-4"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setLocation('/galaxy-quests')}>
        <img src={GalaxyQuests} alt="GalaxyQuests Header" className="w-full" />
        <span className="absolute top-2 right-2 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
          +18
        </span>
      </div>
      <div
        className="relative cursor-pointer"
        onClick={() => setLocation('/enchanted-forest')}>
        <img
          src={EnchantedForest}
          alt="EnchantedForest Header"
          className="w-full"
        />
        <span className="absolute top-2 right-2 rounded bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
          +16
        </span>
      </div>
      <img src={RoboticRenegade} alt="RoboticRenegade Header" />
      <img src={NoirStreet} alt="NoirStreet Header" />
    </div>
  );
}
