<script lang="ts">
	import type { Article } from '$lib/types'
	import ArticleItem from '../ArticleItem.svelte'

	interface ArticlesData {
		articles: Array<Article>;
	}

	export let data: ArticlesData
</script>

<h2>Most recent articles</h2>
<nav>
	<ol>
		{#each data.articles.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime()) as article}
			<ArticleItem article={article} />
		{/each}
	</ol>
</nav>

<style>
	h2 {
		margin: 0px;
	}
</style>
