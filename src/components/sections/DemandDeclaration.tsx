import { DEMANDS, NOT_ASKING_BODY, NOT_ASKING_TITLE } from '../../lib/content'
import { DEMANDS_PAGE_HREF } from '../../lib/demands'
import { clientNavigate, useRouter } from '../../lib/router'
import { Item, Reveal, Stagger } from '../motion'
import { Eyebrow } from './primitives'

export function DemandDeclaration() {
  const { navigate } = useRouter()

  return (
    <section className="w-full bg-oxblood py-[96px] lg:py-[120px]">
      <div className="section-shell flex flex-col items-center gap-[56px]">
        <div className="flex w-full max-w-[1192px] flex-col gap-[35px]">
          <Eyebrow className="w-full text-paper">
            The Demand &amp; Declaration
          </Eyebrow>

          <Stagger
            className="grid w-full gap-x-[48px] gap-y-[24px] sm:grid-cols-2"
            gap={0.1}
          >
            {DEMANDS.map((item) => (
              <Item
                key={item.index}
                className="flex flex-col gap-[16px] py-[28px]"
              >
                <div className="flex flex-col justify-center gap-[16px] font-serif text-paper">
                  <p className="text-[clamp(2.5rem,4.17vw,63px)] leading-normal whitespace-nowrap text-lime">
                    {item.index}
                  </p>
                  <p className="text-[20px] leading-normal">{item.title}</p>
                </div>
                <p className="text-[16px] leading-[28px] text-paper lg:text-[18px] lg:leading-[34.125px]">
                  {item.body}
                </p>
              </Item>
            ))}
          </Stagger>

          <Reveal className="flex justify-center" delay={0.2}>
            <a
              href={DEMANDS_PAGE_HREF}
              onClick={(e) => clientNavigate(e, DEMANDS_PAGE_HREF, navigate)}
              className="inline-flex items-center justify-center gap-[14px] rounded-[4px] border border-solid border-lime px-4 py-1 font-serif text-[18px] leading-[46px] text-lime transition-opacity hover:opacity-80"
            >
              View Demands Page
              <span aria-hidden>↗</span>
            </a>
          </Reveal>
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
