import type { Article } from "$lib/types.ts"
import type { Load } from "@sveltejs/kit"

export const load: Load = async ({ fetch }) => {
	const response = await fetch('api/articles')
	const articles: Article[] = await response.json()
	return { articles }
}