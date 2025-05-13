import { Route, Switch } from 'wouter';
import { Header } from './components/header';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <Header />
      <div className="px-42">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
