import SkyAdventure from '../assets/sky-adventure.png';
import GalaxyQuests from '../assets/galaxy-quests.png';
import EnchantedForest from '../assets/enchanted-forest.png';
import RoboticRenegade from '../assets/robotic-renegade.png';
import NoirStreet from '../assets/noir-street.png';
import { useLocation } from 'wouter';

export function Home() {
  const [, setLocation] = useLocation();
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-12">
      <img
        src={SkyAdventure}
        alt="SkyAdventure Header"
        className="col-span-4 w-full"
      />
      <img
        src={GalaxyQuests}
        alt="GalaxyQuests Header"
        onClick={() => setLocation('/galaxy-quests')}
        className="cursor-pointer"
      />
      <img src={EnchantedForest} alt="EnchantedForest Header" />
      <img src={RoboticRenegade} alt="RoboticRenegade Header" />
      <img src={NoirStreet} alt="NoirStreet Header" />
    </div>
  );
}
