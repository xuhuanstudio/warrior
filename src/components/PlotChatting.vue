<template>
    <div class="plot-chat">
        <Clock></Clock>
        <transition name="gradual" class="gradual">
            <div class="bg-mask" v-if="showBgMask"></div>
        </transition>
        <transition name="gradual" class="gradual">
            <button class="look" v-if="showLookBtn" @click="showChat=true,showLookBtn=false,printChat()">查 看 消 息</button>
        </transition>
        <transition name="gradual">
            <div class="chat" v-if="showChat">
                <ul class="record">
                    <li class="b">
                        <div class="content">
                            你啥时候回来
                        </div>
                    </li>
                    <li class="h">1月20日 8:20</li>
                    <transition-group name="elasticity">
                        <li v-for="(item, index) in chatRecordData" :key="index" :class="item.id">
                            <div class="content">
                                {{item.content}}
                            </div>
                        </li>
                    </transition-group >
                    <li class="placeholder"></li>
                </ul>
            </div>
        </transition>
        <VueAudio ref="warningToneAudio" :file-url="src_warning_tone" :loop="false"></VueAudio>
        <VueAudio ref="bgAudio_light_music" :file-url="src_light_music"></VueAudio>
    </div>

</template>

<script>
    import Clock from "@/components/Clock";
    import VueAudio from "@/components/Vue-Audio";

    import src_warning_tone from "@/assets/audios/warning_tone.mp3";
    import src_light_music from "@/assets/audios/light_music.mp3";

    export default {
        name: "PlotChatting",
        components: {
            Clock,
            VueAudio
        },
        data: function(){
            return{
                showBgMask: false,
                showLookBtn: false,
                showChat: false,
                chatRecordData: [],
                src_warning_tone,
                src_light_music
            };
        },
        mounted: function() {
            const self = this;

            self.$nextTick(function () {
                let _index = 0;
                const _data = [
                    {title: "您有1条腾讯新闻", desc: "疫情危机持续同时，亦遇上全球...", time: 1000},
                    {title: "您有1条微信消息", time: 4000},
                    {title: "您有2条微信消息", time: 3500}
                ];

                (function showNotice(){
                    const _element = _data[_index++];
                    setTimeout(function(){
                        self.$Notice.info({
                            title: _element.title,
                            desc: _element.desc,
                            duration: 2.5
                        });

                        self.$refs.warningToneAudio.updateState("play");

                        if(_index < _data.length){
                            showNotice();
                        }else{
                            setTimeout(function(){
                                self.showBgMask = true;
                                self.showLookBtn = true;
                            }, 2000);
                        }
                    }, _element.time);
                })();
            });
        },
        methods: {
            printChat: function (){
                const self = this;
                self.$refs.bgAudio_light_music.updateState("play");

                const _chatRecordData = [
                    {id: "a", time: 1500, content: "家里现在都还好么"},
                    {id: "a", time: 1500, content: "今年过年我可能就要去武汉了"},
                    {id: "a", time: 3000, content: "已经报名了"},
                    {id: "b", time: 2500, content: "医护人员那么多，不缺你一个的，要不咋就不去了吧"},
                    {id: "a", time: 2500, content: "但是我自荐了"},
                    {id: "a", time: 3000, content: "我觉得我有这个义务"},
                    {id: "a", time: 3000, content: "因为我和其他的医护人员那么不一样，我是汶川人呀"},
                    {id: "b", time: 2500, content: "可是"},
                    {id: "a", time: 2500, content: "好了，不说了，先这样吧"},
                    {id: "b", time: 2500, content: "一定要平安回来啊"},
                    {id: "b", time: 3000, content: "一定要！"},
                    {id: "b", time: 2500, content: "答应我"},
                    {id: "h", time: 3500, content: "对方暂时无法接听..."}
                ];

                let _index = 0;

                (function readData(){
                    const _element = _chatRecordData[_index++];
                    setTimeout(function () {
                        self.chatRecordData.push(_element);

                        if(_index < _chatRecordData.length){
                            readData();
                        }else{
                            setTimeout(function () {
                                self.$emit("event-next");
                            }, 3000);
                        }
                    }, _element.time);
                })();

            }
        }
    }
</script>

