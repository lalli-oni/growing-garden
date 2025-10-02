<script lang="ts">
	import type { Article } from '$lib/types'
	import ArticleItem from '../ArticleItem.svelte'

	let { articles }: { articles: Array<Article> } = $props()
</script>

<nav>
	<!-- Expected sorted by date descending -->
	{#each articles as article (article.title)}
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
