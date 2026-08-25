import { DEMANDS, NOT_ASKING_BODY, NOT_ASKING_TITLE } from '../../lib/content'
import { Item, Reveal, Stagger } from '../motion'
import { Eyebrow } from './primitives'

export function DemandDeclaration() {
  return (
    <section className="w-full bg-field py-[96px] lg:py-[120px]">
      <div className="section-shell flex flex-col items-center gap-[56px]">
        <div className="flex w-full max-w-[1213.625px] flex-col gap-[35px]">
          <Eyebrow className="w-full text-paper">
            The Demand &amp; Declaration
          </Eyebrow>

          <Stagger
            className="grid w-full gap-x-[32px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-4"
            gap={0.1}
          >
            {DEMANDS.map((item) => (
              <Item
                key={item.index}
                className="flex flex-col gap-[12px] py-[28px]"
              >
                <div className="flex flex-col justify-center gap-[12px] font-serif text-paper">
                  <p className="text-[clamp(2.5rem,3.5vw,53px)] leading-normal whitespace-nowrap text-lime">
                    {item.index}
                  </p>
                  <p className="text-[21px] leading-[1.35]">{item.title}</p>
                </div>
                <p className="text-[16px] leading-[28px] text-body-rose">
                  {item.body}
                </p>
              </Item>
            ))}
          </Stagger>
        </div>

        <Reveal className="flex w-full max-w-[1213.625px] flex-col gap-[16px] rounded-[10px] border-[0.875px] border-solid border-clay-flat bg-transparent px-[28px] py-[24px]">
          <Eyebrow className="text-lime">{NOT_ASKING_TITLE}</Eyebrow>
          <p className="max-w-[1157.625px] text-[clamp(0.9375rem,1.06vw,16px)] leading-[28px] text-paper">
            {NOT_ASKING_BODY}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
