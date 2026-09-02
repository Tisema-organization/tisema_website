import { useEffect, useState, type MouseEvent } from 'react'
import { NAV_LINKS, petitionUrl } from '../lib/content'
import { POSTER_MARK } from '../lib/assets'
import { handleHomeNavClick } from '../lib/heroSession'
import { clientNavigate, useRouter } from '../lib/router'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-field"
    >
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

/**
 * Fixed site nav. It rides in on --hero-nav-in during the handoff and then
 * stays for the rest of the page, which is the point at which the piece stops
 * being an intro animation and starts being a website.
 */
export function SiteNav({
  pinned = false,
  base = '',
}: {
  pinned?: boolean
  base?: string
} = {}) {
  const { navigate } = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const petition = petitionUrl(base)
  const petitionExternal = petition.startsWith('http')

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => setMenuOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const followLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (clientNavigate(event, href, navigate)) closeMenu()
  }

  return (
    <header
      className="fixed top-0 right-0 left-0 z-40 bg-lime"
      style={
        pinned
          ? undefined
          : {
              opacity: 'var(--hero-nav-in, 0)',
              transform: 'translateY(calc((1 - var(--hero-nav-in, 0)) * -100%))',
            }
      }
    >
      <nav className="section-shell flex h-[72px] items-center justify-between lg:h-[105px]">
        <a
          href={`${base}#home`}
          className="flex items-center gap-[13px] lg:w-[260px]"
          onClick={(e) => {
            const href = `${base}#home`
            if (!clientNavigate(e, href, navigate)) {
              handleHomeNavClick(e, base, href)
            }
            closeMenu()
          }}
        >
          <img
            src={POSTER_MARK}
            alt="Tisema"
            width={1080}
            height={1350}
            className="h-[52px] w-[41.6px] object-cover lg:h-[87.75px] lg:w-[70.2px]"
          />
        </a>

        <div className="flex items-center gap-3 lg:gap-[28px]">
          <ul className="hidden items-center gap-[28px] lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={`${base}${link.href}`}
                  onClick={(e) => followLink(e, `${base}${link.href}`)}
                  className={`leading-[28px] whitespace-nowrap text-field transition-opacity hover:opacity-70 ${
                    link.label === 'Timeline'
                      ? 'text-[17.5px]'
                      : 'text-[15.75px]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={petition}
            {...(petitionExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="flex items-center justify-center rounded-[3.5px] bg-oxblood px-[16px] py-[8px] text-[12px] font-semibold whitespace-nowrap text-lime transition-opacity hover:opacity-90 sm:px-[20px] sm:text-[13px] lg:px-[28px] lg:text-[13.78px] lg:leading-[24.5px]"
          >
            Sign the Petition
          </a>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-sm lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-field/10 bg-lime lg:hidden"
        >
          <ul className="section-shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={`${base}${link.href}`}
                  onClick={(e) => followLink(e, `${base}${link.href}`)}
                  className="block py-3 text-[16px] leading-[24px] text-field transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
