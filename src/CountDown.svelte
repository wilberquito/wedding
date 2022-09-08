<script>
    export const weddingDate = new Date("2022-09-09 17:15:30");
    const MILISECONDS_TO_DAYS = 1000 * 60 * 60 * 24;
    const MILISECONDS_TO_HOURS = MILISECONDS_TO_DAYS / 24;
    let remainingDays;
    let remainingHours;
    updateRemainings();
    setInterval(updateRemainings, 1000);

    function computeRemainingDays(refDate) {
        const diffTime = Math.abs(refDate - weddingDate);
        return Math.ceil(diffTime / MILISECONDS_TO_DAYS);
    }

    function computeRemainingHours(refDate) {
        // console.log(typeof refDate)
        // console.log(typeof weddingDate)
        // console.log(typeof (refDate - weddingDate))
        const diffTime = Math.abs(refDate - weddingDate);
        console.log(refDate, weddingDate)
        return Math.round(diffTime / MILISECONDS_TO_HOURS);
    }

    function computeRemainings() {
        const currentDate = new Date();
        const days = computeRemainingDays(currentDate);
        const hours = computeRemainingHours(addDays(currentDate, days - 1));
        return [days, hours];
    }

    function addDays(date, days) {
        const timestamp = date.setDate(date.getDate() + days);
        return new Date(timestamp);
    }

    function updateRemainings() {
        let [days, hours] = computeRemainings();
        remainingDays = days;
        remainingHours = hours;
    }
</script>

{remainingDays}
{remainingHours}
