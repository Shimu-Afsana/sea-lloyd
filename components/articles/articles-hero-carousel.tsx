'use client'

import { ArticleImage } from '@/components/articles/article-image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { articles } from '@/app/data/articles/articles'
import { getPortsByIds } from '@/app/data/articles/port'

const featuredArticles = articles.filter((article) => article.featured)

export function ArticlesHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const activeArticle = featuredArticles[activeIndex]
  const relatedPorts = useMemo(() => getPortsByIds(activeArticle.relatedPortIds), [activeArticle])

  const moveTo = useCallback((index: number) => {
    setActiveIndex((index + featuredArticles.length) % featuredArticles.length)
    setInteractionPaused(true)
  }, [])

  useEffect(() => {
    if (paused || interactionPaused || featuredArticles.length < 2) return
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % featuredArticles.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [paused, interactionPaused])

  return (
    <section
      aria-label="Featured maritime articles"
      aria-roledescription="carousel"
      className="relative isolate flex min-h-[740px] overflow-hidden bg-[#2b3386] text-white sm:min-h-[760px] lg:min-h-[min(850px,90svh)]"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false)
      }}
    >
      {featuredArticles.map((article, index) => (
        <div
          key={article.id}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <ArticleImage
            src={article.image}
            alt={article.imageAlt}
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-transform duration-[9000ms] ease-linear motion-reduce:transition-none ${index === activeIndex ? 'scale-100' : 'scale-[1.045]'}`}
            style={{ objectPosition: article.imagePosition ?? 'center' }}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,rgba(22,29,101,0.98)_0%,rgba(31,39,119,0.88)_37%,rgba(35,47,127,0.54)_72%,rgba(27,37,105,0.34)_100%)]" />
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(0deg,rgba(26,34,104,0.72)_0%,transparent_32%,rgba(23,31,99,0.16)_100%)]" />

      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-9 sm:py-7 lg:px-16 xl:px-20">
        <Link href="/articles" aria-label="Sea Lloyd Insights home" className="group inline-flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120]">
          <span className="grid size-10 place-items-center rounded-full border border-white/35 text-sm font-semibold tracking-tight">SL</span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-[0.19em]">SEA LLOYD</span>
            <span className="mt-1.5 text-[9px] tracking-[0.29em] text-white/65">INSIGHTS</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-[11px] font-medium tracking-[0.16em] text-white/75 md:flex">
          <Link className="transition-colors hover:text-white" href="/articles">JOURNAL</Link>
          <a className="transition-colors hover:text-white" href="#latest">LATEST STORIES</a>
          <span className="h-4 w-px bg-white/30" />
          <span className="text-white">GLOBAL TRADE, IN FOCUS</span>
        </nav>
        <Link href="#latest" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2.5 text-[10px] font-semibold tracking-[0.14em] transition-colors hover:border-[#ef7120] hover:text-[#ffae78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120] sm:px-5">
          EXPLORE STORIES <ArrowUpRight aria-hidden="true" size={14} />
        </Link>
      </header>

      <div key={activeArticle.id} className="relative z-[1] flex w-full flex-1 flex-col justify-center px-6 pb-36 pt-28 sm:px-12 sm:pb-40 lg:px-[11.5%] lg:pb-36 lg:pt-32">
        <article className="max-w-[970px] animate-[article-in_550ms_ease-out_both] motion-reduce:animate-none">
          <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] sm:mb-8 sm:text-[11px]">
            {activeArticle.publishedAt && <time dateTime={activeArticle.publishedAt} className="text-white/75">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).format(new Date(activeArticle.publishedAt))}</time>}
            <span className="size-1 rounded-full bg-[#ef7120]" />
            <span className="text-[#ff9a5c]">{activeArticle.category}</span>
          </div>
          <h1 className="max-w-[900px] text-[clamp(2.55rem,6.15vw,5.3rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-white [text-wrap:balance]">
            {activeArticle.title}
          </h1>
          <p className="mt-6 max-w-[660px] text-[15px] leading-7 text-white/80 sm:mt-7 sm:text-[17px] sm:leading-[1.8]">
            {activeArticle.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[10px] font-medium tracking-[0.13em] text-white/70 sm:mt-7">
            <span className="mr-1 text-[#ff9a5c]">REGIONAL GATEWAYS</span>
            {relatedPorts.map((port, index) => (
              <span key={port.id} className="inline-flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-white/35">/</span>}
                <span>{port.name}</span>
              </span>
            ))}
          </div>
          <Link href={`/articles/${activeArticle.slug}`} className="group mt-8 inline-flex min-h-11 items-center gap-3 border-b border-white/50 pb-2 text-[11px] font-semibold tracking-[0.19em] transition-colors hover:border-[#ef7120] hover:text-[#ffae78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120] sm:mt-10">
            READ THE STORY <ArrowDownRight aria-hidden="true" size={16} className="text-[#ef7120] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
        </article>
      </div>

      {featuredArticles.length > 1 && (
        <>
          <button type="button" aria-label="Previous featured article" onClick={() => moveTo(activeIndex - 1)} className="absolute left-4 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-[#2b3386]/25 text-white backdrop-blur-sm transition-all hover:border-[#ef7120] hover:bg-[#2b3386]/80 hover:text-[#ffae78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120] sm:grid lg:left-7 lg:size-14">
            <ArrowLeft aria-hidden="true" size={21} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Next featured article" onClick={() => moveTo(activeIndex + 1)} className="absolute right-4 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-[#2b3386]/25 text-white backdrop-blur-sm transition-all hover:border-[#ef7120] hover:bg-[#2b3386]/80 hover:text-[#ffae78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef7120] sm:grid lg:right-7 lg:size-14">
            <ArrowRight aria-hidden="true" size={21} strokeWidth={1.5} />
          </button>
          <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-3 px-5 sm:bottom-10 sm:gap-4">
            <div className="flex w-full max-w-[min(600px,72vw)] items-center gap-2.5 sm:gap-3">
              {featuredArticles.map((article, index) => (
                <button
                  key={article.id}
                  type="button"
                  aria-label={`Go to story ${index + 1}: ${article.title}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => moveTo(index)}
                  className="group flex h-8 min-w-0 flex-1 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef7120]"
                >
                  <span className="relative h-[3px] w-full overflow-hidden bg-white/40 transition-colors group-hover:bg-white/70">
                    <span className={`absolute inset-y-0 left-0 bg-[#ef7120] transition-[width] duration-500 ease-out ${index === activeIndex ? 'w-full' : 'w-0'}`} />
                  </span>
                </button>
              ))}
            </div>
            <button type="button" aria-label={paused ? 'Play carousel' : 'Pause carousel'} onClick={() => setPaused((value) => !value)} className="grid size-10 shrink-0 place-items-center rounded-full border border-white/40 text-white/90 transition-colors hover:border-[#ef7120] hover:text-[#ffae78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef7120]">
              {paused ? <Play aria-hidden="true" size={14} fill="currentColor" /> : <Pause aria-hidden="true" size={14} fill="currentColor" />}
            </button>
          </div>
        </>
      )}
      <span className="sr-only" aria-live="polite">Story {activeIndex + 1} of {featuredArticles.length}: {activeArticle.title}</span>
    </section>
  )
}

