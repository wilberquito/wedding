<script>
    import { data } from './assets/gyc.json';
    import CountDown from './components/CountDown.svelte';
    import Story from './components/Story.svelte';
    import BasicSection from './components/BasicSection.svelte';
    import Instagram from './components/Instagram.svelte';

    const { metadata, countdown, story, confirmation, location, songs, gift, instagram } =
        data;

    document.title = metadata?.title || document.title;
</script>

<CountDown limitDate={new Date(countdown.weddingDate)} />

<!-- location -->
<BasicSection
    titleIcon=true
    title={location.title}
    description={location.description}
    buttonText={location.buttonText}
    buttonExternalUrl={location.src}
/>

<!-- confirmation -->
<BasicSection
    title={confirmation.title}
    description={confirmation.description}
    buttonText={confirmation.buttonText}
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

<Instagram
    hashtag={instagram.hashtag}
    hashtagSrc={instagram.hashtagSrc}
    buttonText={instagram.buttonText}
    backgroundSrc={instagram.backgroundSrc}
/>
