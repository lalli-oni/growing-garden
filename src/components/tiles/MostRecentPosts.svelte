<script lang="ts">
	import type { Article } from '$lib/types'
	import ArticleItem from '../ArticleItem.svelte'

	interface ArticlesData {
		articles: Array<Article>;
	}

	export let data: ArticlesData
</script>

<h2>Most recent articles</h2>
<hr />
<nav>
	{#each data.articles.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime()) as article}
		<ArticleItem article={article} />
	{/each}
</nav>

<style>
	h2 {
		margin: 0px;
	}

	hr {
		margin: 1rem 0px 1rem 0px;
		color: var(--color-text);
	}
</style>
