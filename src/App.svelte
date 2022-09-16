<script>
    import { data } from './assets/data.json';
        import CountDown from "./components/CountDown.svelte";
        import Location from "./components/Location.svelte";
        import Confirmation from "./components/Confirmation.svelte";
        import Story from "./components/Story.svelte";
        import BasicSection from './components/BasicSection.svelte'

        const {
                confirmation,
                location
            } = data;
        console.log(confirmation, location) 
</script>

<CountDown />
<!-- location -->
<BasicSection 
    titleImg="images/palm.png"
    title={location.title}
    description={location.description} 
    buttonText="ver mapa" 
    buttonExternalUrl={location.googleAddress} />
    <Confirmation />
    <Story /> 

    <BasicSection description="hola"/>

