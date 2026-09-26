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
	</nav>
	<button
		aria-label="toggle navbar"
		aria-pressed={holdNavbarOpen}
		onclick={() => (holdNavbarOpen = !holdNavbarOpen)}
	>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</button>
</header>

<style>
	/* Sole height source: the wedge svg and the nav items size off this via height: 100% */
	header {
		height: 3rem;
		display: flex;
		width: fit-content;
		/* On header, not nav: the toggle button's wedge lives outside nav and fills from this */
		--background: var(--color-bg-semidark);
		padding-right: 1rem;
		margin-bottom: 1rem;
	}

	/* The bar slides, not the header — that keeps the toggle button on screen when closed */
	nav {
		display: flex;
		justify-content: center;
		transform: translate(-22rem);
		transition: transform 1s;
	}

	header.held nav,
	header:hover nav,
	header:focus-within nav {
		transform: none;
	}

	header > button {
		background-color: transparent;
		border: 0;
		padding: 0;
	}

	/* The wedge is the toggle's only visible surface, so it stays accented in
	   every state — filling it with the bar's background hid it against the page */
	button path {
		fill: var(--color-primary);
	}

	svg {
		width: 2em;
		height: 100%;
		display: block;
		flex-shrink: 0;
	}

	path {
		fill: var(--background);
	}

	ul {
		padding: 0;
		margin: 0;
		display: flex;
		gap: 0.1rem;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
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

	.dropdown:hover + .dropdown-content {
		opacity: 1;
		transform: translateY(0%);
	}
	.dropdown-content:hover {
		opacity: 1;
		transform: translateY(0%);
	}

	.dropdown-content {
		position: absolute;
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
</style>
