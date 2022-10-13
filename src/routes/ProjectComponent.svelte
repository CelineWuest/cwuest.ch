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
		background-color: inherit;
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
		&:hover {
			box-shadow: 5px -1px 5px -1px black;
		}
		&.active {
			height: 60px;
			margin-top: calc($ul-height - 60px);
		}
	}

	.content {
		position: absolute;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 50px;
		height: calc(100% - $ul-height); // 100% minus the height of the ul element of languages
		overflow-y: scroll;
	}
</style>
