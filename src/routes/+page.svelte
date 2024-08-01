<script lang="ts">
	import MostRecentPosts from './MostRecentPosts.svelte'

	export let data
</script>

<svelte:head>
	<title>Larus Thor - Digital garden</title>
	<meta name="description" content="Larus Thor digital garden" />
</svelte:head>

<section>
	<div>
		<h1>
			Larus Thor's digital garden
		</h1>
	
		<p>
			Welcome! What is a digital garden? Well, it's probably best explained by others.<br />
			<a href="https://maggieappleton.com/garden-history?ref=ideasurg.pub">Maggie Appleton's description</a>.
		</p>

		<p>As you can see this place is quite a mess. I have spent my focus on something that engages me. I'm working against TODO list found in the various experiments & about app section.</p>
	</div>

	<MostRecentPosts data={data} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		gap: 1rem;
	}

	h1 {
		width: 100%;
	}
</style>
