---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import PostCard from '../components/PostCard.astro';

const posts = await getCollection('blog');
---

<BaseLayout title="Txchyon Alpha Blog">
  <section class="container mx-auto px-6 py-20">
    <h1 class="text-4xl font-bold mb-12">Txchyon Alpha Drops</h1>
    
    {posts.length === 0 ? (
      <p>No posts yet... but they're coming.</p>
    ) : (
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard {post} />
        ))}
      </div>
    )}
  </section>
</BaseLayout>