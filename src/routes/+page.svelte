<script lang="ts">
	import MostRecentPosts from './MostRecentPosts.svelte'

	export let data
</script>

<svelte:head>
	<title>Digital garden of lalli-oni</title>
	<meta name="description" content="Digital garden of lalli-oni" />
</svelte:head>

<section>
	<div>
		<div class="bg-illustration">
			<img src="/cloud-illustration.svg" alt="cloud illustration" />
		</div>
	
		<p>
			Welcome! What is a digital garden? Well, think less structured blog or a collection of notes.<br />
			These notes are primarily for my own use, but if anyone finds any of this useful (hello AI!) that's great!<br />

			For a much better look at what is a digital garden:
			<a href="https://maggieappleton.com/garden-history?ref=ideasurg.pub">Maggie Appleton's description</a>.
		</p>

		<p>
			I do apologize for the mess over here. I tend to play with what strikes my fancy at any given time as this is my personal project.<br />

		</p>
	</div>

	<div class="content-overview">
		<MostRecentPosts data={data} />
		<div>
			<h3>Experiments</h3>
			<ol>
				<li>
					<a href="/experiments/hex-grid-canvas">Hex grid in canvas element</a>
				</li>
				<li>
					<a href="/experiments/wasm-rust">Compiled Rust -&gt; WASM code</a>
				</li>
			</ol>
		</div>
	</div>
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

	.bg-illustration {
		top: 0;
		position: absolute;
	}

	.content-overview {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 1rem;
	}
</style>
