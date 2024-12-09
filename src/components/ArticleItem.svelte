<script lang="ts">
	import { formatDate } from '$lib/dateTime'
	import type { Article } from '$lib/types'

    export let article: Article
</script>


<a href={'/article/' + article.slug} class="article-recent-link">
    <div>
        <div class="header">
            <span class="title">{article.title}</span>
        </div>
        <div class="footer">
            <p>{formatDate(article.updated)}</p>
        </div>
    </div>
</a>

<style>
    a:hover, a:visited, a:link, a:active
    {
        text-decoration: none;
    }

	.title {
		font-size: 1.2rem;
        color: white;
        text-decoration: none;
	}

	.footer {
		font-size: 0.8rem;
	}
</style>