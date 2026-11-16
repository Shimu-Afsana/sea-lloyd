
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ArticleImage } from '@/components/articles/article-image'
import { getArticleReadingMinutes, type Article } from '@/app/data/articles/articles'

export function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <main className="min-h-screen bg-white">
      <style>{'@keyframes article-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }'}</style>

      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-14 lg:pb-20 lg:pt-24">

      
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">

          <div className="max-w-[720px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ef7120]">
              Sea Lloyd Insights
            </p>

            <h1 className="mt-5 max-w-[780px] text-[clamp(2.65rem,6vw,5.15rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-[#2b3386] [text-wrap:balance]">
              Knowledge That Connects Global Trade.
            </h1>

            <span
              className="mt-7 block h-[3px] w-14 bg-[#ef7120]"
              aria-hidden="true"
            />

            <p className="mt-6 max-w-[650px] text-base leading-7 text-[#45556C] sm:text-lg sm:leading-8">
              Explore perspectives on maritime connectivity, international
              shipping, intermodal logistics, specialized cargo, and the
              developments shaping global trade.
            </p>
          </div>

          <div className="relative isolate min-w-0">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-md bg-[#2b3386] sm:aspect-[16/10] lg:aspect-[5/4]">

              <Image
                src="/sea-lloyd-insights-hero.jpg"
                alt="Container vessel sailing across the ocean at sunset"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#17205f]/30 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef7120]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  Connecting Global Trade
                </span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 border-b-[3px] border-r-[3px] border-[#ef7120]/60" />
          </div>

        </div>

        <div className="mt-12 grid gap-x-8 gap-y-11 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 lg:mt-20 lg:gap-x-10">

          {articles.map((article, index) => {
            const featured = index === 0
            const readingMinutes = getArticleReadingMinutes(article)

            return (
              <article
                key={article.id}
                style={{
                  animationDelay: `${Math.min(index * 80, 320)}ms`,
                }}
                className={`group min-w-0 animate-[article-in_500ms_ease-out_both] motion-reduce:animate-none ${featured ? 'sm:col-span-2' : ''}`}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]"
                >
                  <div
                    className={`relative isolate overflow-hidden rounded-md bg-[#2b3386] ${featured ? 'aspect-[16/8] sm:aspect-[2.15/1]' : 'aspect-[16/10]'}`}
                  >
                    <ArticleImage
                      src={article.image}
                      alt={article.imageAlt}
                      priority={index < 2}
                      sizes={
                        featured
                          ? '(max-width: 640px) 100vw, 90vw'
                          : '(max-width: 640px) 100vw, 45vw'
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                      style={{
                        objectPosition: article.imagePosition ?? 'center',
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#17205f]/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-[#2b3386]/45 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:left-6 sm:top-6">
                      {featured ? 'Featured story' : article.category}
                    </span>

                    <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/65 bg-[#2b3386]/35 text-white transition-all duration-300 group-hover:border-[#ef7120] group-hover:bg-[#ef7120] sm:bottom-6 sm:right-6 sm:size-12">
                      <ArrowUpRight aria-hidden="true" size={19} />
                    </span>

                    <span className="absolute bottom-5 left-5 text-[11px] font-medium tracking-[0.18em] text-white/85 sm:bottom-7 sm:left-7">
                      {article.number}
                      <span className="mx-2 text-white/50">/</span>
                      {String(articles.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    className={`flex items-start justify-between gap-5 ${featured ? 'pt-6 sm:pt-8' : 'pt-5'}`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ef7120]">
                        <span>{article.category}</span>

                        {article.publishedAt && (
                          <>
                            <span
                              aria-hidden="true"
                              className="size-1 rounded-full bg-[#e2e8f0]"
                            />

                            <time dateTime={article.publishedAt}>
                              {new Intl.DateTimeFormat('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }).format(new Date(article.publishedAt))}
                            </time>
                          </>
                        )}

                        <span
                          aria-hidden="true"
                          className="size-1 rounded-full bg-[#e2e8f0]"
                        />

                        <span>{readingMinutes} min read</span>
                      </div>

                      <h2
                        className={`mt-3 max-w-[850px] font-semibold leading-[1.14] tracking-[-0.035em] text-[#2b3386] transition-colors duration-300 group-hover:text-[#ef7120] ${featured ? 'text-[clamp(1.8rem,4vw,3.25rem)]' : 'text-[clamp(1.4rem,2.8vw,2rem)]'}`}
                      >
                        {article.title}
                      </h2>

                      <p
                        className={`mt-3 max-w-[760px] leading-7 text-[#45556C] ${featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
                      >
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 border-b border-[#2b3386]/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2b3386] transition-colors group-hover:border-[#ef7120] group-hover:text-[#ef7120]">
                    Read article
                    <ArrowUpRight
                      aria-hidden="true"
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>

                <div className="mt-7 border-b border-[#e2e8f0] sm:mt-9" />
              </article>
            )
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#2b3386] px-5 py-8 text-white sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold tracking-[0.2em] text-white">
            SEA LLOYD
          </span>

          <span>Stories that connect global trade.</span>

          <span>Editorial drafts for informational purposes.</span>
        </div>
      </footer>
    </main>
  )
}
