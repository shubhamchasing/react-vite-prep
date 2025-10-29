// PostCard.js
//👍 likes | 👎 dislikes | 👁️ views
export default function PostCard({ post }) {
  const { title, body, tags, reactions, views } = post;

  return (
    <article className="card">
      <h4 className="title">{title}</h4>

      <p className="post-body">{body} </p>

      <div>
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="reactions">
        <span className="likes">👍 {reactions.likes}</span>|
        <span className="dislikes">👎 {reactions.dislikes}</span>|
        <span className="views">👁️ {views}</span>
      </div>
    </article>
  );
}
