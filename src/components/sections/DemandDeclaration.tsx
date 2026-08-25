import { DEMANDS, NOT_ASKING_BODY, NOT_ASKING_TITLE } from '../../lib/content'
import { Eyebrow } from './primitives'

export function DemandDeclaration() {
  return (
    <section className="w-full bg-field py-[96px] lg:py-[120px]">
      <div className="section-shell flex flex-col items-center gap-[56px]">
        <div className="flex w-full max-w-[1129px] flex-col gap-[35px]">
          <Eyebrow tone="paper" className="w-full text-paper">
            The Demand &amp; Declaration
          </Eyebrow>

          <div className="grid w-full max-w-[1094px] gap-y-[8px] lg:grid-cols-2 lg:gap-x-[16px]">
            {DEMANDS.map((item) => (
              <div
                key={item.index}
                className="flex flex-col gap-[16px] px-[24px] py-[28px] lg:px-[42px]"
              >
                <div className="flex flex-col justify-center gap-[16px] font-serif whitespace-nowrap text-paper">
                  <p className="text-[clamp(2.5rem,4.17vw,63px)] leading-normal">
                    {item.index}
                  </p>
                  <p className="text-[26px] leading-normal">{item.title}</p>
                </div>
                <p className="text-[18px] leading-[34.125px] text-body-rose">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-[1213.625px] flex-col gap-[21px] border-[0.875px] border-solid border-clay-flat bg-oxblood/15 p-[28px]">
          <Eyebrow tone="paper" className="text-paper">
            {NOT_ASKING_TITLE}
          </Eyebrow>
          <p className="max-w-[1157.625px] text-[clamp(1rem,1.27vw,19.25px)] leading-[34.125px] text-paper">
            {NOT_ASKING_BODY}
          </p>
        </div>
      </div>
    </section>
  )
}
