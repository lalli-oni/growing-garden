import { json } from '@sveltejs/kit'
import type { Article } from '$lib/types'

async function getPosts() {
	let articles: Article[] = []

	const paths = import.meta.glob('/src/articles/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Article, 'slug'>
			const post = { ...metadata, slug } satisfies Article
			if (post.published) articles.push(post)
		}
	}

	articles = articles.sort((first, second) =>
    new Date(second.created).getTime() - new Date(first.created).getTime()
	)

	return articles
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
