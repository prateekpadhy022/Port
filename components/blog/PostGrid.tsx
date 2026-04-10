import PostCard from './PostCard'

type Post = Parameters<typeof PostCard>[0]['post']

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-4">
          article
        </span>
        <p className="font-headline text-lg text-on-surface-variant">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
