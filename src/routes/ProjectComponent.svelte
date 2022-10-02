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
	class="title-wrapper"
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

	.title-wrapper {
		display: flex;
		cursor: pointer;
		height: 100%;
		margin: 0;
		padding: 0 15px;
		justify-content: center;
		flex-direction: column;
		position: relative;
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
		}
	}

	.content {
		position: absolute;
		left: 0;
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
