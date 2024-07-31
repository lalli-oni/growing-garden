import { Article } from "$lib/types"
import { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('api/articles')
	const articles: Article[] = await response.json()
	return { articles }
}