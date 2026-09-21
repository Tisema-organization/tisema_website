import { POSTER_MARK } from '../../lib/assets'
import { Item, Reveal, Stagger, Words } from '../motion'
import {
  CONTACT_EMAIL,
  FOOTER_BLURB,
  FOOTER_COPYRIGHT,
  FOOTER_CTA,
  // FOOTER_HELP,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
  petitionUrl,
} from '../../lib/content'
import { handleHomeNavClick } from '../../lib/heroSession'
import { RESOURCES_PAGE_HREF } from '../../lib/resources'
import { clientNavigate, useRouter } from '../../lib/router'

/**
 * Field Dark band with Oxblood panel (Figma footer 208:473).
 * CTA + petition, then company / quick links / survivor resources.
 */
export function SiteFooter({ base = '' }: { base?: string } = {}) {
  const { navigate } = useRouter()
  const petition = petitionUrl(base)
  const petitionExternal = petition.startsWith('http')

  return (
    <footer
      id="petition"
      className="w-full scroll-mt-[68px] overflow-clip bg-field"
    >
      <div className="flex w-full flex-col items-center justify-center gap-[72px] border-[0.875px] border-solid border-clay-flat bg-oxblood p-[32px] lg:gap-[114px]">
        <div className="flex w-full flex-col items-center gap-8 lg:gap-[23px]">
          <h2 className="max-w-[720px] text-center font-serif text-[clamp(1.5rem,3vw,40px)] leading-[1.25] text-paper">
            <Words segments={[{ text: FOOTER_CTA }]} gap={0.05} />
          </h2>

          <Reveal className="flex justify-center" delay={0.35}>
            <a
              href={petition}
              {...(petitionExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="flex items-center justify-center rounded-[4px] bg-lime px-6 py-2.5 font-serif text-[15px] leading-[24px] whitespace-nowrap text-clay-shadow transition-opacity hover:opacity-90 sm:text-[16px] lg:px-8 lg:py-3 lg:text-[17px] lg:leading-[28px]"
            >
              Take Action
            </a>
          </Reveal>
        </div>

        <div className="flex w-full max-w-[1516px] flex-col gap-[32px]">
          <Stagger
            className="flex w-full flex-col gap-[40px] lg:flex-row lg:items-start lg:justify-between lg:gap-[32px] lg:px-[120px]"
            gap={0.12}
          >
            <Item className="flex flex-col gap-[24px] lg:w-[428px]">
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

              <div className="flex flex-col gap-[32px] pr-[24px]">
                <p className="max-w-[459px] text-[16px] leading-[26px] text-paper capitalize lg:text-[18px] lg:leading-[34px]">
                  {FOOTER_BLURB}
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="w-fit text-[16px] leading-[26px] text-paper underline decoration-paper/40 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-paper focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-4 focus-visible:ring-offset-oxblood focus-visible:outline-none lg:text-[18px] lg:leading-[34px]"
                >
                  {CONTACT_EMAIL}
                </a>

                <ul className="flex flex-wrap items-start gap-[8px]">
                  {FOOTER_SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={
                          social.boxed
                            ? 'flex h-[34px] w-[33px] items-center justify-center overflow-hidden rounded-[6px] bg-white/20 p-[6px] transition-opacity hover:opacity-80'
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

            <Item className="flex flex-col gap-[24px]">
              <p className="font-serif text-[18px] leading-normal whitespace-nowrap text-paper lg:text-[24px]">
                Quick links
              </p>
              <ul className="flex flex-col gap-[12px]">
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
                          if (link.label === 'Home')
                            handleHomeNavClick(e, base, href)
                        }}
                        className="text-[16px] leading-normal text-body-rose transition-opacity hover:opacity-80 lg:text-[20px]"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </Item>

            <Item className="flex w-full flex-col gap-[14px] rounded-[16px] border border-white/10 bg-white/5 p-[20px] sm:p-[24px] lg:w-[427px]">
              <div>
                <p className="font-serif text-[18px] leading-[24px] text-paper lg:text-[21px]">
                  Emergency Contacts
                </p>
                <p className="mt-1 text-[11px] leading-[16px] text-body-rose">
                  ለአስቸኳይ ጊዜ የእርዳታ ስልክ ቁጥሮች
                </p>
              </div>

              <div className="flex flex-col gap-[7px] rounded-[10px] bg-field/20 px-[16px] py-[13px]">
                <div className="flex items-center gap-2 text-[13px] leading-[18px]">
                  <span className="font-semibold text-paper">Police</span>
                  <span className="text-body-rose" aria-hidden>•</span>
                  <a href="tel:991" className="font-bold text-lime hover:underline">
                    991
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[13px] leading-[18px]">
                  <span className="font-semibold text-paper">EWLA</span>
                  <span className="text-body-rose" aria-hidden>•</span>
                  <a href="tel:7711" className="font-bold text-lime hover:underline">
                    7711
                  </a>
                </div>
              </div>

              <a
                href={RESOURCES_PAGE_HREF}
                onClick={(e) => clientNavigate(e, RESOURCES_PAGE_HREF, navigate)}
                className="flex items-center justify-center gap-2 self-end rounded-[3px] border border-lime px-5 py-2 text-[12px] font-bold text-lime transition-colors hover:bg-lime hover:text-field"
              >
                View All Contacts
                <span aria-hidden>↗</span>
              </a>
            </Item>
          </Stagger>

          <div className="flex flex-col gap-[12px] border-t border-white/10 pt-[24px] sm:flex-row sm:items-center sm:justify-between lg:px-[118px]">
            <p className="text-[12px] leading-[16px] text-[#a8a29e]">
              {FOOTER_COPYRIGHT}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
