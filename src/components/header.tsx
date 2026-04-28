import { useState } from 'react';
import { Button } from './ui/button';
import clsx from 'clsx';

const NAV_ITEMS = ['Program', 'Events', 'Specials', 'Gastro'];

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="border-b border-white/15 px-4 py-4 text-white sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            STAR<span className="text-primary">FILM</span>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary text-lg font-[400] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Button text="Account" />
        </div>
        <div className="flex w-full items-center gap-3 md:hidden">
          <Button
            text="Account"
            className="flex-1 text-sm tracking-wide uppercase"
          />
          <button
            type="button"
            className="rounded border border-white/30 px-4 py-3 text-sm tracking-wide uppercase"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}>
            {isMobileNavOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className={clsx(
          'md:hidden',
          isMobileNavOpen ? 'mt-4 border-t border-white/15 pt-4' : 'hidden'
        )}>
        <ul className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={`${item}-mobile`}>
              <a
                href="#"
                className="hover:text-primary text-lg font-[400] transition-colors"
                onClick={() => setIsMobileNavOpen(false)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
