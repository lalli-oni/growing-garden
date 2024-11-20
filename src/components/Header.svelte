<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/articles') ? 'page' : undefined}>
				<a href="/articles">Articles</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/experiments') ? 'page' : undefined}>
				<a href="/experiments">Experiments</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/about-') ? 'page' : undefined}>
				<div class="dropdown">About...</div>
				<div class="dropdown-content">
					<div>
						<a aria-current={$page.url.pathname === '/about-app' ? 'page' : undefined} href="/about-app">App</a>
					</div>
					<div>
						<a aria-current={$page.url.pathname === '/about-me' ? 'page' : undefined} href="/about-me">Author</a>
					</div>
				</div>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	header {
		left: 50%;
		right: 50%;
		position: absolute;
		display: flex;
		justify-content: center;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: var(--color-bg-semidark);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
		flex-shrink: 0;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
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
		transition: transform 0.7s, opacity 1s;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.2rem;
	}
</style>
