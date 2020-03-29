<template>
    <div class="prologue">
        <ul class="typewriter">
            <li></li>
            <li v-for="(item,index) in content" :key="index">{{item}}</li>
        </ul>
        <VueAudio ref="bgAudio" :file-url="src_typewriting"></VueAudio>
        <transition name="fade">
            <div class="hint" v-if="showHint" @click="$emit('event-next')">
                <span>点击屏幕继续</span>
            </div>
        </transition>
    </div>
</template>

<script>
    import VueAudio from "./Vue-Audio";

    import src_typewriting from "@/assets/audios/typewriting.mp3";

    export default {
        name: "Prologue",
        components: {
            VueAudio
        },
        data: function(){
            return{
                content: "",
                showHint: false,
                src_typewriting
            };
        },

        mounted: function() {
            const self = this;

            self.$nextTick(function () {
                const _content = "雪花飞舞，只因人间太美，笑对生命，只因眼泪太贵，今年的春节，我们的心一直被疫情牵动着，经历着很多内心的变化，有焦虑，有担忧，也有不安，在短短不到三个月的时间，感受到生命的无常，每天都有成千上万感人故事上演，更感受到每个人心中的坚强与勇敢，给我们内心更多的善意与爱。   ";
                let _contentCount = 0;

                self.$refs.bgAudio.updateState("play");

                const _timer = setInterval(function () {
                    self.content += _content[_contentCount++];
                    if(_contentCount == _content.length){
                        clearInterval(_timer);
                        self.$refs.bgAudio.updateState("stop");

                        setTimeout(function () {
                            self.showHint = true;
                        }, 1500);
                    }
                }, 200);
            });

        }
    }
</script>

<style scoped>
    .prologue{
        display: flex;
        background-color: #202020;
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
    }

    .typewriter{
        display: inline-block;
        color: #ffffff;
        font-weight: bold;
        letter-spacing: .4em;
        line-height: 1.5em;

        text-shadow: 1px 1px 2px #000000;

        min-width: 17.8em;
        width: 85%;
        max-width: 34.6em;
    }

    .typewriter li{
        display: inline-block;
    }
    .typewriter li:first-child {
        width: 2.8em;
        height: 1.5em;
    }
    .typewriter li:nth-last-child(3){
        opacity: .8;
    }
    .typewriter li:nth-last-child(2){
        opacity: .5;
    }
    .typewriter li:nth-last-child(1){
        opacity: .2;
    }

    .hint{
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: 1;
        animation: flicker 3s infinite;
        cursor: pointer;
    }
    @keyframes flicker {
        0%{
            opacity: 0.1;
        }
        45%,55%{
            opacity: 1
        }
        100%{
            opacity: 0.1
        }
    }
    .hint>span{
        position: fixed;
        bottom: 2.5em;
        right: 2.5em;
        font-weight: bold;
        letter-spacing: .4em;
        color: #ffffff;
        text-shadow: 1px 1px 2px #000000;
        font-size: 13px;
    }

    .fade-enter-active{
        transition: opacity 1s;
    }
    .fade-enter{
        opacity: 0;
    }
</style>