<script lang="ts">
	// TODO (LTJ): Fix this svelte 5 deprecation issue
	import { page } from '$app/stores'

	let holdNavbarOpen = true
</script>

<header style:transform={holdNavbarOpen ? 'none' : undefined}>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" title="Home"
					><div>🪴</div>
					<div>Home</div></a
				>
			</li>
			<li aria-current={$page.url.pathname.includes('/articles') ? 'page' : undefined}>
				<a href="/articles" title="Articles"
					><div>✍️</div>
					<div>Articles</div></a
				>
			</li>
			<li aria-current={$page.url.pathname.includes('/experiments') ? 'page' : undefined}>
				<a href="/experiments" title="Experiments"
					><div>🧪</div>
					<div>Experiments</div></a
				>
			</li>
			<li aria-current={$page.url.pathname.includes('/about-') ? 'page' : undefined}>
				<div class="dropdown">👋</div>
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
	<button aria-label="toggle navbar" onclick={() => (holdNavbarOpen = !holdNavbarOpen)}>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			<text>{holdNavbarOpen ? 'Open' : 'Closed'}</text>
		</svg>
	</button>
</header>

<style>
	header {
		height: 3rem;
		display: flex;
		--background: var(--color-bg-semidark);
		transform: translate(-22rem);
		padding: 0 1rem 1rem 0;
	}

	header:hover {
		transform: none;
		transition: transform 1s;
	}

	header > button {
		background-color: transparent;
		border: 0;
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
