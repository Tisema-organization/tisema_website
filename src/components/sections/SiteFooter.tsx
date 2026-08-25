import { POSTER } from '../../lib/assets'
import { Item, Reveal, Stagger, Words } from '../motion'
import {
  FOOTER_BLURB,
  FOOTER_CTA,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
  PETITION_HREF,
} from '../../lib/content'

/**
 * Matches the published site rather than the Figma frame: one oxblood field
 * with no inner border, the appeal on a single centred line, and the petition
 * button stacked underneath it instead of sitting inline beside "Today."
 */
export function SiteFooter() {
  return (
    <footer
      id="petition"
      className="w-full scroll-mt-[105px] bg-oxblood py-[72px] lg:py-[120px]"
    >
      <div className="mx-auto flex w-full max-w-[1014px] flex-col gap-[72px] px-5 lg:gap-[150px]">
        <div className="flex flex-col items-center gap-[32px] lg:gap-[40px]">
          {/* The page's closing appeal — the other place worth landing a
              word at a time. */}
          <h2 className="text-center font-serif text-[clamp(2.25rem,4.3vw,65px)] leading-[1.2] text-paper">
            <Words segments={[{ text: FOOTER_CTA }]} gap={0.05} />
          </h2>

          <Reveal delay={0.35}>
            <a
              href={PETITION_HREF}
              className="flex items-center justify-center rounded-[4px] bg-lime px-[32px] py-[12px] font-serif text-[clamp(1.125rem,1.65vw,25px)] leading-[1.6] whitespace-nowrap text-clay-shadow transition-opacity hover:opacity-90 lg:px-[40px] lg:py-[13px]"
            >
              Sign the Petition
            </a>
          </Reveal>
        </div>

        <Stagger
          className="flex flex-col gap-[56px] lg:flex-row lg:justify-between lg:gap-[120px]"
          gap={0.14}
        >
          <Item className="flex max-w-[520px] flex-col gap-[24px]">
            <div className="flex items-center gap-[10px]">
              <img
                src={POSTER}
                alt=""
                width={1080}
                height={1350}
                className="h-[56px] w-[48px] shrink-0 object-cover"
              />
              <p className="font-serif text-[17px] leading-[28px] whitespace-nowrap text-paper">
                #Tisema
              </p>
            </div>

            <p className="text-[16px] leading-[28px] text-paper capitalize">
              {FOOTER_BLURB}
            </p>

            <ul className="flex flex-wrap items-center gap-[10px]">
              {FOOTER_SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href="#"
                    aria-label={social.label}
                    className="flex size-[32px] items-center justify-center overflow-hidden rounded-[8px] bg-white/15 transition-opacity hover:opacity-80"
                  >
                    <img
                      src={social.src}
                      alt=""
                      width={social.w}
                      height={social.h}
                      className="block h-[18px] w-[18px] object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Item>

          <Item className="flex flex-col gap-[20px]">
            <p className="font-serif text-[21px] leading-normal whitespace-nowrap text-paper">
              Quick links
            </p>
            <ul className="flex flex-col gap-[12px]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[17px] leading-normal whitespace-nowrap text-body-rose transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Item>
        </Stagger>
      </div>
    </footer>
  )
}
