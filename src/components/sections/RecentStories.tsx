import {
  BLOGS_PAGE_HREF,
  RECENT_STORIES,
  RECENT_STORIES_INTRO,
  RECENT_STORIES_TITLE,
} from '../../lib/blogs'
import { clientNavigate, useRouter } from '../../lib/router'
import { Item, Reveal, Stagger } from '../motion'
import { BandTitle } from './primitives'

export function RecentStories() {
  const { navigate } = useRouter()

  return (
    <section
      id="recent-stories"
      className="w-full scroll-mt-[105px] bg-paper py-[96px]"
    >
      <div className="section-shell">
        <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[56px]">
          <div className="flex flex-col gap-6 text-field lg:flex-row lg:items-start lg:justify-between lg:gap-[48px]">
            <BandTitle
              text={RECENT_STORIES_TITLE}
              className="whitespace-nowrap lg:leading-[60px]"
            />
            <Reveal className="max-w-[632px] flex-1" delay={0.15}>
              <p className="text-[16px] leading-[30px] lg:text-[18px] lg:leading-[34px]">
                {RECENT_STORIES_INTRO}
              </p>
            </Reveal>
          </div>

          <Stagger
            className="grid gap-[31px] sm:grid-cols-2 lg:grid-cols-3"
            gap={0.08}
          >
            {RECENT_STORIES.map((post) => (
              <Item
                key={post.id}
                className="flex flex-col overflow-hidden rounded-[16px]"
              >
                <div className="relative h-[220px] overflow-hidden rounded-[20px] bg-[#f5f5f4] lg:h-[266px]">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="size-full object-cover"
                  />
                  <span className="absolute top-[12px] left-[12px] rounded-full bg-oxblood px-[10px] py-[4px] text-[10px] font-bold tracking-[0.05em] text-paper uppercase">
                    {post.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-[12px] p-[24px]">
                  <h3 className="font-serif text-[20px] leading-[28px] text-field">
                    {post.title}
                  </h3>
                  <p className="text-[14px] leading-[22px] text-oxblood">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#f3efe6] px-[24px] pt-[12px] pb-[24px]">
                  <p className="text-[12px] text-oxblood/70">{post.meta}</p>
                  <a
                    href={BLOGS_PAGE_HREF}
                    onClick={(e) =>
                      clientNavigate(e, BLOGS_PAGE_HREF, navigate)
                    }
                    className="text-[12px] font-bold text-oxblood transition-opacity hover:opacity-70"
                  >
                    Read More ↗
                  </a>
                </div>
              </Item>
            ))}
          </Stagger>

          <Reveal className="flex justify-center" delay={0.1}>
            <a
              href={BLOGS_PAGE_HREF}
              onClick={(e) => clientNavigate(e, BLOGS_PAGE_HREF, navigate)}
              className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-solid border-oxblood px-6 py-3 font-serif text-[17px] leading-[28px] text-oxblood transition-opacity hover:opacity-80"
            >
              View all stories
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
