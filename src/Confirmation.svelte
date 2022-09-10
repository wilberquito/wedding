<script>
    import { openNewWindow } from "./utils/Navigation";
    export const title = "Confirmar Asistencia";
    export const warnConfirmation = "Confirma antes del 31 de mayo";
    export const confirmationUrl = "https://forms.gle/yw9XCV5awPuWxrVN8";

    function openConfirmationGoogleForms() {
        openNewWindow(confirmationUrl);
    }
</script>

<div class="g__section">
    <h1>{title}</h1>
    <p>{warnConfirmation}</p>
    <button class="g__button" on:click={openConfirmationGoogleForms}>
        CONFIRMAR
    </button>
</div>

<style>
    .box {
        width: 10rem;
        height: 10rem;
        background-color: blue;
    }
</style>
