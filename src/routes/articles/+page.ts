import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
	const articles = await parent()
	return { articles }
}
