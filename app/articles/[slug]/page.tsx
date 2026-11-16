
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react'
import { ArticleImage } from '@/components/articles/article-image'
import {
  articles,
  getArticleReadingMinutes,
} from '@/app/data/articles/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return { title: 'Article Not Found | Sea Lloyd' }
  }

  return {
    title: `${article.title} | Sea Lloyd Insights`,
    description: article.excerpt,
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params

  const article = articles.find((item) => item.slug === slug)

  if (!article) notFound()

  const readingMinutes = getArticleReadingMinutes(article)

  const relatedArticles = article.relatedArticleIds
    .map((id) => articles.find((item) => item.id === id))
    .filter((item) => item !== undefined)

  const imageSrc = article.image.startsWith('/')
    ? article.image
    : `/${article.image}`

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#2b3386] text-white">

        <div className="absolute inset-0">
          <ArticleImage
            src={imageSrc}
            alt={article.imageAlt}
            priority
            sizes="100vw"
            className="object-cover opacity-30"
            style={{
              objectPosition: article.imagePosition ?? 'center',
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#18205d]/95 via-[#202968]/85 to-[#202968]/55" />

        <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:px-12">

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/75 transition-colors hover:text-[#ff9a5c]"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <div className="mt-16 max-w-[900px] sm:mt-20">

            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff9a5c]">

              <span>{article.category}</span>

              <span className="size-1 rounded-full bg-white/50" />

              <span>{readingMinutes} min read</span>

              {article.publishedAt && (
                <>
                  <span className="size-1 rounded-full bg-white/50" />
                  <time dateTime={article.publishedAt}>
                    {new Intl.DateTimeFormat('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(article.publishedAt))}
                  </time>
                </>
              )}

            </div>

            <h1 className="mt-7 text-[clamp(2.3rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
              {article.title}
            </h1>

            <p className="mt-7 max-w-[720px] text-base leading-8 text-white/80 sm:text-lg">
              {article.excerpt}
            </p>

            <div className="mt-9 flex items-center gap-3 text-xs font-semibold tracking-[0.15em] text-white/70">
              <Clock3 size={16} />
              SEA LLOYD INSIGHTS
            </div>

          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">

        <div className="relative -mt-8 aspect-[16/8] overflow-hidden rounded-xl bg-[#2b3386] shadow-xl sm:-mt-12">

          <ArticleImage
            src={imageSrc}
            alt={article.imageAlt}
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover"
            style={{
              objectPosition: article.imagePosition ?? 'center',
            }}
          />

        </div>

      </section>

      {/* Article Content */}
      <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-12">

        {/* Main Content */}
        <article className="min-w-0">

          <div className="border-l-[3px] border-[#ef7120] pl-6">

            <p className="text-xl leading-[1.8] font-medium text-[#2b3386] sm:text-2xl">
              {article.introduction}
            </p>

          </div>

          <div className="mt-14 space-y-12">

            {article.sections.map((section, index) => (

              <section key={index}>

                <div className="mb-5 flex items-start gap-4">

                  <span className="pt-1 text-xs font-semibold tracking-widest text-[#ef7120]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h2 className="text-2xl leading-tight font-semibold tracking-[-0.035em] text-[#2b3386] sm:text-3xl">
                    {section.heading}
                  </h2>

                </div>

                <div className="space-y-5">

                  {section.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[15px] leading-[1.9] text-[#45556C] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                </div>

                {section.bullets && (
                  <ul className="mt-6 space-y-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-5 sm:p-7">

                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-7 text-[#45556C]">

                        <span className="mt-2 size-2 shrink-0 rounded-full bg-[#ef7120]" />

                        {bullet}

                      </li>
                    ))}

                  </ul>
                )}

                {section.subsections && (
                  <div className="mt-8 space-y-8">

                    {section.subsections.map((subsection, i) => (

                      <div key={i} className="border-l border-[#e2e8f0] pl-5 sm:pl-7">

                        <h3 className="text-lg font-semibold text-[#2b3386] sm:text-xl">
                          {subsection.heading}
                        </h3>

                        <div className="mt-4 space-y-4">

                          {subsection.paragraphs.map((paragraph, j) => (
                            <p
                              key={j}
                              className="text-[15px] leading-[1.9] text-[#45556C]"
                            >
                              {paragraph}
                            </p>
                          ))}

                        </div>

                      </div>

                    ))}

                  </div>
                )}

              </section>

            ))}

          </div>

          {/* Key Takeaways */}
          <section className="mt-16 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:p-9">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef7120]">
              Key Takeaways
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#2b3386]">
              What to Remember
            </h2>

            <ul className="mt-7 space-y-5">

              {article.keyTakeaways.map((item, index) => (

                <li key={index} className="flex gap-4">

                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#2b3386]/[0.07] text-xs font-semibold text-[#2b3386]">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-7 text-[#45556C]">
                    {item}
                  </p>

                </li>

              ))}

            </ul>

          </section>

        </article>

        {/* Sidebar */}
        <aside className="space-y-7">

          <div className="sticky top-8 space-y-7">

            <div className="rounded-xl bg-[#2b3386] p-7 text-white">

              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#ff9a5c]">
                SEA LLOYD INSIGHTS
              </p>

              <h3 className="mt-5 text-2xl font-semibold leading-tight">
                Connecting Perspectives Across Global Trade.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Explore more insights into shipping, maritime connectivity and international logistics.
              </p>

              <Link
                href="/articles"
                className="mt-7 inline-flex items-center gap-2 border-b border-white/50 pb-2 text-[10px] font-semibold tracking-[0.15em] transition-colors hover:border-[#ef7120] hover:text-[#ff9a5c]"
              >
                EXPLORE ALL ARTICLES
                <ArrowUpRight size={14} />
              </Link>

            </div>

            <div className="rounded-xl border border-[#e2e8f0] p-6">

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ef7120]">
                Article Information
              </p>

              <div className="mt-5 space-y-4 text-sm">

                <div>
                  <p className="text-xs text-[#45556C]">Category</p>
                  <p className="mt-1 font-semibold text-[#2b3386]">
                    {article.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#45556C]">Reading Time</p>
                  <p className="mt-1 font-semibold text-[#2b3386]">
                    {readingMinutes} Minutes
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#45556C]">Article Number</p>
                  <p className="mt-1 font-semibold text-[#2b3386]">
                    {article.number}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </aside>

      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (

        <section className="border-t border-[#e2e8f0] bg-[#f8fafc]">

          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef7120]">
              Continue Exploring
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#2b3386] sm:text-4xl">
              Related Insights
            </h2>

            <div className="mt-10 grid gap-7 sm:grid-cols-2">

              {relatedArticles.map((related) => (

                <Link
                  key={related.id}
                  href={`/articles/${related.slug}`}
                  className="group overflow-hidden rounded-xl border border-[#e2e8f0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="relative aspect-[16/9] overflow-hidden bg-[#2b3386]">

                    <ArticleImage
                      src={
                        related.image.startsWith('/')
                          ? related.image
                          : `/${related.image}`
                      }
                      alt={related.imageAlt}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                  </div>

                  <div className="p-6">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#ef7120]">
                      {related.category}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold leading-snug text-[#2b3386] transition-colors group-hover:text-[#ef7120]">
                      {related.title}
                    </h3>

                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#2b3386]">
                      Read Article
                      <ArrowUpRight size={15} />
                    </span>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>

      )}

      {/* Footer CTA */}
      <footer className="bg-[#2b3386] px-5 py-12 text-center text-white sm:py-16">

        <h2 className="text-2xl font-semibold sm:text-3xl">
          Explore More from Sea Lloyd
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
          Discover more perspectives on maritime connectivity, shipping and global logistics.
        </p>

        <Link
          href="/articles"
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#ef7120] px-7 py-3.5 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-white hover:text-[#2b3386]"
        >
          VIEW ALL INSIGHTS
          <ArrowUpRight size={16} />
        </Link>

      </footer>

    </main>
  )
}
