import { Route, Switch } from 'wouter';
import { Header } from './components/header';
import { Home } from './pages/Home';
import { GalaxyQuests } from './pages/GalaxyQuest';
import { EnchantedForest } from './pages/EnchantedForest';
import Footer from './components/footer';

function App() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-16 xl:px-24">
      <Header />
      <div className="py-6 lg:py-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/galaxy-quests" component={GalaxyQuests} />
          <Route path="/enchanted-forest" component={EnchantedForest} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
