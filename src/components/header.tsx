import { Button } from './ui/button';

export function Header() {
  return (
    <header className="flex items-center justify-between px-42 py-8">
      <div className="flex items-center space-x-32">
        <h1 className="text-5xl font-[400] text-white">
          STAR<span className="text-primary">FILM</span>
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a className="text-2xl font-[400]">Program</a>
            </li>
            <li>
              <a className="text-2xl font-[400]">Events</a>
            </li>
            <li>
              <a className="text-2xl font-[400]">Specials</a>
            </li>
            <li>
              <a className="text-2xl font-[400]">Gastro</a>
            </li>
          </ul>
        </nav>
      </div>
      <Button text="Account" />
    </header>
  );
}
