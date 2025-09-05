import type { Article } from '$lib/types.ts'
import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
	const response = await fetch('api/articles').then((data) => data.text())
	// Attempt to parse any Date parsable fields
	const articles: Article[] = JSON.parse(response, (key, value) => {
		if (!isNaN(Date.parse(value))) {
			return new Date(value)
		}
		return value
	})
	return { articles }
}
