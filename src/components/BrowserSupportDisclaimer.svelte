<script lang="ts">
	import { onMount } from 'svelte'
	import { type Writable, writable } from 'svelte/store'

	interface Feature {
		name: string
		check: string | Array<string>
		caniuseLink: string
	}

	const features: Array<Feature> = [
		{
			name: 'relative colors',
			check: ['color', 'hsl(from white h s l)'],
			caniuseLink: 'https://caniuse.com/css-relative-colors'
		},
		{
			name: 'CSS nesting',
			check: 'selector(&)',
			caniuseLink: 'https://caniuse.com/mdn-css_selectors_nesting'
		}
	]

	let unsupportedFeatures: Writable<Array<Feature>> = writable([])

	let dismissed = false

	onMount(async () => {
		if (typeof window !== 'undefined' && CSS && CSS.supports) {
			features.forEach((f) => {
				if (Array.isArray(f.check) && f.check?.length === 2) {
					if (!CSS.supports(f.check[0], f.check[1])) {
						$unsupportedFeatures = [...$unsupportedFeatures, f]
					}
				} else if (typeof f.check === 'string') {
					if (!CSS.supports(f.check)) {
						$unsupportedFeatures = [...$unsupportedFeatures, f]
					}
				}
			})
		}
	})
</script>

{#if $unsupportedFeatures.length && !dismissed}
	<div id="disclaimer-container">
		<input class="dismiss-button" type="button" on:click={() => (dismissed = true)} value="X" />
		<span class="disclaimer-text">
			Sorry! The following css features are not supported in your current browser.
		</span>
		<ul class="features-list">
			{#each $unsupportedFeatures as feature}
				<li>
					{#if feature.caniuseLink}
						<a href={feature.caniuseLink} target="_blank" class="external-link">{feature.name}</a>
					{:else}
						<span>{feature.name}</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	#disclaimer-container {
		background: rgba(128, 128, 128, 0.1);
		font-weight: 600;
		box-sizing: border-box;
		border: 1px solid rgba(128, 128, 128, 0.2);
		border-radius: 1rem;
		padding: 0.5rem;
		max-width: 30rem;
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: var(--text-color);
	}
	#disclaimer-container:hover {
		border: 1px solid var(--color-text-highlight);
	}

	.dismiss-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background-color: transparent;
		border: 0px solid transparent;
		color: var(--color-primary);
		cursor: pointer;
	}

	.features-list {
		margin: 0.2rem 0rem;
		color: var(--color-primary);
	}

	.dismiss-button:hover {
		color: white;
	}
</style>
