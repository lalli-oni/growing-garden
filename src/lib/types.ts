export type Categories = 'sveltekit' | 'svelte'

export type Article = {
	title: string
	slug: string
	description: string
	date: string
	created: string
	updated: string
	categories: Categories[]
	published: boolean
}