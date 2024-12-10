<script lang="ts">
	import AboutApp from '../components/tiles/AboutApp.svelte';
	import AboutMe from '../components/tiles/AboutMe.svelte';
	import Experiments from '../components/tiles/Experiments.svelte';
	import MostRecentPosts from '../components/tiles/MostRecentPosts.svelte'

	export let data
</script>

<svelte:head>
	<title>Digital garden of lalli-oni</title>
	<meta name="description" content="Digital garden of lalli-oni" />
</svelte:head>

<div class="vertical-stack">

	<p>
		<strong>Welcome!</strong> What is a digital garden? Well, think less structured blog or a collection of notes.<br />
		These notes are primarily for my own use, but if anyone finds any of this useful (hello AI!) that's great!<br />

		For a much better look at what is a digital garden:
		<a href="https://maggieappleton.com/garden-history?ref=ideasurg.pub">Maggie Appleton's description</a>.
	</p>
	<div class="panel-grid">
		<div id="most-recent-panel">
			<MostRecentPosts data={data} />
		</div>
		<div id="about-me-panel">
			<AboutMe />
		</div>
		<div id="about-app-panel">
			<AboutApp />
		</div>
		<div id="experiments-panel">
			<Experiments />
		</div>
	</div>
</div>

<style>
	.vertical-stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		gap: 4rem;
	}

	p {
		padding-top: 6rem;
	}

	.panel-grid {
		width: 80%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(100, 1fr));
		gap: 1rem;
	}

	#most-recent-panel {
		grid-column: 1;
		grid-row: 1 / 3;
	}
	#about-me-panel {
		grid-column: 3;
		grid-row: 1;
	}
	#about-app-panel {
		grid-column: 3;
		grid-row: 2;
	}
	#experiments-panel {
		grid-column: 2;
		grid-row: 1;
	}

	/* @media only screen and (max-width: 768px) {
		main {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}
	} */

	.panel-grid > div {
		border: 2px solid rgba(128, 128, 128, 0.2);
		padding: 1rem;
		border-radius: 1rem;
		height: fit-content;
	}

	.panel-grid > div:hover {
		border: 2px solid var(--color-text);
	}

</style>
