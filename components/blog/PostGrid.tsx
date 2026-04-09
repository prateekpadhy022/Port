import PostCard from './PostCard'

type Post = Parameters<typeof PostCard>[0]['post']

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="post-grid-empty">
        <p>No posts found.</p>
      </div>
    )
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
