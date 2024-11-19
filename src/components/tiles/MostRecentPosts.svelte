<script lang="ts">
	import type { Article } from '$lib/types';

	interface ArticlesData {
		articles: Array<Article>;
	}

	export let data: ArticlesData;
</script>

<h2>Most recent articles</h2>
<nav>
	<ol>
		{#each data.articles as article}
			<a href={'/article/' + article.slug} class="article-recent-link">
				<li>
					<div class="header">
						<span class="title">{article.title}</span>
					</div>
					<div class="footer">
						<p class="date">{article.created}</p>
					</div>
				</li>
			</a>
		{/each}
	</ol>
</nav>

<style>
	.article-recent-link > li {
		padding: 0.6rem 0.7rem;
		border-radius: 1.5rem;
	}

	.article-recent-link .title {
		font-size: 1.2rem;
	}

	.article-recent-link .footer {
		font-size: 0.8rem;
	}

	h2 {
		margin: 0px;
	}
</style>
