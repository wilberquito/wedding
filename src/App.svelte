<script>
	import CountDown from "./CountDown.svelte";
	import Location from "./Location.svelte";
	import Confirmation from "./Confirmation.svelte";
</script>

<CountDown />
<Location />
<Confirmation/>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}
	:global(.g__section) {
		background-color: rgb(225, 178, 178);
		padding: 1rem clamp(1rem, 10vw, 10rem);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
	:global(.g__default) {
		background-image: green;
	}
	@media (min-width: 769px) {
		:global(.g__section) {
			padding: 1rem clamp(1rem, 25vw, 20rem);
		}
	}
	@media (min-width: 1024px) {
		:global(.g__section) {
			padding: 1rem clamp(1rem, 35vw, 40rem);
		}
	}	
	:global(button) {
		border-radius: 10px;
		border: 3px solid rgb(27, 27, 27);
		text-transform: uppercase;
		background-color: transparent;
		padding: 0.8rem;
	}
</style>
