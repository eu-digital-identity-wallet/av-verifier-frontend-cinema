import { Route, Switch } from 'wouter';
import { Header } from './components/header';
import { Home } from './pages/Home';
import { GalaxyQuests } from './pages/GalaxyQuest';

function App() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <Header />
      <div className="px-42">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/galaxy-quests" component={GalaxyQuests} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
