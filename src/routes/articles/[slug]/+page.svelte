<script lang="ts">
	import Pill from '../../../components/Pill.svelte'
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {data.meta.created}</p>
		<p>Modified at {data.meta.updated}</p>
	</hgroup>

	<!-- Tags -->
	<div class="tags">
		{#each data.meta.categories as category}
			<Pill label={category} backgroundColor="#CC5500" />
		{/each}
	</div>

	<!-- Post -->
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 {
		text-transform: capitalize;
	}

	.tags {
		display: flex;
		gap: 1rem;
	}

	.tags > * {
		padding: 0.2rem 0.3rem;
		border-radius: 2rem;
		color: var(--color-highlight-text);
	}
</style>
