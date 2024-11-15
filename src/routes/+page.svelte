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

			For a much better description of what a digital garden is:
			<a href="https://maggieappleton.com/garden-history?ref=ideasurg.pub">Maggie Appleton's description</a>.
		</p>

		<p>
			I do apologize for the mess over here. I tend to play with what strikes my fancy at any given time as this is my personal project.<br />
			So a lot of the obvious, "basic" features and styling considerations are kept waiting.
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
	

	/* @media only screen and (max-width: 768px) {
		main {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}
	} */

	main > div {
		border: 2px solid rgba(128, 128, 128, 0.2);
		padding: 0.5rem;
		border-radius: 1rem;
	}

	main > div:hover {
		border: 2px solid var(--color-text-highlight);
	}
</style>
