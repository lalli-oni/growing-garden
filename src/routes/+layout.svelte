<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Header from '../components/Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<div class="cloud-lines-illustration illustration">
		<img src="/cloud-lines-illustration.svg" alt="cloud lines illustration" />
	</div>

	<main>
		<slot />
	</main>
	<div class="cloud-illustration illustration">
		<img src="/cloud-illustration.svg" alt="cloud illustration" />
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
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

	.illustration {
		position: absolute;
		z-index: -10;
		overflow: hidden;
		display: inline;
	}
	
	.cloud-lines-illustration {
		top: 0;
		left: -100px;
	}

	.cloud-illustration {
		bottom: -60px;
		right: -130px;
		transform: rotate(90deg);
	}
</style>
