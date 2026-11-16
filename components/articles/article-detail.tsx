import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Home } from 'lucide-react'
import { ArticleImage } from '@/components/articles/article-image'
import { getArticleReadingMinutes, type Article } from '@/app/data/articles/articles'
import { getPortsByIds } from '@/app/data/articles/port'

export function ArticleDetail({ article, relatedArticles }: { article: Article; relatedArticles: Article[] }) {
  const ports = getPortsByIds(article.relatedPortIds)
  const readingMinutes = getArticleReadingMinutes(article)

  return (
    <main className="min-h-screen bg-white text-[#45556C]">
      <style>{'@keyframes article-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }'}</style>
      <header className="border-b border-[#e2e8f0]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-14">
          <Link href="/articles" aria-label="Sea Lloyd Insights" className="inline-flex items-center gap-3 text-[#2b3386] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]">
            <span className="grid size-10 place-items-center rounded-full border border-[#2b3386]/25 text-xs font-semibold">SL</span>
            <span className="flex flex-col leading-none"><span className="text-sm font-semibold tracking-[0.19em]">SEA LLOYD</span><span className="mt-1.5 text-[9px] tracking-[0.28em] text-[#45556C]">INSIGHTS</span></span>
          </Link>
          <Link href="/articles" className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2b3386] transition-colors hover:text-[#ef7120] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]"><ArrowLeft aria-hidden="true" size={15} /> All articles</Link>
        </div>
      </header>

      <article>
        <div className="mx-auto max-w-[1440px] px-5 pt-7 sm:px-8 sm:pt-10 lg:px-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] text-[#45556C]">
            <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#ef7120]"><Home aria-hidden="true" size={13} /> Home</Link>
            <span aria-hidden="true" className="text-[#ef7120]">/</span>
            <Link href="/articles" className="transition-colors hover:text-[#ef7120]">Articles</Link>
            <span aria-hidden="true" className="text-[#ef7120]">/</span>
            <span aria-current="page" className="max-w-[180px] truncate sm:max-w-none">{article.title}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-[900px] px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:pt-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ef7120]">{article.category}</p>
          {article.publishedAt && <time dateTime={article.publishedAt} className="mt-4 block text-sm text-[#45556C]">{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(article.publishedAt))}</time>}
          <h1 className="mt-5 text-[clamp(2.35rem,6vw,4.65rem)] font-semibold leading-[1.07] tracking-[-0.045em] text-[#2b3386] [text-wrap:balance]">{article.title}</h1>
          <div className="mt-6 flex items-center gap-2 text-xs text-[#45556C]"><Clock3 aria-hidden="true" size={14} className="text-[#ef7120]" /> {readingMinutes} min read</div>
          <p className="mt-7 max-w-[760px] text-lg leading-8 text-[#45556C] sm:text-xl sm:leading-9">{article.excerpt}</p>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-[#2b3386] sm:rounded-lg">
            <ArticleImage src={article.image} alt={article.imageAlt} sizes="(max-width: 1440px) 100vw, 1440px" className="object-cover transition-transform duration-700 motion-reduce:transition-none" style={{ objectPosition: article.imagePosition ?? 'center' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17205f]/30 to-transparent" />
          </div>
        </div>

        <div className="mx-auto grid max-w-[1150px] gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,760px)_220px] lg:gap-16 lg:px-10 lg:py-20">
          <div className="min-w-0">
            <p className="mb-10 text-lg leading-8 text-[#45556C] sm:text-xl sm:leading-9">{article.introduction}</p>
            <div className="flex flex-col gap-11 sm:gap-14">
              {article.sections.map((section, index) => (
                <section key={`${article.id}-${section.heading}`} className="animate-[article-in_500ms_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${Math.min(index * 70, 350)}ms` }}>
                  <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#2b3386] sm:text-[28px]">{section.heading}</h2>
                  <div className="mt-5 flex flex-col gap-5 text-[15px] leading-7 sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${section.heading}-paragraph-${paragraphIndex}`}>{paragraph}</p>)}
                  </div>
                  {section.bullets && <ul className="mt-5 flex flex-col gap-3 text-[15px] leading-7 sm:text-base">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span aria-hidden="true" className="mt-[11px] size-1.5 shrink-0 rounded-full bg-[#ef7120]" /><span>{bullet}</span></li>)}</ul>}
                  {section.subsections && <div className="mt-8 flex flex-col gap-7 border-l-2 border-[#ef7120]/70 pl-5 sm:pl-7">{section.subsections.map((subsection) => <div key={subsection.heading}><h3 className="text-lg font-semibold text-[#2b3386] sm:text-xl">{subsection.heading}</h3><div className="mt-3 flex flex-col gap-3 text-[15px] leading-7 sm:text-base sm:leading-8">{subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>)}</div>}
                </section>
              ))}
            </div>

            <section className="mt-14 rounded-md border border-[#e2e8f0] bg-[#f8fafc] p-6 sm:mt-16 sm:p-8" aria-labelledby="key-takeaways-heading">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef7120]">In brief</p>
              <h2 id="key-takeaways-heading" className="mt-2 text-xl font-semibold text-[#2b3386]">Key takeaways</h2>
              <ul className="mt-5 flex flex-col gap-3">{article.keyTakeaways.map((takeaway) => <li key={takeaway} className="flex gap-3 text-sm leading-6"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ef7120]" /><span>{takeaway}</span></li>)}</ul>
            </section>

            {ports.length > 0 && <section className="mt-10" aria-labelledby="related-ports-heading"><h2 id="related-ports-heading" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2b3386]">Related gateways</h2><ul className="mt-3 flex flex-wrap gap-2">{ports.map((port) => <li key={port.id} className="rounded-full border border-[#e2e8f0] px-3.5 py-2 text-xs text-[#45556C]">{port.name} <span className="ml-1 text-[#ef7120]">{port.code}</span></li>)}</ul></section>}
          </div>
          <aside className="lg:pt-2">
            <div className="border-t border-[#e2e8f0] pt-5 lg:border-t-0 lg:border-l lg:pl-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ef7120]">Sea Lloyd Insights</p>
              <p className="mt-3 text-sm leading-6 text-[#45556C]">Perspectives on the ports, people, and planning that keep global trade moving.</p>
              <Link href="/articles" className="mt-6 inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2b3386] transition-colors hover:text-[#ef7120] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]"><ArrowLeft aria-hidden="true" size={14} /> Back to all articles</Link>
            </div>
          </aside>
        </div>
      </article>

      {relatedArticles.length > 0 && <section className="border-t border-[#e2e8f0] bg-[#f8fafc] px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ef7120]">Keep exploring</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#2b3386] sm:text-3xl">Related articles</h2></div><Link href="/articles" className="hidden min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2b3386] hover:text-[#ef7120] sm:inline-flex">All stories <ArrowRight aria-hidden="true" size={14} /></Link></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedArticles.map((related) => <Link key={related.id} href={`/articles/${related.slug}`} className="group rounded-md bg-white p-3 ring-1 ring-[#e2e8f0] transition-all duration-300 hover:-translate-y-1 hover:ring-[#ef7120]/50 hover:shadow-lg hover:shadow-[#2b3386]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120] motion-reduce:transition-none">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#2b3386]"><ArticleImage src={related.image} alt={related.imageAlt} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none" style={{ objectPosition: related.imagePosition ?? 'center' }} /></div>
            <div className="px-2 pb-2 pt-4"><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#ef7120]">{related.category}</p><h3 className="mt-2 text-lg font-semibold leading-snug text-[#2b3386] transition-colors group-hover:text-[#ef7120]">{related.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#45556C]">Read article <ArrowUpRight aria-hidden="true" size={13} /></span></div>
          </Link>)}</div>
          <Link href="/articles" className="mt-7 inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2b3386] hover:text-[#ef7120] sm:hidden">All stories <ArrowRight aria-hidden="true" size={14} /></Link>
        </div>
      </section>}

      <footer className="bg-[#2b3386] px-5 py-8 text-white sm:px-8 lg:px-14"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 sm:flex-row sm:items-center sm:justify-between"><span className="font-semibold tracking-[0.2em] text-white">SEA LLOYD</span><span>Stories that connect global trade.</span><Link href="/articles" className="transition-colors hover:text-white">Back to articles</Link></div></footer>
    </main>
  )
}
