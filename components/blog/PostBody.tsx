import { compileMdx } from '@/lib/mdx'

export default async function PostBody({ content }: { content: string }) {
  const compiled = await compileMdx(content)
  return <div className="post-body prose">{compiled}</div>
}
