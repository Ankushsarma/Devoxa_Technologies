import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blogs-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devoxatechnologies.com';
  
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/careers',
    '/technology',
    '/integrations',
    '/releases',
    '/feedback',
    '/status',
    '/cookie',
    '/privacy',
    '/terms',
    '/security'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
