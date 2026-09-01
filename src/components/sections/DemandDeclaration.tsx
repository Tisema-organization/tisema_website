import { DEMANDS, NOT_ASKING_BODY, NOT_ASKING_TITLE } from '../../lib/content'
import { Item, Reveal, Stagger } from '../motion'
import { Eyebrow } from './primitives'

export function DemandDeclaration() {
  return (
    <section className="w-full bg-oxblood py-[96px] lg:py-[120px]">
      <div className="section-shell flex flex-col items-center gap-[56px]">
        <div className="flex w-full max-w-[1192px] flex-col gap-[35px]">
          <Eyebrow className="w-full text-paper">
            The Demand &amp; Declaration
          </Eyebrow>

          <Stagger
            className="grid w-full gap-x-[24px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-4"
            gap={0.1}
          >
            {DEMANDS.map((item) => (
              <Item
                key={item.index}
                className="flex flex-col gap-[12px] py-[28px]"
              >
                <div className="flex flex-col justify-center gap-[12px] font-serif text-paper">
                  <p className="text-[clamp(2.5rem,4.17vw,63px)] leading-normal whitespace-nowrap text-lime">
                    {item.index}
                  </p>
                  <p className="text-[20px] leading-normal">{item.title}</p>
                </div>
                <p className="text-[16px] leading-[28px] text-body-rose">
                  {item.body}
                </p>
              </Item>
            ))}
          </Stagger>
        </div>

        <Reveal className="flex w-full max-w-[1192px] flex-col gap-[21px] border-[0.875px] border-solid border-clay-flat bg-oxblood/15 p-[28px]">
          <Eyebrow className="text-lime">{NOT_ASKING_TITLE}</Eyebrow>
          <p className="max-w-[1157.625px] text-[clamp(1rem,1.27vw,19.25px)] leading-[34.125px] text-paper">
            {NOT_ASKING_BODY}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
