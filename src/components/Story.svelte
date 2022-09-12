<script>
    console.log("about to explaini our story");
</script>

<div class="g__section">
    <h1>Nuestra historia</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, minima
        magnam autem consectetur, soluta tempore id aliquam voluptatibus vitae
        laboriosam fugiat, esse illo veniam praesentium velit incidunt similique
        eos recusandae?
    </p>
    <div class="photos-wrapper">
        <img
            src="https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW"
            alt=""
        />
        <img
            src="https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW"
            alt=""
        />
        <img
            src="https://drive.google.com/uc?id=1OUz8ahfySWjSoH07tQys4xLWcAHFw3GW"
            alt=""
        />
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
