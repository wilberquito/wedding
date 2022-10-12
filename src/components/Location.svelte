<script>
    import { data } from './../assets/gyc.json';
        import { openNewWindow } from "./../utils";

        const {
                googleAddress,
                description,
                title
            } = data['location'];

        function openGoogleMapsReference() {
                openNewWindow(googleAddress);
            }
</script>

<div class="g__section">
    <h1>{title}</h1>
    <p class="text">{description}</p>
    <button class="g__button" on:click={openGoogleMapsReference}>
        ver mapa
    </button>
</div>

