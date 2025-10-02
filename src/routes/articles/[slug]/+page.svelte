<script lang="ts">
	import Pill from '../../../components/Pill.svelte'
	import { formatDate } from '$lib/dateTime'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
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
		<p>Published: {formatDate(data.meta.created)}</p>
		<p>Modified: {formatDate(data.meta.updated)}</p>
		<!-- Tags -->
		<div class="tags">
			{#each data.meta.categories as category (category)}
				<Pill label={category} backgroundColor="#CC5500" />
			{/each}
		</div>
	</hgroup>


	<!-- Post -->
	<div class="prose">
		<!-- mdsvex rendered component -->
		<data.content />
	</div>
</article>

<style>
	article {
		padding: 1rem;
		padding-top: 4rem;
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 {
		text-transform: capitalize;
		margin: 0rem;
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

	hgroup {
		/* font-weight: 300; */
		padding-bottom: 1rem;
	}

	hgroup > p {
		color: white;
		font-size: 0.9rem;
		margin: 0.4rem 0rem;
	}
</style>
