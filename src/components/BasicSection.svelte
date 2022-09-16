<script>
    import { openNewWindow } from "./../utils";
        export let titleImg;
        export let title;
        export let description;
        export let buttonText;
        export let buttonExternalUrl;

        const openExternalUrl = () => openNewWindow(externalUrl)
</script>

<div class="g__section">
    {#if titleImg}
        <img
                src="{titleImg}"
                alt="title img"
                />

    {/if}
    <h1>{title}</h1>
    <p class="text">{description}</p>
    <button class="g__button" on:click={openExternalUrl}>
        {buttonText}
    </button>
</div>

<style>
    img {
        width: 300px;
    }
</style>
