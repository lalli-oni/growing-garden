<script lang="ts">
	// $app/stores is deprecated; migrate to $app/state (page.url, no $ prefix)
	import { page } from '$app/stores'

	let holdNavbarOpen = $state(false)
</script>

<header class:held={holdNavbarOpen}>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/"
					><div aria-hidden="true">🪴</div>
					<div>Home</div></a
				>
			</li>
			<li aria-current={$page.url.pathname.includes('/articles') ? 'page' : undefined}>
				<a href="/articles"
					><div aria-hidden="true">✍️</div>
					<div>Articles</div></a
				>
			</li>
			<li aria-current={$page.url.pathname.includes('/experiments') ? 'page' : undefined}>
				<a href="/experiments"
					><div aria-hidden="true">🧪</div>
					<div>Experiments</div></a
				>
			</li>
			<li aria-current={$page.url.pathname.includes('/about-') ? 'page' : undefined}>
				<div class="dropdown">
					<span aria-hidden="true">👋</span><span class="visually-hidden">About</span>
				</div>
				<div class="dropdown-content">
					<div>
						<a
							aria-current={$page.url.pathname === '/about-app' ? 'page' : undefined}
							href="/about-app">App</a
						>
					</div>
					<div>
						<a
							aria-current={$page.url.pathname === '/about-me' ? 'page' : undefined}
							href="/about-me">Me</a
						>
					</div>
				</div>
			</li>
		</ul>
		<button
			aria-label="toggle navbar"
			aria-pressed={holdNavbarOpen}
			onclick={() => (holdNavbarOpen = !holdNavbarOpen)}
		>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<defs>
					<linearGradient id="wedge-surface" x1="0" y1="0" x2="0" y2="1">
						<stop class="stop-top" offset="0" />
						<stop class="stop-bottom" offset="1" />
					</linearGradient>
				</defs>
				<path class="wedge" d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
				<g class="grip">
					<line x1="1.37" y1="0.49" x2="1.01" y2="1.2" />
					<line x1="1.05" y1="0.44" x2="0.79" y2="0.98" />
				</g>
			</svg>
		</button>
	</nav>
</header>

<style>
	/* Sole height source: the wedge svg and the nav items size off this via height: 100% */
	header {
		--wedge-width: 2em;
		/* The drawer needs its own surface: --color-bg-semidark is exactly the page
		   gradient's brightest band, which sits right behind the bar */
		--surface-top: #4a2a0c;
		--surface-bottom: #2a1606;
		height: 3rem;
		display: flex;
		width: fit-content;
		/* On header, not nav: the toggle button's wedge lives outside nav and fills from this */
		--background: var(--color-bg-semidark);
		padding-right: 1rem;
		margin-bottom: 1rem;
	}

	/* Closed, the bar slides out by its own width less the wedge, so the wedge stays
	   in the corner as the drawer's handle and extends with the bar as it opens */
	nav {
		display: flex;
		justify-content: center;
		transform: translateX(calc(-100% + var(--wedge-width)));
		transition: transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	header.held nav,
	header:hover nav,
	header:focus-within nav {
		transform: none;
	}

	nav > button {
		background-color: transparent;
		border: 0;
		padding: 0;
	}

	/* drop-shadow only on the wedge: it follows the shape, and it is small enough to
	   re-rasterise cheaply. On nav it would repaint the whole bar every frame. */
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
		fill: url(#wedge-surface);
		stroke: rgba(255, 255, 255, 0.18);
		stroke-width: 0.04;
	}

	/* Drawer pull: muted while the drawer is free to close, lit while pinned open */
	.grip line {
		stroke: var(--color-text);
		stroke-width: 0.13;
		stroke-linecap: round;
		opacity: 0.45;
		transition:
			stroke 0.2s linear,
			opacity 0.2s linear;
	}

	header.held .grip line {
		stroke: var(--color-primary);
		opacity: 1;
	}

	/* Pinned open reads as pressed in: the highlight goes, the shadow tightens */
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

	nav a {
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

	a:hover {
		color: var(--color-primary);
	}

	.dropdown {
		cursor: default;
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	/* Hovering the whole li keeps the menu open while the pointer travels into it,
	   and pointer-events keeps the hidden menu from swallowing clicks on the wedge.
	   focus-within is what makes the links reachable by keyboard: without it, tabbing
	   moves focus into a menu that is still transparent. */
	li:hover .dropdown-content,
	li:focus-within .dropdown-content {
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
		background: var(--background);
		transition:
			transform 0.7s,
			opacity 1s;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.2rem;
	}

	@media (prefers-reduced-motion: reduce) {
		nav,
		ul,
		svg,
		.grip line {
			transition: none;
		}
	}
</style>
