import { POSTER_MARK } from '../../lib/assets'
import { Item, Reveal, Stagger, Words } from '../motion'
import {
  CONTACT_EMAIL,
  FOOTER_BLURB,
  FOOTER_CTA,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
  petitionUrl,
} from '../../lib/content'
import { handleHomeNavClick } from '../../lib/heroSession'
import { clientNavigate, useRouter } from '../../lib/router'

/**
 * Field Dark band carrying an Oxblood panel (160:51/160:52). The appeal and
 * the petition button share one grid cell so the button sits beside "Today."
 * on the second line, which is how the comp overlays them.
 */
export function SiteFooter({ base = '' }: { base?: string } = {}) {
  const { navigate } = useRouter()
  const petition = petitionUrl(base)
  const petitionExternal = petition.startsWith('http')

  return (
    <footer
      id="petition"
      className="w-full scroll-mt-[105px] overflow-clip bg-field"
    >
      <div className="flex w-full flex-col items-center justify-center gap-[72px] border-[0.875px] border-solid border-clay-flat bg-oxblood p-[32px] lg:gap-[177px]">
        <div className="flex w-full flex-col items-center gap-8 lg:gap-10">
          <h2 className="max-w-[900px] text-center font-serif text-[clamp(1.75rem,4vw,56px)] leading-[1.25] text-paper">
            <Words segments={[{ text: FOOTER_CTA }]} gap={0.05} />
          </h2>

          <Reveal className="flex justify-center" delay={0.35}>
            <a
              href={petition}
              {...(petitionExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="flex items-center justify-center rounded-[4px] bg-lime px-6 py-2.5 font-serif text-[clamp(1rem,1.75vw,24px)] whitespace-nowrap text-clay-shadow transition-opacity hover:opacity-90 lg:px-8 lg:py-3"
            >
              Sign the Petition
            </a>
          </Reveal>
        </div>

        <Stagger
          className="flex w-full max-w-[1516px] flex-col gap-[56px] lg:flex-row lg:gap-[384px] lg:px-[120px]"
          gap={0.14}
        >
          <Item className="flex flex-col gap-[24px] lg:w-[607px]">
            <div className="flex w-[175px] items-center gap-[8.75px]">
              <img
                src={POSTER_MARK}
                alt=""
                width={1080}
                height={1350}
                className="h-[68.75px] w-[55px] shrink-0 object-cover"
              />
              <p className="font-serif text-[19.25px] leading-[28px] whitespace-nowrap text-paper">
                #Tisema
              </p>
            </div>

            <div className="flex flex-col gap-[32px] pr-[24px] lg:w-[600px]">
              <p className="max-w-[592px] text-[18px] leading-[34.125px] text-paper capitalize">
                {FOOTER_BLURB}
              </p>

              {/*
                Its own element, deliberately outside the blurb above: that
                paragraph carries `capitalize`, which would render the address
                as "Official@Tisemaethiopia.Com" on screen while the href
                stayed lowercase.
              */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-fit text-[18px] leading-[34.125px] text-paper underline decoration-paper/40 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-paper focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-4 focus-visible:ring-offset-oxblood focus-visible:outline-none"
              >
                {CONTACT_EMAIL}
              </a>

              <ul className="flex flex-wrap items-start gap-[14.045px]">
                {FOOTER_SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href="#"
                      aria-label={social.label}
                      className={
                        social.boxed
                          ? 'flex h-[39px] w-[38px] items-center justify-center overflow-hidden rounded-[7.022px] bg-white/20 p-[7.022px] transition-opacity hover:opacity-80'
                          : 'block transition-opacity hover:opacity-80'
                      }
                    >
                      <img
                        src={social.src}
                        alt=""
                        width={social.w}
                        height={social.h}
                        className="block"
                        style={{
                          width: `${social.w}px`,
                          height: `${social.h}px`,
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Item>

          <Item className="flex flex-col gap-[24px] lg:h-[316px]">
            <p className="font-serif text-[24px] leading-normal whitespace-nowrap text-paper">
              Quick links
            </p>
            <ul className="flex flex-col gap-[16px]">
              {FOOTER_LINKS.map((link) => {
                const href = link.href.startsWith('#')
                  ? `${base}${link.href}`
                  : link.href

                return (
                <li key={link.label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      if (clientNavigate(e, href, navigate)) return
                      if (link.label === 'Home') handleHomeNavClick(e, base, href)
                    }}
                    className="text-[20px] leading-normal whitespace-nowrap text-body-rose transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                </li>
                )
              })}
            </ul>
          </Item>
        </Stagger>
      </div>
    </footer>
  )
}
