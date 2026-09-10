import { POSTER_MARK } from '../../lib/assets'
import { Item, Reveal, Stagger, Words } from '../motion'
import {
  CONTACT_EMAIL,
  FOOTER_BLURB,
  FOOTER_COPYRIGHT,
  FOOTER_CTA,
  FOOTER_HELP,
  FOOTER_LEGAL,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
  petitionUrl,
} from '../../lib/content'
import { handleHomeNavClick } from '../../lib/heroSession'
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
      className="w-full scroll-mt-[105px] overflow-clip bg-field"
    >
      <div className="flex w-full flex-col items-center justify-center gap-[72px] border-[0.875px] border-solid border-clay-flat bg-oxblood p-[32px] lg:gap-[114px]">
        <div className="flex w-full flex-col items-center gap-8 lg:gap-[23px]">
          <h2 className="max-w-[900px] text-center font-serif text-[clamp(1.75rem,4vw,56px)] leading-[1.25] text-paper lg:text-[72px] lg:leading-[106px]">
            <Words segments={[{ text: FOOTER_CTA }]} gap={0.05} />
          </h2>

          <Reveal className="flex justify-center" delay={0.35}>
            <a
              href={petition}
              {...(petitionExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="flex items-center justify-center rounded-[4px] bg-lime px-6 py-2.5 font-serif text-[clamp(1rem,1.75vw,24px)] whitespace-nowrap text-clay-shadow transition-opacity hover:opacity-90 lg:px-[46px] lg:py-[14px] lg:text-[34.56px] lg:leading-[66px]"
            >
              Sign the Petition
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

            <Item className="flex w-full flex-col gap-[12px] rounded-[16px] border border-white/10 bg-white/5 p-[25px] lg:w-[427px]">
              <div className="flex items-center justify-between gap-[12px]">
                <p className="text-[12px] font-bold tracking-[0.12em] text-lime uppercase">
                  {FOOTER_HELP.title}
                </p>
                <span className="rounded-full border border-lime/30 bg-lime/20 px-[9px] py-[3px] text-[10px] font-bold tracking-[0.05em] text-lime uppercase">
                  {FOOTER_HELP.badge}
                </span>
              </div>

              <div className="flex flex-col gap-[4px] rounded-[12px] border border-lime/40 bg-oxblood/80 p-[13px]">
                <p className="text-[11px] tracking-[0.05em] text-[#d6d3d1] uppercase">
                  {FOOTER_HELP.helplineLabel}
                </p>
                <div className="flex flex-wrap items-center gap-[8px]">
                  <a
                    href={`tel:${FOOTER_HELP.tollFreeTel}`}
                    className="font-serif text-[16px] leading-[24px] text-lime"
                  >
                    {FOOTER_HELP.tollFree}
                  </a>
                  <span className="text-[12px] text-[#a8a29e]" aria-hidden>
                    •
                  </span>
                  <a
                    href={`tel:${FOOTER_HELP.phoneTel}`}
                    className="font-mono text-[12px] leading-[16px] text-[#e7e5e4]"
                  >
                    {FOOTER_HELP.phone}
                  </a>
                </div>
              </div>

              <ul className="flex flex-col gap-[8px] pt-[4px]">
                {FOOTER_HELP.lines.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-start justify-between gap-[12px]"
                  >
                    <span className="text-[12px] leading-[16px] text-[#d6d3d1]">
                      {line.label}
                    </span>
                    <a
                      href={`tel:${line.tel}`}
                      className="shrink-0 text-[12px] leading-[16px] whitespace-nowrap text-lime"
                    >
                      {line.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Item>
          </Stagger>

          <div className="flex flex-col gap-[12px] border-t border-white/10 pt-[24px] sm:flex-row sm:items-center sm:justify-between lg:px-[118px]">
            <p className="text-[12px] leading-[16px] text-[#a8a29e]">
              {FOOTER_COPYRIGHT}
            </p>
            <ul className="flex flex-wrap gap-[16px]">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => clientNavigate(e, link.href, navigate)}
                    className="text-[12px] leading-[16px] text-[#a8a29e] transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
