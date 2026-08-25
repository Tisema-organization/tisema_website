import {
  AUTHORITIES,
  WHO_CAN_DECLARE_INTRO_QUOTE,
  WHO_CAN_DECLARE_INTRO_REST,
} from '../../lib/content'
import { Eyebrow } from './primitives'

export function WhoCanDeclare() {
  return (
    <section className="w-full bg-paper py-[96px] lg:h-[850px] lg:py-0">
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1164.25px] flex-col gap-[40px] lg:gap-[56px]">
          <div className="flex flex-col gap-[21px]">
            <Eyebrow tone="dark" className="text-field">
              Who Can Declare This National Crisis?{' '}
            </Eyebrow>
            <p className="max-w-[1157.625px] text-[clamp(1.125rem,1.85vw,28px)] leading-[1.5625] text-field">
              <span>{WHO_CAN_DECLARE_INTRO_QUOTE}</span>
              <span>{WHO_CAN_DECLARE_INTRO_REST}</span>
            </p>
          </div>

          <div className="grid gap-[40px] lg:grid-cols-2">
            {AUTHORITIES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-[16px] border-l-[0.875px] border-solid border-clay-core py-[21px] pr-[14px] pl-[32px]"
              >
                <p className="font-serif text-[21px] leading-[35px] text-field">
                  {item.title}
                </p>
                <p className="text-[15.75px] leading-[26.25px] text-oxblood">
                  {item.body}
                </p>
                <p className="text-[15.75px] leading-[21px] font-semibold text-field">
                  {item.verdict}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
