import { STATS } from '../../lib/content'
import { Count, Item, Stagger, Words } from '../motion'

export function Stat() {
  return (
    <section className="w-full bg-field py-[64px] lg:h-[364px] lg:py-0">
      <div className="section-shell flex h-full items-center">
        <Stagger
          className="mx-auto flex w-full max-w-[1157.625px] flex-col gap-10 text-center text-paper sm:flex-row sm:gap-[35px]"
          gap={0.12}
        >
          {STATS.map((stat) => (
            <Item
              key={stat.figure}
              className="flex flex-1 flex-col items-center gap-[21px] sm:pr-[21px]"
            >
              <p className="font-serif text-[clamp(3rem,5.1vw,77px)] leading-normal">
                {/* Numeric figures tick up; "1 in 3" is a phrase, so it lands
                    word by word like the rest of the display type. */}
                {stat.countTo === undefined ? (
                  <Words segments={[{ text: stat.figure }]} gap={0.06} />
                ) : (
                  <Count to={stat.countTo} />
                )}
              </p>
              <p className="text-[15.75px] leading-[34.125px]">{stat.body}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
