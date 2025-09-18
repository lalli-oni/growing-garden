import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

interface PageData {
	content: () => any;
	meta: ArticleMeta;
}

interface ArticleMeta {
	title: string;
	description: string;
	categories: Array<string>;
	published: boolean;
	created: string;
	updated: string;
}

export const load: PageLoad = async ({ params }): Promise<PageData> => {
	try {
		const post = await import(`../../../articles/${params.slug}.md`)

		const data: PageData = {
			content: post.default,
			meta: post.metadata
		}

		// NOTE (LTJ): What level of validation do we want?
		if (!data.meta.published) error(404, `Could not find ${params.slug}`)
		if (data.meta.title?.length < 1) error(501, `Missing article title for ${params.slug}`)

		return data
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
