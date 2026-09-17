import { STATS } from '../../lib/content'
import { Count, Item, Stagger, Words } from '../motion'

export function Stat() {
  return (
    <section className="w-full bg-oxblood py-[64px] lg:min-h-[364px] lg:py-[64px]">
      <div className="section-shell flex h-full items-center">
        <Stagger
          className="mx-auto flex w-full max-w-[1157.625px] flex-col gap-10 text-center text-paper sm:flex-row sm:items-start sm:gap-[35px]"
          gap={0.12}
        >
          {STATS.map((stat, index) => (
            <Item
              key={stat.figure}
              className="flex flex-1 flex-col items-center gap-[18px] sm:pr-[21px]"
            >
              <p className="font-serif text-[clamp(2.75rem,4.37vw,66px)] leading-normal">
                {stat.countTo === undefined ? (
                  <Words segments={[{ text: stat.figure }]} gap={0.06} />
                ) : (
                  <Count to={stat.countTo} suffix={stat.suffix ?? ''} />
                )}
              </p>
              <div className="flex max-w-[340px] flex-col gap-3">
                <p className="text-[15.75px] leading-[27px]">{stat.body}</p>
                <p className="text-center text-[12px] leading-[20px] text-paper/70">
                  <sup className="mr-1 font-semibold text-lime">[{index + 1}]</sup>
                  <a
                    href={stat.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-paper/30 underline-offset-2 transition-colors hover:text-paper hover:decoration-paper"
                  >
                    {stat.source}
                  </a>
                </p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
