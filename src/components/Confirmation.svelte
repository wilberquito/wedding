<script>
    import { openNewWindow } from "./../utils";
        import {data} from './../assets/data.json'

        const {
                googleDocs,
                title,
                description
            } = data['confirmation']

        function openConfirmationGoogleForms() {
                openNewWindow(googleAddress);
            }
</script>

<div class="g__section g__custom">
    <h1>{title}</h1>
    <p>{description}</p>
    <button class="g__custom" on:click={openConfirmationGoogleForms}>
        confirmar
    </button>
</div>
