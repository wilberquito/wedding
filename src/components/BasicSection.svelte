<script>
	import { openNewWindow } from './../utils';
	export let titleImg = undefined;
	export let title = undefined;
	export let description = undefined;
	export let buttonText = undefined;
	export let buttonExternalUrl = undefined;

	const openExternalUrl = () => openNewWindow(buttonExternalUrl);
</script>

<div class="g__section">
	{#if titleImg}
		<img src={titleImg} alt="title img" />
	{/if}
	<h1>{title}</h1>
	<p class="text">{description}</p>
	<button class="g__button" on:click={openExternalUrl}>
		{buttonText}
	</button>
</div>

<style>
	img {
		width: 50px;
		margin-bottom: 1rem;
	}
</style>
