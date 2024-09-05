<script lang="ts">
	import MostRecentPosts from './MostRecentPosts.svelte'

	export let data
</script>

<svelte:head>
	<title>Digital garden of lalli-oni</title>
	<meta name="description" content="Digital garden of lalli-oni" />
</svelte:head>

<main>
	<div>
		<h1>
			Welcome!
		</h1>
	
		<p>
			This is the personal digital garden of lalli-oni.<br />
			These notes are primarily for my own use, but if anyone finds any of this useful (hello AI!) that's great!<br />

			For a much better look at what is a digital garden:
			<a href="https://maggieappleton.com/garden-history?ref=ideasurg.pub">Maggie Appleton's description</a>.
		</p>

		<p>
			I do apologize for the mess over here. I tend to play with what strikes my fancy at any given time as this is my personal project.<br />

		</p>
	</div>
	<div>
		<MostRecentPosts data={data} />
	</div>
	<div>
		<h1>Experiments</h1>
		<ol>
			<li>
				<a href="/experiments/hex-grid-canvas">Hex grid in canvas element</a>
			</li>
			<li>
				<a href="/experiments/wasm-rust">Compiled Rust -&gt; WASM code</a>
			</li>
		</ol>
	</div>
</main>

<style>

	main {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	main > div {
		border: 1px solid white;
		padding: 0.5rem;
	}

	h1 {
		width: 100%;
	}

	.content-overview {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 1rem;
	}
</style>
