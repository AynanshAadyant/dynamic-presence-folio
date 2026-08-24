import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/site-shell";
import { Tag } from "@/components/primitives";
import { getPost } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Post not found — Ada Vance" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Ada Vance` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPost,
});

function PostNotFound() {
  return (
    <Section className="py-24">
      <h1 className="text-3xl font-semibold">Post not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-sm text-accent">
        Back to writing
      </Link>
    </Section>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <article>
      <Section className="border-b border-border py-16 sm:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Writing
        </Link>
        <h1 className="mt-6 max-w-3xl text-balance-tight text-4xl font-semibold sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 font-mono text-xs text-muted-foreground">
          {post.date} · {post.readingTime}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>

      <Section className="py-14">
        <div className="max-w-2xl space-y-6">
          {post.body.map((para, i) => (
            <p key={i} className="text-base leading-[1.8] text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </Section>
    </article>
  );
}
