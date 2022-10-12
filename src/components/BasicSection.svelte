<script>
	import { openNewWindow } from './../utils';
	export let titleIcon = false;
	export let title = undefined;
	export let description = undefined;
	export let buttonText = undefined;
	export let buttonExternalUrl = undefined;

	const openExternalUrl = () => openNewWindow(buttonExternalUrl);
</script>

<div class="g__section">
	{#if titleIcon}
		<i class="fa fa-church"></i>
	{/if}
	<h1>{title}</h1>
	<p class="text">{description}</p>
	<button class="g__button" on:click={openExternalUrl}>
		{buttonText}
	</button>
</div>

<style>
	i {
		font-size: 3rem;
	}
</style>
