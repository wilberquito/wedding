<script>
    import "./Story.css";
    console.log("about to explain our story");
</script>

<div class="g__section">
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
</style>