<style scoped>

    .gradual{
        position: fixed;
        width: 100vw;
        height: 100vh;
    }

    .gradual-enter-active, .gradual-leave-active{
        transition: opacity 3s;
    }
    .gradual-enter, .gradual-leave-to{
        opacity: 0;
    }
    /*横屏*/
    @media screen and (orientation:landscape) {
        .look{
            margin-top: 15vh;
        }
    }
    /*竖屏*/
    @media screen and (orientation:portrait) {
        .look{
            bottom: 15vw;
        }
    }
    @media screen and (max-width: 640px){
        .chat{
            max-width: 100vw;
        }
    }
    @media screen and (min-width: 640px){
        .chat{
            max-width: 600px;
        }
    }

    .bg-mask{
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.6);
    }
    .look{
        position: fixed;
        z-index: 100;
        background-color: transparent;
        border-radius: 30px;
        border: 3px solid rgb(255, 181, 174);
        width: 200px;
        height: 60px;
        text-align: center;
        color: rgb(255, 181, 174);
        box-shadow: 1px 1px 2px rgb(237, 184, 189),
                    inset 1px 1px 2px rgb(237, 184, 189);
        font-weight: 400;
        text-shadow: 1px 1px 1px rgb(218, 166, 171);
        font-size: 20px;

        cursor: pointer;
    }

    .look:hover{
        box-shadow: 1px 1px 3px rgb(218, 166, 171),
            inset 1px 1px 3px rgb(218, 166, 171);
        text-shadow: 1px 1px 2px rgb(218, 166, 171);
    }
    .look:active{
        transform: scale(1.05);
    }

    .plot-chat{
        position: fixed;
        display: flex;
        /*background: url("../assets/images/bg_1.jpg") no-repeat center/cover;*/
        background-color: #eee9e4;
        top: 0;
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
    }

    .chat{
        position: absolute;

        width: 100%;
        /*max-width: 60vh;*/
        height: 100vh;
        background: rgba(222, 222, 222, 0.3);
        /*padding: 0px 20px;*/

        /*box-shadow: inset 1px 1px 5px #aaaaaa;*/
        border-radius: 5px;
        z-index: 10;
        /*overflow: hidden;*/
    }

    .elasticity-enter-active, .elasticity-leave-active {
        transition: all 1s;
    }
    .elasticity-enter, .elasticity-leave {
        transform: translateX(10px);
        opacity: 0;
    }

    .record{
        /*position: fixed;*/
        position: absolute;
        margin: 0 20px;
        min-height: 100vh;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .record li.placeholder{
        width: 100%;
        height: 40px;
    }

    li{
        display: flex;
        margin: 18px 0;

    }
    li.h{
        padding: 1px .8em;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 2em;
        margin-left: calc(50% - 4em);
        display: inline-block;
    }
    /*头像*/
    li.a::before{
        display: inline-block;
        content: '';
        background: url("../assets/images/icon_0.jpg") no-repeat center/cover;
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
    /*箭头*/
    li.a .content::before{
        position: absolute;
        display: inline-block;
        content: '';
        width: 2px;
        height: 2px;

        border-top: 6px solid transparent;
        border-right: 6px solid #ffffff;
        border-bottom: 6px solid transparent;

        top: 12px;
        left: -6px;

    }
    /*内容*/
    li.a .content{
        display: inline-block;
        position: relative;

        margin-left: 20px;

        background-color: #ffffff;
        max-width: calc(100% - 100px);

        border-radius: 5px;

        padding: 8px;
    }
    li.b{
        display: flex;
        justify-content: flex-end;
    }
    li.b::after{
        display: inline-block;
        content: '';
        background: url("../assets/images/icon_1.jpg") no-repeat center/cover;
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
    li.b .content::after{
        position: absolute;
        display: inline-block;
        content: '';
        width: 2px;
        height: 2px;

        border-top: 6px solid transparent;
        border-left: 6px solid #ffffff;
        border-bottom: 6px solid transparent;

        top: 12px;
        right: -6px;
    }
    li.b .content{
        display: inline-block;
        position: relative;

        /*display: flex;*/
        /*justify-content: flex-end;*/

        margin-right: 20px;

        background-color: #ffffff;
        max-width: calc(100% - 100px);

        border-radius: 5px;

        padding: 8px;
    }
</style>