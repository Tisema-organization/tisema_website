import { STATS } from '../../lib/content'

export function Stat() {
  return (
    <section className="w-full bg-field py-[64px] lg:h-[364px] lg:py-0">
      <div className="section-shell flex h-full items-center">
        <div className="mx-auto flex w-full max-w-[1157.625px] flex-col gap-10 text-center text-paper sm:flex-row sm:gap-[35px]">
          {STATS.map((stat) => (
            <div
              key={stat.figure}
              className="flex flex-1 flex-col items-center gap-[21px] sm:pr-[21px]"
            >
              <p className="font-serif text-[clamp(3rem,5.1vw,77px)] leading-normal">
                {stat.figure}
              </p>
              <p className="text-[15.75px] leading-[34.125px]">{stat.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
