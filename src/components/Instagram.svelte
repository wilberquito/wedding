<script>
    export let hashtag = undefined;
    export let description = undefined;
    export let buttonText = undefined;
    export let hashtagUrl = undefined;
    export let srcBackground =
        'https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW';
</script>

<div class="no__limit">
    <div class="background" />
    <div class="floating">
        <i class="fab fa-instagram" />
        <h1 class="insta">#Hashtag</h1>
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
        background-image: url('https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW');
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
    img {
        width: 50px;
        margin-bottom: 1rem;
    }
</style>
