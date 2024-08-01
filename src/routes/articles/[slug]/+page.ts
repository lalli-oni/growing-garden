import { error } from '@sveltejs/kit'
import { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../articles/${params.slug}.md`)

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
