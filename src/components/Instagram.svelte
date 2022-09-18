<script>
    import { openNewWindow } from './../utils';

    export let hashtag = undefined;
    export let buttonText = undefined;
    export let hashtagSrc = undefined;
    export let backgroundSrc = undefined;

    function openHashtagUrl() {
        openNewWindow(hashtagSrc);
    }
</script>

<div class="no__limit">
    <div class="background" style="--url: url({backgroundSrc})" />
    <div class="floating">
        <i class="fab fa-instagram" />
        <h1 class="insta">{hashtag}</h1>
        <button on:click={openHashtagUrl}>{buttonText}</button>
    </div>
</div>

<style>
    .no__limit {
        height: 20rem;
        width: 100%;
        padding: 0 !important;
        margin: 0 !important;
        position: relative;
    }
    @media (min-width: 768px) {
        .no__limit {
            height: 40rem;
        }
    }

    @media (min-width: 1024px) {
        .no__limit {
            height: 50rem;
        }
    }
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: var(--url);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        filter: blur(5px);
        aspect-ratio: 1/1;
    }
    .floating {
        color: var(--bcolor-1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 9;
        background-color: transparent;
        height: 100%;
        width: 100%;
        flex-direction: column;
    }
    .floating i {
        font-size: 5rem;
    }
    .insta {
        font-size: 2rem; /* change this to change the size*/
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
            Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    }
    button {
        margin-top: 2rem;
        border: 3px solid var(--bcolor-1);
        color: var(--bcolor-1);
    }
    button:active {
        background-color: #77777759;
    }
    h1:first-letter {
        text-transform: lowercase;
    }
</style>
