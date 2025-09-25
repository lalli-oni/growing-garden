export type Categories = 'sveltekit' | 'svelte'

export type Article = {
	title: string
	series?: string
	slug: string
	description: string
	created: Date
	updated: Date
	categories: Categories[]
	published: boolean
}
