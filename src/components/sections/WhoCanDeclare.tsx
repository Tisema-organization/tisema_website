import { AUTHORITIES } from '../../lib/content'
import { Item, Stagger } from '../motion'
import { Eyebrow } from './primitives'

export function WhoCanDeclare() {
  return (
    <section className="w-full bg-paper py-[96px] lg:py-[120px]">
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1164.25px] flex-col gap-[40px] lg:gap-[56px]">
          <div className="flex flex-col gap-[21px]">
            <Eyebrow className="text-field">
              Who Can Declare This National Crisis?{' '}
            </Eyebrow>
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
