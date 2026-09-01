import { WHOLE_OF_GOVERNMENT } from '../../lib/content'
import { Item, Stagger } from '../motion'
import { Eyebrow } from './primitives'

export function WholeOfGovernment() {
  return (
    <section className="w-full bg-paper py-[96px] lg:h-[593.25px] lg:py-0">
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1186.5px] flex-col gap-[35px]">
          <Eyebrow className="justify-center text-field">
            What “Whole-of-Government” Means
          </Eyebrow>

          <Stagger className="flex flex-col items-stretch gap-4 lg:flex-row">
            {WHOLE_OF_GOVERNMENT.map((card) => (
              <Item
                key={card.title}
                className="flex flex-1 flex-col items-center gap-[21px] rounded-[8px] bg-oxblood/5 p-[28px] text-center text-field lg:p-[42px]"
              >
                <p className="font-serif text-[26px] leading-normal">
                  {card.title}
                </p>
                <p className="text-[18px] leading-[34.125px]">{card.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
