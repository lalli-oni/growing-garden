<script lang="ts">
	import Header from '../components/Header.svelte'

	import './styles.css'
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-image: url('/bg-illustration.svg');
		background-repeat: no-repeat;
		background-size: 100% auto;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: auto;
	}
</style>
