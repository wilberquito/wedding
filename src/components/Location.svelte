<script>
    import { openNewWindow } from './../utils/Navigation'
    export const weddingLocationUrl = "https://goo.gl/maps/fwkFsFwauuNjLwq18";
    export const title = "Fiesta";

    export const plaintText = `La fiesta sera el sabado 09 de julio de 2022.
        Os esperamos a las 19:30 hs en Masia
        Durba, hotel hubicado en Carretera Geldo
        Castelnovo KM1 123, Casterllnovo, Castellon`;


    function openGoogleMapsReference() {
        openNewWindow(weddingLocationUrl)
    }
</script>

<div class="g__section">
    <div class="box" />
    <p>{plaintText}</p>
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
