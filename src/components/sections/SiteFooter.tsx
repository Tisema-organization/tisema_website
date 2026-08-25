import { POSTER } from '../../lib/assets'
import {
  FOOTER_BLURB,
  FOOTER_CTA_LINE_1,
  FOOTER_CTA_LINE_2,
  FOOTER_LINKS,
  FOOTER_SOCIALS,
  PETITION_HREF,
} from '../../lib/content'

export function SiteFooter() {
  return (
    <footer id="petition" className="w-full scroll-mt-[105px] bg-field">
      <div className="w-full border-[0.875px] border-solid border-clay-flat bg-oxblood py-[64px] lg:py-[80px]">
        <div className="section-shell flex flex-col items-center gap-[80px] lg:gap-[177px]">
          <div className="flex flex-col items-center font-serif text-[clamp(2.5rem,5.42vw,82px)] leading-[1.293] text-paper">
            <p className="text-center">{FOOTER_CTA_LINE_1}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-4">
              <p>{FOOTER_CTA_LINE_2}</p>
              <a
                href={PETITION_HREF}
                className="flex items-center justify-center rounded-[4px] bg-lime px-[28px] py-[10px] font-serif text-[clamp(1.25rem,2.48vw,37.44px)] leading-[1.778] whitespace-nowrap text-clay-shadow transition-opacity hover:opacity-90 lg:px-[46.154px] lg:py-[14.423px]"
              >
                Sign the Petition
              </a>
            </div>
          </div>

          <div className="flex w-full flex-col gap-[56px] lg:flex-row lg:justify-between lg:gap-[120px] lg:px-[36px]">
            <div className="flex max-w-[607px] flex-col gap-[24px]">
              <div className="flex w-[175px] items-center gap-[8.75px]">
                <img
                  src={POSTER}
                  alt=""
                  width={1080}
                  height={1350}
                  className="h-[68.75px] w-[55px] object-cover"
                />
                <p className="font-serif text-[19.25px] leading-[28px] whitespace-nowrap text-paper">
                  #Tisema
                </p>
              </div>

              <div className="flex flex-col gap-[32px] pr-[24px]">
                <p className="max-w-[592px] text-[18px] leading-[34.125px] text-paper capitalize">
                  {FOOTER_BLURB}
                </p>

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
            </div>

            <div className="flex flex-col gap-[24px]">
              <p className="font-serif text-[24px] leading-normal whitespace-nowrap text-paper">
                Quick links
              </p>
              <ul className="flex flex-col gap-[16px]">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[20px] leading-normal whitespace-nowrap text-body-rose transition-opacity hover:opacity-80"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
