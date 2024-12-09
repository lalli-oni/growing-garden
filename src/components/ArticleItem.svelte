<script lang="ts">
	import { formatDate } from '$lib/dateTime'
	import type { Article } from '$lib/types'

    export let article: Article
</script>


<a href={'/article/' + article.slug} class="article-recent-link">
    <li>
        <div class="header">
            <span class="title">{article.title}</span>
        </div>
        <div class="footer">
            <p class="date">{formatDate(article.updated)}</p>
        </div>
    </li>
</a>

<style>
	li {
		padding: 0.6rem 0.7rem;
		border-radius: 1.5rem;
	}

	.title {
		font-size: 1.2rem;
	}

	.footer {
		font-size: 0.8rem;
	}
</style>