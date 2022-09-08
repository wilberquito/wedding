<script>
    import { pipe } from "./utils/Pipe";

    export const weddingDate = new Date("2022-09-09 17:15:30");

    const MILISECONDS_TO_DAYS = 1000 * 60 * 60 * 24;
    const MILISECONDS_TO_HOURS = MILISECONDS_TO_DAYS / 24;
    const MILISECONDS_TO_MINUTS = MILISECONDS_TO_HOURS / 60;
    const MILISECONDS_TO_SECONDS = MILISECONDS_TO_MINUTS / 60;

    const addDays = (days) => (date) => {
        const timestamp = date.setDate(date.getDate() + days);
        return new Date(timestamp);
    };

    const addHours = (hours) => (date) => {
        const timestamp = date.setTime(
            date.getTime() + hours * MILISECONDS_TO_HOURS
        );
        return new Date(timestamp);
    };

    const addMinuts = (minuts) => (date) => {
        const timestamp = date.setMinutes(date.getMinutes() + minuts);
        return new Date(timestamp);
    };

    const diffMilliseconds = (d1) => (d2) => Math.abs(d1 - d2);

    let remainingDays;
    let remainingHours;
    let remainingMinuts;
    let remainingSeconds;

    updateRemainings();
    setInterval(updateRemainings, 1000);

    function computeRemainingDays(miliseconds) {
        return Math.ceil(miliseconds / MILISECONDS_TO_DAYS);
    }

    function computeRemainingHours(miliseconds) {
        return Math.round(miliseconds / MILISECONDS_TO_HOURS);
    }

    function computeRemainingMinuts(miliseconds) {
        return Math.round(miliseconds / MILISECONDS_TO_MINUTS);
    }

    function computeRemainingSeconds(miliseconds) {
        return Math.round(miliseconds / MILISECONDS_TO_SECONDS);
    }

    function computeRemainings() {
        const currentDate = new Date();

        const days = pipe(
            diffMilliseconds(weddingDate),
            computeRemainingDays
        )(currentDate);

        const hours = pipe(
            addDays(days - 1),
            diffMilliseconds(weddingDate),
            computeRemainingHours
        )(currentDate);

        const minuts = pipe(
            addDays(days - 1),
            addHours(hours - 1),
            diffMilliseconds(weddingDate),
            computeRemainingMinuts
        )(currentDate);

        const seconds = pipe(
            addDays(days - 1),
            addHours(hours - 1),
            addMinuts(minuts - 1),
            diffMilliseconds(weddingDate),
            computeRemainingSeconds
        )(currentDate);

        return {
            days,
            hours,
            minuts,
            seconds,
        };
    }

    function updateRemainings() {
        let { days, hours, minuts, seconds } = computeRemainings();
        remainingDays = days;
        remainingHours = hours;
        remainingMinuts = minuts;
        remainingSeconds = seconds;
    }
</script>

{remainingDays}
{remainingHours}
{remainingMinuts}
{remainingSeconds}
<!-- https://www.w3schools.com/howto/howto_js_countdown.asp -->