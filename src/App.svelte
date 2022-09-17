<script>
	import { onMount } from 'svelte';
	import { data } from './assets/data.json';
	import CountDown from './components/CountDown.svelte';
	import Story from './components/Story.svelte';
	import BasicSection from './components/BasicSection.svelte';

	const { countdown, story, confirmation, location, songs, gift } = data;
</script>

<CountDown limitDate={new Date(countdown.weddingDate)} />

<!-- location -->
<BasicSection
	titleImg="images/palm.png"
	title={location.title}
	description={location.description}
	buttonText={location.buttonText}
	buttonExternalUrl={location.src}
/>

<!-- confirmation -->
<BasicSection
	title={confirmation.title}
	description={confirmation.description}
	buttonText={location.buttonText}
	buttonExternalUrl={confirmation.src}
/>

<Story title={story.title} description={story.description} photos={story.photos} />

<!-- songs -->
<BasicSection
	title={songs.title}
	description={songs.description}
	buttonText={songs.buttonText}
	buttonExternalUrl={songs.src}
/>

<!-- gift -->
<BasicSection
	titleImg="images/palm.png"
	title={gift.title}
	description={gift.description}
	buttonText={gift.buttonText}
	buttonExternalUrl={gift.src}
/>
