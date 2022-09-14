<script>
    import { data } from './../assets/data.json';
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
    <div class="box" />
    <p class="text">{description}</p>
    <button class="g__button" on:click={openGoogleMapsReference}>
        ver mapa
    </button>
    </div>

<style>
    .box {
        width: 10rem;
        height: 10rem;
        background-color: blue;
    }
</style>

