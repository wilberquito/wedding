<script>
    import { data } from './../assets/gyc.json';
    export let photos = [];
    export let title = undefined;
    export let description = undefined;
</script>

<div class="g__section">
    <h1>{title}</h1>
    <p>{description}</p>
    <div class="photos__wrapper">
        {#each photos as photo}
            <img src={photo} alt="wedding" />
        {/each}
    </div>
</div>

<style>
    .photos__wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
        grid-auto-rows: minmax(100px, auto);
    }
    .photos__wrapper > img {
        object-fit: scale-down;
        width: 100%;
        transition: opacity 100ms ease;
        cursor: pointer;
    }
    .photos__wrapper:has(img:hover) img:not(:hover) {
        opacity: 0.7;
    }
    @media (min-width: 769px) {
        .photos__wrapper {
            grid-gap: 10px;
        }
        .photos__wrapper > img {
            width: 30rem;
        }
    }
    @media (min-width: 1024px) {
        .photos__wrapper {
            grid-gap: 15px;
        }
        .photos__wrapper > img {
            width: 35rem;
        }
    }
</style>
