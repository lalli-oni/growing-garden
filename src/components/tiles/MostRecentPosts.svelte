<script lang="ts">
	import type { Article } from '$lib/types'
	import ArticleItem from '../ArticleItem.svelte'

	interface ArticlesData {
		articles: Array<Article>
	}

	export let data: ArticlesData
</script>

<nav>
	<!-- Sort on updated date (descending, recent first) -->
	{#each data.articles.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()) as article}
		<ArticleItem {article} />
	{/each}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
</style>
