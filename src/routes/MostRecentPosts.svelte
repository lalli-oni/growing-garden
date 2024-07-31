<script lang="ts">
	import { formatDate } from '$lib/dateTime';

	export let data;
</script>

<div>
    <h2 class="component-title">Most recent articles</h2>
    <nav>
        <ol>
            {#each data.articles as article}
                <a href={"/article/" + article.slug}  class="article-recent-link">
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
</div>

<style>
    .component-title {
        margin: 0px;
    }

	.article-recent-link > li {
		padding: 0.6rem 0.7rem;
		border-radius: 1.5rem;
		border: 2px solid var(--color-theme-2);
	}

	.article-recent-link .title {
		font-size: 1.2rem;
	}

	.article-recent-link .footer {
		font-size: 0.8rem;
	}
</style>
