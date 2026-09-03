import {
  AUTHORITIES,
  WHO_CAN_DECLARE_INTRO_QUOTE,
  WHO_CAN_DECLARE_INTRO_REST,
} from '../../lib/content'
import { Item, Reveal, Stagger } from '../motion'
import { Eyebrow } from './primitives'

export function WhoCanDeclare() {
  return (
    <section className="w-full bg-paper py-[96px] lg:h-[956px] lg:py-0">
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1164.25px] flex-col gap-[40px] lg:gap-[56px]">
          <div className="flex flex-col gap-[21px]">
            <Eyebrow className="text-field">
              Who Can Declare This National Crisis?{' '}
            </Eyebrow>
            <Reveal delay={0.15}>
              <p className="max-w-[1157.625px] text-[clamp(1.125rem,1.85vw,28px)] leading-[1.5625] text-field">
                <span>{WHO_CAN_DECLARE_INTRO_QUOTE}</span>
                <span>{WHO_CAN_DECLARE_INTRO_REST}</span>
              </p>
            </Reveal>
          </div>

          <Stagger className="grid gap-[40px] lg:grid-cols-2" gap={0.1}>
            {AUTHORITIES.map((item) => (
              <Item
                key={item.title}
                className="flex flex-col gap-[16px] border-l-[0.875px] border-solid border-clay-core py-[21px] pr-[14px] pl-[32px]"
              >
                {/* Due dates are not final — hide until confirmed.
                <p className="h-[24px] text-[14px] leading-[26.25px] text-oxblood">
                  {item.due}
                </p>
                */}
                <p className="font-serif text-[21px] leading-[35px] text-field">
                  {item.title}
                </p>
                <p className="text-[15.75px] leading-[26.25px] text-oxblood">
                  {item.body}
                </p>
                <p className="text-[15.75px] leading-[21px] font-semibold text-field">
                  {item.verdict}
                </p>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
