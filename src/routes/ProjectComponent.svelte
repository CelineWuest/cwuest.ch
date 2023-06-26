<script>
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { getContext, setContext } from 'svelte';

	export let title, svgSrc;

	let clicked;
	let hover;

	const { active } = getContext('projectComponent');
	$: clicked = $active == title;
	function click() {
		active.set(title);
	}
</script>

<div
	on:click={click}
	class="title-wrapper {clicked ? 'active' : ''}"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
>
	{#if hover || clicked}
		<img
			transition:fade={{ duration: 150, easing: cubicInOut }}
			src={svgSrc}
			alt="Project Component Icon"
		/>
	{/if}
	<h3>{title}</h3>
</div>

{#if clicked}
	<div class="content">
		<slot />
	</div>
{/if}

<style lang="scss">
	@use '../lib/vars.scss' as *;

	$ul-height: 50px;

	.title-wrapper {
		border-right: 1px solid black;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		box-shadow: 2px 0 5px -1.75px black;
		transition: box-shadow 100ms ease-in;
		background-color: $bg1;
		display: flex;
		cursor: pointer;
		height: 50px;
		margin: 0;
		padding: 0 15px;
		justify-content: center;
		flex-direction: column;
		position: relative;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		img {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 100%;
			height: 50px;
			width: auto;
			display: block;
			padding-bottom: 5px;
		}
		h3 {
			font-family: $sans-serif-font;
			margin: 0;
			height: fit-content;
			white-space: nowrap;
		}
		&:hover {
			box-shadow: 5px -1px 5px -1px black;
		}
		&.active {
			height: 60px;
			margin-top: calc($ul-height - 60px);
		}
	}

	.content {
		word-wrap: break-word;
		position: absolute;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 50px;
		padding-bottom: 15px;
		height: 100%;
		overflow-y: scroll;
	}

	@media screen and (max-width: 40em) {
		.content {
			padding: 0 25px;
			padding-bottom: 15px;
		}
	}
</style>
