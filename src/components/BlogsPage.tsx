import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import {
  BLOG_FEATURED,
  BLOG_RECENT,
  BLOGS_PAGE_INTRO,
  BLOGS_PAGE_TITLE,
} from '../lib/blogs'
import { clientNavigate, useRouter } from '../lib/router'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './sections/SiteFooter'
import { Item, Reveal, Stagger } from './motion'

export function BlogsPage() {
  const { navigate } = useRouter()

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-paper">
          <SiteNav pinned base="/" />

          <main className="pt-[72px] lg:pt-[105px]">
            <div className="section-shell py-[56px] lg:py-[96px]">
              <div className="mx-auto flex w-full max-w-[1253.875px] flex-col gap-[64px]">
                <header className="flex flex-col gap-[24px]">
                  <a
                    href="/"
                    onClick={(e) => clientNavigate(e, '/', navigate)}
                    className="w-fit font-serif text-[15.75px] leading-[28px] text-oxblood transition-opacity hover:opacity-70"
                  >
                    ← Back to home
                  </a>

                  <Reveal>
                    <h1 className="font-serif text-[clamp(2.25rem,4.3vw,48px)] leading-[1.15] text-field">
                      {BLOGS_PAGE_TITLE}
                    </h1>
                  </Reveal>

                  <Reveal delay={0.06}>
                    <p className="max-w-[1084px] text-[18px] leading-[32px] text-field">
                      {BLOGS_PAGE_INTRO}
                    </p>
                  </Reveal>
                </header>

                <Reveal delay={0.08}>
                  <article className="overflow-hidden rounded-[24px] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] lg:grid lg:grid-cols-2">
                    <div className="relative min-h-[320px] overflow-hidden bg-field lg:min-h-[520px]">
                      <img
                        src={BLOG_FEATURED.image}
                        alt={BLOG_FEATURED.imageAlt}
                        className="absolute inset-0 size-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                      <span className="absolute top-[16px] left-[16px] rounded-full bg-oxblood px-[12px] py-[4px] text-[11px] font-bold tracking-[0.05em] text-lime uppercase">
                        {BLOG_FEATURED.badge}
                      </span>
                      <p className="absolute right-[16px] bottom-[16px] left-[16px] font-mono text-[12px] text-white/80">
                        {BLOG_FEATURED.caption}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between gap-[24px] p-[32px] lg:p-[48px]">
                      <div className="flex flex-col gap-[12px]">
                        <p className="text-[11px] font-bold tracking-[0.1em] text-oxblood uppercase">
                          {BLOG_FEATURED.eyebrow}
                        </p>
                        <h2 className="font-serif text-[clamp(1.5rem,2.5vw,36px)] leading-[1.15] text-field">
                          {BLOG_FEATURED.title}
                        </h2>
                        <p className="text-[16px] leading-[24px] text-oxblood">
                          {BLOG_FEATURED.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-col gap-[16px] border-t border-[#e7e2d6] pt-[24px] sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[12px] font-bold text-field">
                            {BLOG_FEATURED.author}
                          </p>
                          <p className="text-[11px] text-oxblood/70">
                            {BLOG_FEATURED.meta}
                          </p>
                        </div>
                        <span className="inline-flex w-fit items-center rounded-full bg-oxblood px-[24px] py-[12px] text-[12px] font-semibold text-paper">
                          Read the full story
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>

                <section className="flex flex-col gap-[40px]">
                  <h2 className="font-serif text-[clamp(2rem,3.5vw,48px)] leading-[1.15] text-field">
                    Recent Blogs
                  </h2>

                  <Stagger
                    className="grid gap-[31px] sm:grid-cols-2 lg:grid-cols-3"
                    gap={0.08}
                  >
                    {BLOG_RECENT.map((post) => (
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
                          <span className="text-[12px] font-bold text-oxblood">
                            Read More ↗
                          </span>
                        </div>
                      </Item>
                    ))}
                  </Stagger>
                </section>
              </div>
            </div>
          </main>

          <SiteFooter base="/" />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
