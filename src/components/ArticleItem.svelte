<script lang="ts">
	import { formatDate } from '$lib/dateTime'
	import type { Article } from '$lib/types'

	export let article: Article
</script>

<a href={'/articles/' + article.slug} class="article-recent-link">
	<div>
		<div class="header">
			<span class="title">{article.title}</span>
		</div>
		<p class="footer">{formatDate(article.updated)}</p>
	</div>
</a>

<style>
	a:hover,
	a:visited,
	a:active {
		text-decoration: underline;
	}

	a {
		text-decoration: none;
	}

	.title {
		font-size: 1.2rem;
		color: white;
		text-decoration: none;
	}

	.footer {
		font-size: 0.8rem;
		margin-top: 0.3rem;
		margin-bottom: 0.5rem;
	}
</style>
