<template>
    <div class="start">
        <Snowf v-bind="snowConf"></Snowf>
        <div class="fist-logo"></div>
        <div class="text-logo" :class="{animation: animation}">
            <div class="waves" :class="{animation: animation}"></div>
        </div>
        <transition name="gradual" mode="out-in">
            <div class="btn" @click="showContent = true, playUp()" v-if="!showContent" :key="0">
                为他们加油助力
            </div>
            <div class="text-content" v-else :key="1">
                <p>“希望四月武汉樱花浪漫时，</p>
                <p>它不再封城，像往年那样，</p>
                <p>千千万万人在树下看樱花，</p>
                <p>樱花在树上看遍千千万万的人。”</p>
            </div>
        </transition>
        <VueAudio ref="bgAudio_light_music" :file-url="src_light_music"></VueAudio>
    </div>
</template>

<script>
    import Snowf from 'vue-snowf';
    import VueAudio from "./Vue-Audio";

    import src_petal from '@/assets/images/petal.png';
    import src_light_music from "@/assets/audios/light_music.mp3";

    export default {
        name: "Start",
        components: {
            Snowf,
            VueAudio
        },
        data: function () {
            return{
                snowConf: {
                    amount: 50,
                    size: 10,
                    speed: 1,
                    wind: 0.2,
                    opacity: 1,
                    swing: 1,
                    image: src_petal,
                    zIndex: null,
                    resize: true,
                    color: "#fff"
                },
                src_light_music,
                showSnow: true,
                animation: false,
                showContent: false
            }
        },
        methods: {
            playUp: function (){
                const self = this;

                self.animation = true;

                self.$refs.bgAudio_light_music.updateState("play");

                setTimeout(function () {
                    self.$emit('event-next');
                }, 10000);

            }
        }
    }
</script>

<style scoped>

    .gradual-enter-active{
        transition: opacity 1s;
    }
    .gradual-leave-active{
        transition: opacity 2s;
    }
    .gradual-enter, .gradual-leave-to{
        opacity: 0;
    }

    .start{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100vh;
        /*background-color: #202020;*/
        background: url("../assets/images/bg_2.jpg") no-repeat center/cover;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .text-content{
        position: absolute;
        color: #202020;
        width: 100%;
        bottom: 10vh;
    }
    .text-content p{
        margin-top: 1vh;
        letter-spacing: 0.2em;
        text-align: center;
        font-weight: 600;
    }

    .btn{
        position: absolute;
        color: #ffffff;
        text-align: center;
        background: #009de5;
        cursor: pointer;
        bottom: 10vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn:hover{
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }
    .btn:active{
        transform: scale(1.1);
    }

    .waves::before,
    .waves::after{
        position: absolute;
        content: '';
        background-color: rgba(37, 19, 0, 0.7);
    }
    .waves::after{
        transform: rotate(45deg);
    }

    .waves{
        display: flex;
        align-items: center;
        justify-content: center;
        /*background-color: rgba(255, 255, 255, 1);*/
    }

    .waves.animation{
        animation: waves-r 4s infinite linear,
            waves-t 10s linear;
        animation-fill-mode: forwards;
    }

    @keyframes waves-r {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    .fist-logo{
        position: absolute;
        background: url("../assets/images/fist.png") no-repeat center/cover;
    }

    .text-logo{
        position: absolute;
        background-color: rgba(219, 0, 75, 0.85);
        mask: url("../assets/images/text_logo.png") no-repeat center/cover;
    }

    .text-logo.animation{
        animation: logo-hue-rotate 15s infinite linear;
    }
    
    @keyframes logo-hue-rotate {
        0%{
            filter: hue-rotate(0deg);
        }
        100%{
            filter: hue-rotate(20deg);
        }
    }

    /*横屏*/
    @media screen and (orientation:landscape) {
        .waves::before,
        .waves::after{
            width: 70vh;
            height: 70vh;
            border-radius: 22vh 28vh;
        }
        .fist-logo{
            width: 35vh;
            height: 50vh;
            transform: translateY(-10vh);
        }
        .text-logo{
            width: 60vh;
            height: 24vh;
        }
        .btn{
            width: 35vh;
            height: 10vh;
            border-radius: 5vh;
            font-size: 1.5em;
        }
        @media screen and (max-height: 360px){
            .text-content{
                font-size: 0.8em;
            }
            .text-content p{
                margin-top: 0.4em;
            }
        }

        @keyframes waves-t {
            0%{
                margin-top: 5vh;
            }
            100%{
                margin-top: -40vh;
            }
        }
    }
    /*竖屏*/
    @media screen and (orientation:portrait) {
        .waves::before,
        .waves::after{
            width: 70vw;
            height: 70vw;
            border-radius: 22vh 28vh;
        }
        .fist-logo{
            width: 35vw;
            height: 50vw;
            transform: translateY(-10vw);
        }
        .text-logo{
            width: 60vw;
            height: 24vw;
        }
        .btn{
            min-width: 100px;
            width: 56vw;
            max-width: 35vw;
            min-height: 30px;
            height: 14vw;
            max-height: 10vw;
            border-radius: 7vw;
            font-size: 4vw;
        }
        .text-content{
            font-size: 0.9em;
        }
        @keyframes waves-t {
            0%{
                margin-top: 5vw;
            }
            100%{
                margin-top: -40vw;
            }
        }
    }
</style>