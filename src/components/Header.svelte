<script lang="ts">
	import { page } from '$app/state'

	let holdNavbarOpen = $state(false)
	let aboutOpen = $state(false)
	// Svelte scopes classes but not ids, so the gradient needs a per-instance one
	const wedgeGradient = $props.id()
</script>

<header class:held={holdNavbarOpen}>
	<nav>
		<ul>
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/"
					><div aria-hidden="true">🪴</div>
					<div>Home</div></a
				>
			</li>
			<li aria-current={page.url.pathname.includes('/articles') ? 'page' : undefined}>
				<a href="/articles"
					><div aria-hidden="true">✍️</div>
					<div>Articles</div></a
				>
			</li>
			<li aria-current={page.url.pathname.includes('/experiments') ? 'page' : undefined}>
				<a href="/experiments"
					><div aria-hidden="true">🧪</div>
					<div>Experiments</div></a
				>
			</li>
			<li aria-current={page.url.pathname.includes('/about-') ? 'page' : undefined}>
				<button class="dropdown" aria-expanded={aboutOpen} onclick={() => (aboutOpen = !aboutOpen)}>
					<div aria-hidden="true">👋</div>
					<div>About</div>
				</button>
				<div class="dropdown-content" class:open={aboutOpen}>
					<div>
						<a
							aria-current={page.url.pathname === '/about-app' ? 'page' : undefined}
							href="/about-app">App</a
						>
					</div>
					<div>
						<a
							aria-current={page.url.pathname === '/about-me' ? 'page' : undefined}
							href="/about-me">Me</a
						>
					</div>
				</div>
			</li>
		</ul>
		<button
			class="toggle"
			aria-label="Pin navigation open"
			aria-expanded={holdNavbarOpen}
			onclick={() => (holdNavbarOpen = !holdNavbarOpen)}
		>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<defs>
					<linearGradient id={wedgeGradient} x1="0" y1="0" x2="0" y2="1">
						<stop class="stop-top" offset="0" />
						<stop class="stop-bottom" offset="1" />
					</linearGradient>
				</defs>
				<path class="wedge" fill="url(#{wedgeGradient})" d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
				<g class="grip">
					<line x1="1.37" y1="0.49" x2="1.01" y2="1.2" />
					<line x1="1.05" y1="0.44" x2="0.79" y2="0.98" />
				</g>
			</svg>
		</button>
	</nav>
</header>

<style>
	/* The header's footprint is just the handle: the bar is taken out of flow below, so a
	   closed drawer reserves no width. Sizing it to the open bar gave every page a
	   horizontal scrollbar under ~369px and an invisible hover band across the top. */
	header {
		--wedge-width: 2rem;
		--surface-top: #4a2a0c;
		--surface-bottom: #2a1606;
		/* Sole height source: the wedge svg and the nav items size off this via height: 100% */
		height: 3rem;
		width: var(--wedge-width);
		margin-bottom: 1rem;
		position: sticky;
		top: 0;
		/* The bar is no longer the page's topmost positioned element, so claim a layer */
		z-index: 10;
	}

	/* The wedge is the drawer's handle: offsetting nav by its own width less the wedge parks
	   the wedge in the corner when closed, and it rides to the bar's far end when open */
	nav {
		position: absolute;
		top: 0;
		left: 0;
		width: max-content;
		display: flex;
		transform: translateX(calc(-100% + var(--wedge-width)));
		transition: transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	/* Hover waits, so a click aimed at the handle lands before the handle slides away */
	header:hover nav {
		transform: none;
		transition-delay: 350ms;
	}

	header.held nav,
	header:focus-within nav {
		transform: none;
		transition-delay: 0s;
	}

	nav > button {
		background-color: transparent;
		border: 0;
		padding: 0;
	}

	/* drop-shadow, not box-shadow: it follows the wedge's diagonal. Kept off nav so it
	   doesn't also outline the dropdown hanging out of the bar. */
	svg {
		width: var(--wedge-width);
		height: 100%;
		display: block;
		flex-shrink: 0;
		filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
		transition: filter 260ms ease;
	}

	.stop-top {
		stop-color: var(--surface-top);
	}

	.stop-bottom {
		stop-color: var(--surface-bottom);
	}

	.wedge {
		stroke: rgba(255, 255, 255, 0.35);
		stroke-width: 0.05;
	}

	/* Drawer pull: dimmed while the drawer is free to close, lit while pinned open */
	.grip line {
		stroke: var(--color-primary);
		stroke-width: 0.13;
		stroke-linecap: round;
		opacity: 0.7;
		transition:
			stroke 0.2s linear,
			opacity 0.2s linear;
	}

	header.held .grip line {
		opacity: 1;
	}

	/* Pinned open reads as pressed in: the highlight dims, the shadow tightens */
	header.held ul {
		box-shadow:
			0 1px 1px rgba(0, 0, 0, 0.6),
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			inset 0 -2px 3px rgba(0, 0, 0, 0.45);
	}

	header.held svg {
		filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6));
	}

	header.held .wedge {
		stroke: rgba(0, 0, 0, 0.45);
	}

	ul {
		padding: 0;
		margin: 0;
		display: flex;
		gap: 0.1rem;
		justify-content: center;
		align-items: center;
		list-style: none;
		padding-right: 0.6rem;
		/* Keep the handle on screen when the bar is wider than the viewport. border-box
		   because this page has no CSS reset, so padding would otherwise widen the cap. */
		box-sizing: border-box;
		max-width: calc(100vw - var(--wedge-width));
		overflow-x: auto;
		background: linear-gradient(180deg, var(--surface-top), var(--surface-bottom));
		box-shadow:
			0 2px 3px rgba(0, 0, 0, 0.55),
			inset 0 1px 0 rgba(255, 255, 255, 0.18),
			inset 0 -2px 3px rgba(0, 0, 0, 0.35);
		transition: box-shadow 260ms ease;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-text);
	}

	nav a,
	.dropdown {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover,
	.dropdown:hover {
		color: var(--color-primary);
	}

	.dropdown {
		cursor: pointer;
		background: transparent;
		border: 0;
		font-family: inherit;
	}

	/* Hovering the whole li keeps the menu open while the pointer travels into it, and the
	   button opens it on touch, where neither hover nor focus exists. pointer-events stops
	   the hidden menu eating hovers on the Experiments link it overlaps. focus-within makes
	   the links keyboard-reachable: without it, tabbing moves focus into a transparent menu. */
	li:hover .dropdown-content,
	li:focus-within .dropdown-content,
	.dropdown-content.open {
		opacity: 1;
		transform: translateY(0%);
		pointer-events: auto;
	}

	.dropdown-content {
		pointer-events: none;
		position: absolute;
		/* Anchored right so the menu grows into the bar instead of overhanging the wedge */
		right: 0;
		min-width: 100%;
		transform: translateY(-100%);
		opacity: 0;
		background: linear-gradient(180deg, var(--surface-top), var(--surface-bottom));
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.55);
		transition:
			transform 0.2s,
			opacity 0.2s;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.2rem;
	}

	@media (prefers-reduced-motion: reduce) {
		nav,
		ul,
		svg,
		.grip line,
		.dropdown-content {
			transition: none;
		}
	}
</style>
