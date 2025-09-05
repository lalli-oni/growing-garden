<script lang="ts">
	export let title: string
</script>

<div class="tile-root">
	<h2>{title}</h2>
	<hr />
	<slot />
</div>

<style>
	.tile-root {
		grid-column: var(--grid-column);
		grid-row: var(--grid-row);
		height: fit-content;
		padding: 1rem;
		border-radius: 1rem;
		border: 2px solid rgba(128, 128, 128, 0.2);
	}

	.tile-root:hover {
		border: 2px solid var(--color-text);
	}

	h2 {
		margin: 0px;
	}

	hr {
		margin: 0.5rem 0px 1rem 0px;
		color: var(--color-text);
	}
</style>
