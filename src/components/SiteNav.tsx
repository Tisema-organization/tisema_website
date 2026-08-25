import { NAV_LINKS, PETITION_HREF } from '../lib/content'
import { POSTER } from '../lib/assets'

/**
 * Fixed site nav. It rides in on --hero-nav-in during the handoff and then
 * stays for the rest of the page, which is the point at which the piece stops
 * being an intro animation and starts being a website.
 */
export function SiteNav() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-40 bg-oxblood"
      style={{
        opacity: 'var(--hero-nav-in, 0)',
        transform: 'translateY(calc((1 - var(--hero-nav-in, 0)) * -100%))',
      }}
    >
      <nav className="section-shell flex h-[72px] items-center justify-between lg:h-[105px]">
        <a href="#home" className="flex w-[175px] items-center gap-[8.75px]">
          <img
            src={POSTER}
            alt="Tisema"
            width={1080}
            height={1350}
            className="h-[42px] w-[33.6px] object-cover lg:h-[59.063px] lg:w-[47.25px]"
          />
        </a>

        <div className="flex items-center gap-4 lg:gap-[28px]">
          <ul className="hidden items-center gap-[28px] lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[14px] leading-[28px] whitespace-nowrap text-paper transition-colors hover:text-lime"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={PETITION_HREF}
            className="flex items-center justify-center rounded-[3.5px] bg-lime px-[18px] py-[8px] text-[13px] font-semibold whitespace-nowrap text-clay-shadow transition-opacity hover:opacity-90 lg:px-[24.5px] lg:py-[7.656px] lg:text-[13.78px] lg:leading-[24.5px]"
          >
            Sign the Petition
          </a>
        </div>
      </nav>
    </header>
  )
}
