<script lang="ts">
	import Tile from '../components/Tile.svelte';
	import AboutApp from '../components/tiles/AboutApp.svelte';
	import AboutMe from '../components/tiles/AboutMe.svelte';
	import EmployMe from '../components/tiles/EmployMe.svelte';
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
		<Tile title="Most recent articles" --grid-column="1" --grid-row="1 / 3">
			<MostRecentPosts data={data} />
		</Tile>
		<Tile title="Experiments" --grid-column="2" --grid-row="1">
			<Experiments />
		</Tile>
		<Tile title="Employ me" --grid-column="2" --grid-row="2">
			<EmployMe />
		</Tile>
		<Tile title="About me" --grid-column="3" --grid-row="1">
			<AboutMe />
		</Tile>
		<Tile title="About app" --grid-column="3" --grid-row="2">
			<AboutApp />
		</Tile>
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

</style>
