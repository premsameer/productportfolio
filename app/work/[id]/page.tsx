import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import stories from '@/lib/case-studies.json';

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(stories).map(id => ({ id })); }
function getStory(id: string) { return stories[id as keyof typeof stories]; }
export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const story = getStory((await params).id);
  return { title: story ? story.title + ' — Prem Sameer' : 'Case study not found' };
}
export default async function WorkPage({params}: {params: Promise<{id: string}>}) {
  const story = getStory((await params).id);
  if (!story) notFound();
  return <main className="case-page">
    <header className="nav wrap"><Link className="brand" href="/">Prem Sameer</Link><Link href="/#experience">All work ↗</Link></header>
    <article className="case-wrap">
      <span className="case-kicker">Product thinking / Case study</span>
      <h1>{story.title}</h1>
      <div className="case-prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{story.markdown}</ReactMarkdown></div>
      <Link className="case-next" href="/#experience">Explore more work <span>↗</span></Link>
    </article>
  </main>;
}
