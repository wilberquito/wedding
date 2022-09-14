<script>
    import { data } from './../assets/data.json';

        const {
                photos,
                title,
                description
            } = data['story'];
</script>

<div class="g__section">
    <h1>{title}</h1>
    <p>{description}</p>
    <div class="photos-wrapper">
        {#each photos as photo}
            <img
                    src="{photo}"
                    alt="wedding"
                    />
        {/each}
    </div>
</div>

<style>
    .photos-wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
        grid-auto-rows: minmax(100px, auto);
    }
    .photos-wrapper img {
        object-fit: scale-down;
        width: 30rem;
    }
    @media (max-width: 1024px) {
        .photos-wrapper {
            grid-gap: 15px;
        }
        .photos-wrapper img {
            width: 25rem;
        }
    }
    @media (max-width: 769px) {
        .photos-wrapper {
            grid-gap: 15px;
        }
        .photos-wrapper img {
            width: 100%;
        }
    }
</style>

