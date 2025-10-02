import { json } from '@sveltejs/kit'
import type { Article } from '$lib/types'

let articles: Article[] | null

// Load articles on first request
// NOTE (LTJ): How to trigger this when server initializes?
articles = await loadArticles()

async function getPosts() {
	if (articles === null) {
		articles = await loadArticles()
	}

	articles = articles.sort(
		(first, second) => new Date(second.created).getTime() - new Date(first.created).getTime()
	)

	return articles
}

async function loadArticles(): Promise<Article[]> {
	const articles: Article[] = []
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

	return articles
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}

