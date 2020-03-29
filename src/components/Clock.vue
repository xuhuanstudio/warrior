<template>
    <div class="clock">
        <div class="second" :style="'transform: rotate(' + secondAngle + 'deg)'"></div>
        <div class="minute" :style="'transform: rotate(' + minuteAngle + 'deg)'"></div>
        <div class="hour" :style="'transform: rotate(' + hourAngle + 'deg)'"></div>
        <div class="dot"></div>
    </div>
</template>

<script>
    export default {
        name: "Clock",
        data: function(){
            return{
                secondAngle: 0,
                minuteAngle: 0,
                hourAngle: 0
            }
        },
        created: function() {
            this.updateTime();
            setInterval(this.updateTime, 1000);
        },
        methods: {
            updateTime: function(){
                const _date = new Date();

                this.secondAngle = _date.getSeconds() / 60 * 360;
                this.minuteAngle = _date.getMinutes() / 60 * 360;
                this.hourAngle = _date.getHours() % 12 / 12 * 360;
            }
        }
    }
</script>

<style scoped>
    .clock{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        border-radius: 50%;
        border: 30px solid #fafafa;
        box-sizing: border-box;
        /*box-shadow: ;*/
        box-shadow: inset 0px 0px 5px rgba(128, 128, 128, 0.5),
                    10px 10px 5px 10px rgba(254, 206, 181, 0.38);
    }

    .hour::before,
    .minute::before,
    .second::before{
        position: absolute;
        content: '';
        border-radius: 10px;
        transition: transform 0.2s;
    }

    .hour::before{
        background-color: #202020;
    }
    .minute::before{
        background-color: rgb(43, 43, 43);
    }
    .second::before{
        background-color: rgb(207, 53, 57);
    }

    .dot::before{
        position: absolute;
        content: '';
        background-color: #f5f5f5;
        border-radius: 50%;
    }

    /*横屏*/
    @media screen and (orientation:landscape) {
        .clock{
            width: 80vh;
            height: 80vh;
        }
        .clock{
            width: 80vh;
            height: 80vh;
        }
        .hour::before{
            width: 3vh;
            height: 12vh;
            transform: translate(-1.5vh, -13.5vh);
        }
        .minute::before{
            width: 2vh;
            height: 20vh;
            transform: translate(-1vh, -21vh);
        }
        .second::before{
            width: 1vh;
            height: 28vh;
            transform: translate(-0.5vh, -28.5vh);
        }
        .dot::before{
            width: 4vh;
            height: 4vh;
            border: 0.8vh solid #202020;
            transform: translate(-2vh, -2vh);
        }
    }
    /*竖屏*/
    @media screen and (orientation:portrait) {
        .clock{
            width: 80vw;
            height: 80vw;
        }
        .hour::before{
            width: 3vw;
            height: 12vw;
            transform: translate(-1.5vw, -13.5vw);
        }
        .minute::before{
            width: 2vw;
            height: 20vw;
            transform: translate(-1vw, -21vw);
        }
        .second::before{
            width: 1vw;
            height: 28vw;
            transform: translate(-0.5vw, -28.5vw);
        }
        .dot::before{
            width: 4vw;
            height: 4vw;
            border: 0.8vw solid #202020;
            transform: translate(-2vw, -2vw);
        }
    }


</style>