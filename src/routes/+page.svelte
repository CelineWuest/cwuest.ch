<script>
	import { quintOut, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import ProjectComponent from './ProjectComponent.svelte';
	import Name from './Name.svelte';
	import { Parallax, StickyLayer } from 'svelte-parallax';

	let iconSize = 100;
	let startDelay = 0;
	let duration = 1500;

	let nameProgress;
	let cvProgress;

	let ready;
	onMount(() => (ready = true));

	function yearsSince(dateString) {
		return new Date(Date.now() - new Date(dateString)).getUTCFullYear() - 1970;
	}

	setContext('projectComponent', {
		active: writable('Golang')
	});

	let transformMaxAngle = 10;
	let transformShadowScale = 10;
	let insetTransformShadowScale = 10;
	let transformElement;

	function rotate3d(event, node) {
		let rect = node.getBoundingClientRect();

		let xFrac = ((event.clientX - rect.x) / rect.width) * 2 - 1;
		let yFrac = ((event.clientY - rect.y) / rect.height) * 2 - 1;

		let dist = Math.sqrt(xFrac ** 2 + yFrac ** 2) / Math.sqrt(2);

		node.style.transform = `rotate3d(${yFrac}, ${-xFrac}, 0, ${dist * transformMaxAngle}deg)`;
		node.style.boxShadow = `${-xFrac * transformShadowScale}px ${
			-yFrac * transformShadowScale
		}px 5px 4px rgba(0, 0, 0, 0.5),
		inset ${-xFrac * insetTransformShadowScale}px ${
			-yFrac * insetTransformShadowScale
		}px 20px 10px rgba(0, 0, 0, 0.125)`;
	}

	function reset3d(node) {}
</script>

<div class="container">
	<Parallax sections={3} config={{ stiffness: 1 }}>
		<StickyLayer
			offset={{ bottom: 0, top: 0 }}
			let:progress
			onProgress={(p) => (nameProgress = p)}
			style="filter: brightness({Math.min(1.1 - nameProgress, 1)})"
		>
			<section>
				<Name intersecting={ready && progress < 1} />
				<h2 class="name-info-header">Developer with a Passion for Distributed Systems</h2>
				<div class="social-media">
					<h2>Find me on</h2>
					{#if ready && progress < 1}
						<div class="links">
							<a
								href="https://github.com/DominicWuest"
								target="_blank"
								class="link"
								in:fly={{ delay: startDelay + 0, duration, x: 2000, easing: quintOut }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={iconSize}
									height={iconSize}
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
									/>
								</svg>
								<p>GitHub</p>
							</a>
							<a
								href="https://stackoverflow.com/users/10639068/dwuest"
								target="_blank"
								class="link"
								in:fly={{ delay: startDelay + 100, duration, x: 2000, easing: quintOut }}
							>
								<svg
									width={iconSize}
									height={iconSize}
									viewBox="0 0 32 37"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M26 33V24H30V37H0V24H4V33H26Z" fill="currentColor" />
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M21.5 0L18.8 2L28.7 15.3L31.4 13.3L21.5 0ZM26 18.4L13.3 7.8L15.4 5.3L28.1 15.9L26 18.4ZM9.1 15.2L24.1 22.2L25.5 19.2L10.5 12.2L9.1 15.2ZM23.0908 25.9902L23.7844 23.041L7.67993 19.687L7 23L23.0908 25.9902ZM23 30H7V27H23V30Z"
									/>
								</svg>
								<p>StackOverflow</p>
							</a>
							<a
								href="https://www.linkedin.com/in/dominic-w%C3%BCst-095102179"
								target="_blank"
								class="link"
								in:fly={{ delay: startDelay + 200, duration, x: 2000, easing: quintOut }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={iconSize}
									height={iconSize}
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path
										d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
									/>
								</svg>
								<p>LinkedIn</p>
							</a>
						</div>
					{:else}
						<!-- Need this empty block, otherwise svelte triggers transition on first scroll -->
					{/if}
				</div>
			</section>
		</StickyLayer>

		<StickyLayer
			offset={{ top: 1 }}
			let:progress
			onProgress={(p) => (cvProgress = p)}
			style="filter: brightness({Math.min(1.1 - cvProgress, 1)})"
		>
			<section id="cv">
				<h1>CV</h1>
				<h2><a data-sveltekit-prefetch href="/cv.pdf">Open as PDF</a></h2>
				{#if nameProgress >= 0.1 && progress < 1}
					<div
						in:fly={{ duration: 800, x: -window.innerWidth, easing: cubicOut }}
						class="cv-content"
					>
						<div class="personal-info">
							<div class="info-header">
								<img src="/favicon.png" alt="Portrait" />
								<div class="info-facts">
									<table>
										<tr>
											<td>Name</td>
											<td>Dominic Wüst</td>
										</tr>
										<tr>
											<td>Age</td>
											<td>{yearsSince('02/12/2003')}</td>
										</tr>
										<tr>
											<td>E-Mail</td>
											<td><a href="mailto:dwuest@student.ethz.ch">dwuest@student.ethz.ch</a></td>
										</tr>
									</table>
								</div>
							</div>
							<div class="info-body">
								<div class="programming-languages">
									<h3>Programming Languages</h3>
									<p>
										Check <a href="#projects">Projects</a> to see what I made using those languages
									</p>
									<ul>
										<li>
											<h4>Go</h4>
											<p>1 year of experience</p>
										</li>
										<li>
											<h4>Python</h4>
											<p>{yearsSince('1/1/2017')} years of experience</p>
										</li>
										<li>
											<h4>TypeScript &amp; JavaScript</h4>
											<p>{yearsSince('1/1/2018')} years of experience</p>
										</li>
										<li>
											<h4>Java</h4>
											<p>{yearsSince('6/1/2017')} years of experience</p>
										</li>
										<p>General knowledge in: C, C++, Haskell, OCaml</p>
									</ul>
								</div>
								<div class="technologies">
									<h3>Technologies</h3>
									<ul>
										<li>
											<h4>Docker</h4>
											<p>I have written multiple Dockerfiles for various microservices.</p>
										</li>
										<li>
											<h4>Kubernetes</h4>
											<p>
												In my position as a SysAdmin at VIS I manage a sizable Kubernetes cluster
												and a smaller, private one running on my home network on the side.
											</p>
										</li>
										<li>
											<h4>gRPC</h4>
											<p>gRPC is most often my choice for IPC on distributed systems.</p>
										</li>
									</ul>
								</div>
								<div class="language">
									<h3>Languages</h3>
									<ul>
										<li>
											<h4>German</h4>
											<p>Natively</p>
										</li>
										<li>
											<h4>English</h4>
											<p>Fluent</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="timeline">
							<h3>Timeline</h3>
							<ul>
								<li>
									<h3>March 2022 - Present: VIS</h3>
									<h4>October 2022 - Present: SysAdmin and Board Member</h4>
									<h4>March 2022 - Present: Member of two Commissions (CAT & CIT)</h4>
									<p>Association of Computer Science Students at ETH</p>
									<p>Member of the Computer Infrastructure and Computer Application Team</p>
								</li>
								<li>
									<h3>September 2020 - Present: ETH Zürich</h3>
									<p>BSc Computer Science</p>
								</li>
								<li>
									<h3>August 2017 - June 2020: Kantonsschule Baden</h3>
									<p>Focus on Physics and Applied Mathematics</p>
								</li>
							</ul>
							<h3>Awards</h3>
							<ul>
								<li>
									<h3>2020: Best Technical Graduation Project at Kantonsschule Baden</h3>
									<p>Yearly awarded to the best Technical Graduation Project</p>
									<p>Awarded for the "CSAcademy" project</p>
								</li>
							</ul>
						</div>
					</div>
				{/if}
			</section>
		</StickyLayer>

		<StickyLayer offset={{ top: 2 }}>
			<section id="projects">
				<h1>My Projects</h1>
				<div
					class="projects-container"
					bind:this={transformElement}
					on:mousemove={(e) => rotate3d(e, transformElement)}
					on:mouseleave={() => reset3d(transformElement)}
				>
					<ul>
						<li class="golang">
							<ProjectComponent title="Golang" svgSrc="/golang.svg">
								<ul class="project-element golang-text">
									<li>
										<h3>
											Alphie <a href="https://github.com/DominicWuest/Alphie" target="_blank"
												><img alt="Project GitHub link" /></a
											>
										</h3>
										<p>
											A Discord bot made up of multiple microservices, mainly written in Go and
											currently running on a cluster of four systems.
										</p>
										<p>Features include:</p>
										<ul>
											<li>Reliable uptime with Kubernetes</li>
											<li>
												Creating clips of currently livestreaming ETH lectures on demand to view
												them again later
											</li>
											<li>
												Random 2D image generation of a fluid or a ball bouncing around in a box
											</li>
											<li>
												Automatic TODO lists generated for course assignments, where students can
												subscribe to preset schedules or add their own items
											</li>
											<li>Playing a game of Blackjack in a Discord chat</li>
										</ul>
									</li>
								</ul>
							</ProjectComponent>
						</li>
						<li>
							<ProjectComponent title="Javascript / Typescript" svgSrc="/typescript.svg">
								<ul class="project-element ts-text">
									<li>
										<h3>
											Companionwatch
											<a href="https://github.com/DominicWuest/CompanionWatch" target="_blank"
												><img alt="Project GitHub link" /></a
											>
										</h3>
										<p>
											A website where friends can watch YouTube videos together over the internet
											with synced controls.
										</p>
										<p>
											This functionality was achieved by using WebSockets over a Node.js backend.
										</p>
										<p>Currently hosted under <a href="https://cw.dwuest.com">cw.dwuest.com</a>.</p>
									</li>
									<li>
										<h3>
											Alphie's Frontend
											<a href="https://github.com/DominicWuest/Alphie" target="_blank"
												><img alt="Project GitHub link" /></a
											>
										</h3>
										<p>
											Built with the Svelte framework. TypeScript was used for authentication and
											displaying CDN content.
										</p>
									</li>
									<li>
										<h3>
											Maturaarbeit (Graduation Project in High School)
											<a href="https://github.com/DominicWuest/Maturaarbeit" target="_blank"
												><img alt="Project GitHub link" /></a
											>
										</h3>
										<p>
											A website for students to learn coding and algorithms, ranging from the simple
											Bubble Sort over DH key exchanges to hashing algorithms like SHA. With a
											built-in Python interpreter to automatically correct coding exercises. Node.js
											was used for the backend.
										</p>
										<p>Winner of the best Technological Graduation Project 2020 at Kanti Baden.</p>
										<p>
											Developed with two other students, where I was in charge of the main
											organization, the whole backend and around half of the articles.
										</p>
										<p>
											Currently hosted under <a href="https://csa.dwuest.com">csa.dwuest.com</a>.
										</p>
									</li>
									<li>
										<h3>This website</h3>
										<p>
											JavaScript was used for the animations and the SvelteKit framwork for the
											backend.
										</p>
									</li>
								</ul>
							</ProjectComponent>
						</li>
						<li>
							<ProjectComponent title="Java" svgSrc="/java.svg">
								<ul class="project-element java-text">
									<li>
										<h3>
											Mandelbrot <a
												href="https://github.com/DominicWuest/Mandelbrot"
												target="_blank"><img alt="Project GitHub link" /></a
											>
										</h3>
										<p>
											An interactive display of the Mandelbrot set, where the rendering is optimized
											with parallel programming.
										</p>
									</li>
									<li>
										<h3>Multiple smaller Processing sketches, including</h3>
										<ul>
											<li>Game Of Life</li>
											<li>A visualisation of Bubble Sort</li>
											<li>Minesweeper</li>
										</ul>
									</li>
								</ul>
							</ProjectComponent>
						</li>
						<li>
							<ProjectComponent title="Python" svgSrc="/python.svg">
								<ul class="project-element python-text">
									<li>
										<h3>Multiple Machine Learning Models</h3>
										<p>
											Within a course at ETH I created and trained five different models to predict
											data using Pytorch, Tensorflow and SkLearn
										</p>
										<p>Datasets included:</p>
										<ul>
											<li>
												The HOMO-LUMO gap of molecules which indicates a material's strength and
												reactivity
											</li>
											<li>Pictures of food and their similarity to other foods</li>
											<li>Medical emergencies and duration of hospital visits</li>
										</ul>
									</li>
									<li>
										<h3>Lots of smaller Scripts</h3>
										<p>
											From time to time I increase my productivity with the help of smaller Python
											scripts to automate monotonous work.
										</p>
									</li>
								</ul>
							</ProjectComponent>
						</li>
					</ul>
					<div class="filler" />
				</div>
			</section></StickyLayer
		>
	</Parallax>
</div>

<style lang="scss">
	@use '../lib/vars.scss' as *;

	h1 {
		font-size: 3em;
		color: $fg2;
		font-family: $monospace-font;
	}

	h2 {
		color: $fg2;
		font-family: $monospace-font;
	}

	svg path {
		stroke-linecap: square;
	}

	@keyframes chevron {
		0% {
			bottom: 25px;
			opacity: 0;
		}
		15% {
			bottom: 25px;
		}
		40% {
			bottom: 0;
			opacity: 0.2;
		}
		70% {
			opacity: 0.05;
		}
		80% {
			opacity: 0.05;
		}
		100% {
			opacity: 0;
		}
	}

	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	section {
		margin-bottom: 50px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #282828;
		color: white;
	}

	section::after {
		content: '';
		mask: url('/chevron-down.svg') no-repeat 50% 50%;
		mask-size: cover;
		background-color: white;
		width: 64px;
		height: 64px;
		display: block;
		position: absolute;
		bottom: 0;
		left: 50vw;
		transform: translate(-50%, 15%);
		animation-timing-function: ease-in-out;
		animation-name: chevron;
		animation-duration: 5s;
		animation-iteration-count: infinite;
	}

	section:last-child {
		margin-bottom: 0;
		&::after {
			display: none;
		}
	}

	.name-container {
		height: 200px;
	}

	.name-info-header {
		text-align: center;
	}

	.social-media {
		padding-top: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.links {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 25%;
		height: 200px;
		a {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
				text-decoration-color: $bg4;
			}
			p {
				color: $fg3;
				font-family: $monospace-font;
				font-size: 0.75em;
			}
		}

		svg {
			color: $fg1;
		}
	}

	#cv {
		justify-content: start;
		font-family: $sans-serif-font;
		h1 {
			margin: 20px 0;
			margin-bottom: 0px;
		}
		a {
			color: inherit;
		}
		h2 a {
			color: inherit;
			word-spacing: -50%;
			&::after {
				content: '';
				mask: url('/box-arrow-up-right.svg') no-repeat 50% 50%;
				mask-size: cover;
				background-color: $fg2;
				width: 16px;
				height: 16px;
				display: block;
				position: relative;
				left: 102%;
				bottom: 70%;
			}
			&:hover {
				text-decoration-color: $bg4;
				&::after {
					background-color: $bg4;
				}
			}
		}
		h3 {
			font-weight: 900;
		}
	}

	.cv-content {
		display: grid;
		grid-template-columns: 4fr 5fr;
		column-gap: 50px;
		width: 70%;
		height: 70%;
		margin: 0 auto;
		padding: 10px 30px;
		border-radius: 10px;
		background-color: $bg1;
		box-shadow: -5px 5px 5px 4px rgba($color: black, $alpha: 0.5);
		transition: box-shadow;
		img {
			height: 128px;
		}
	}

	.technologies p {
		font-size: 0.8em;
		font-weight: 700;
		padding-bottom: 7px;
	}

	.info-header {
		display: flex;
		flex-direction: row;
	}

	.info-facts table {
		border-spacing: 0 0.65em;
		td {
			padding: 0 15px;
		}
	}

	.info-body {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		column-gap: 30px;
		height: 55%;

		div {
			width: 50%;
			li {
				h4,
				p {
					margin: 0;
				}
			}
		}
	}

	.timeline p {
		margin: 10px 0;
		&:last-of-type {
			margin-bottom: 20px;
		}
	}

	.timeline h3 {
		margin-top: 5px;
	}

	.timeline h4 {
		margin: 15px 0;
		position: relative;
		&::before {
			content: '';
			height: calc(50% + 30px);
			transform: translateX(-50%);
			bottom: 50%;
			background-color: white;
			width: 1px;
			display: block;
			position: absolute;
			left: -11px;
		}
		&::after {
			content: '';
			height: 1px;
			transform: translateY(-50%);
			background-color: white;
			width: 10px;
			display: block;
			position: absolute;
			left: -11px;
			top: 50%;
		}
	}

	.projects-container {
		margin: 0 auto;
		border-radius: 10px;
		background-color: $bg1;
		box-shadow: 0 0 5px 4px rgba($color: black, $alpha: 0.5);
		width: 70%;
		height: 70%;
		transition: box-shadow 0.05s, transform 0.1s;
		transform-style: preserve-3d;
		display: flex;
		flex-direction: column;
		position: relative;
		> ul {
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: row;
			list-style-type: none;
			width: 100%;
			height: 50px;
			border-bottom: 1px solid black;
			> li {
				position: initial;
				border-right: 1px solid black;
				border-top-right-radius: 15px;
				border-top-left-radius: 15px;
				box-shadow: 2px 0 5px -1.75px black;
				transition: box-shadow 100ms ease-in;
				background-color: $bg1;
				height: fit-content;
			}
		}

		.filler {
			height: 100%;
			background-color: rgba(0, 0, 0, 0.075);
		}
	}

	.project-element {
		font-family: $sans-serif-font;
		font-size: 1.2em;
		list-style-type: none;
		padding: 0;
		h3 {
			margin-bottom: 20px;
			font-size: 2em;
			img {
				content: url('/github.svg');
				width: 28px;
				height: auto;
			}
		}
		a {
			color: inherit;
		}
	}
</style>
