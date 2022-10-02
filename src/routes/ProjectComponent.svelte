<script>
	export let title, svgSrc;
	let clicked;
</script>

<div on:click={() => (clicked = !clicked)} class="title-wrapper">
	<h3>{title}</h3>
</div>
<img src={svgSrc} alt="Project Component Icon" />

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
		h3 {
			font-family: $sans-serif-font;
			margin: 0;
			height: fit-content;
		}
	}

	img {
		display: none;
	}

	.content {
		position: absolute;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
