<script lang="ts">
	import type { Article } from "$lib/types"
	import ArticleItem from "../../components/ArticleItem.svelte"

	let { data }: { data: { articles: Array<Article> }} = $props()
</script>

<div>
	<h1>List of articles</h1>
	<ol>
		<!-- Expected sorted by date descending -->
		{#each data.articles as article (article.title)}
			<ArticleItem {article} />
		{/each}
	</ol>
</div>

<style>
	div {
		padding-top: 4rem;
		align-self: center;
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
