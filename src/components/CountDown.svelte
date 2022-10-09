<script>
    import { onInterval } from "./../utils";

        export let limitDate = new Date() 

        let remainingDays;
        let remainingHours;
        let remainingMinuts;
        let remainingSeconds;

        updateRemainings();
        onInterval(updateRemainings, 1000);

        function updateRemainings() {
                let { days, hours, minutes, seconds } = computeRemainings();
                remainingDays = days;
                remainingHours = hours;
                remainingMinuts = minutes;
                remainingSeconds = seconds;
            }

        function computeRemainings() {
                if (hasBeenHeld()) {
                        return {
                                days: 0,
                                hours: 0,
                                minutes: 0,
                                seconds: 0
                            }
                    }
                const countDownDate = limitDate.getTime();
                const now = new Date().getTime();
                const distance = Math.abs(countDownDate - now);
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                return {
                        days,
                        hours,
                        minutes,
                        seconds,
                    };
            }

        function zeroPad(num, pads = 2) {
                return String(num).padStart(pads, "0");
            }

        function hasBeenHeld() {
                return new Date() >= limitDate 
            }

</script>

<div class="countdown__container">
    <div class="countdown__item">
        <span class="countdown">
            {zeroPad(remainingDays)}
        </span>
        <span class="label">días</span>
    </div>
    <div class="countdown__item">
        <span class="countdown">
            {zeroPad(remainingHours)}
        </span>
        <span class="label">horas</span>
    </div>
    <div class="countdown__item">
        <span class="countdown">
            {zeroPad(remainingMinuts)}
        </span>
        <span class="label">minutos</span>
    </div>
    <div class="countdown__item">
        <span class="countdown">
            {zeroPad(remainingSeconds)}
        </span>
        <span class="label">segundos</span>
    </div>
</div>

<style>
    .countdown__container {
        color: white;
        background-color: var(--bcolor-1);
        padding: 1rem;
        width: calc(100% - 2rem);
        height: 10rem;
        display: flex;
        align-items: center;
    }
    .countdown__item {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .countdown__item .countdown {
        font-size: clamp(3rem, 2.5vw, 5rem);
    }
    .countdown__item .label {
        font-size: clamp(1rem, 1vw, 1.5rem);
    }
</style>
