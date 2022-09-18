<script>
	export let hashtag = undefined;
	export let description = undefined;
	export let buttonText = undefined;
	export let hashtagUrl = undefined;
	export let srcBackground =
		'https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW';
</script>

<div class="g__section">
	<img class="background" src={srcBackground} />
	<p>{description}</p>
</div>

<style>
	.background {
		background-image: url('https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW');
		background-repeat: no-repeat;
		background-size: cover;
		aspect-ratio: 1/1;
	}
</style>
