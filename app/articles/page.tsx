import type { Metadata } from 'next'
import { ArticlesList } from '@/components/articles/articles-list'
import { articles } from '@/app/data/articles/articles'

export const metadata: Metadata = {
  title: 'Sea Lloyd Insights',
  description: 'Knowledge that connects global trade. Explore Sea Lloyd perspectives on maritime connectivity, logistics, specialized cargo, and shipping schedules.',
}

export default function ArticlesPage() {
  return <ArticlesList articles={articles} />
}
