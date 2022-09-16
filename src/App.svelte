<script>
    import { data } from './assets/data.json';
        import CountDown from "./components/CountDown.svelte";
        import Location from "./components/Location.svelte";
        import Confirmation from "./components/Confirmation.svelte";
        import Story from "./components/Story.svelte";
        import BasicSection from './components/BasicSection.svelte'

        const {
                story,
                confirmation,
                location,
                songs
            } = data;
        console.log(songs)
</script>

<CountDown />

<!-- location -->
<BasicSection 
        titleImg="images/palm.png"
        title={location.title}
        description={location.description} 
        buttonText={location.buttonText} 
        buttonExternalUrl={location.src} />

<!-- confirmation -->
<BasicSection 
        title={confirmation.title}
        description={confirmation.description} 
        buttonText={location.buttonText} 
        buttonExternalUrl={confirmation.src} />

<Story 
        title={story.title} 
        description={story.description} 
        photos={story.photos} /> 

<!-- songs -->
<BasicSection 
        titleImg="images/palm.png"
        title={songs.title}
        description={songs.description} 
        buttonText={songs.buttonText}
        buttonExternalUrl={songs.src} />


