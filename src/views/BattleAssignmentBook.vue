<template>
    <div class="battle-assignment-book">
        <div class="text-content">
            <p>请战书</p>
            <p>尊敬的南方医院党委：</p>
            <span>
                    <p>我们是2003年奉命赴北京小汤山抗击“非典”的南方医院医疗队队员，当年为全国抗击“非典”做出了应有的贡献，同时做到了应有的贡献，同时做到了医务人员“零感染”。</p>
                    <p>17年后的今天，当全中国人民正面对新冠状病毒(SARI)的肆虐，作为一支有丰富经验、战胜过“非典”的英雄集体，我们更是责无旁贷！</p>
                    <p>我们特此向院党委请战，愿为战胜新SARS样疫情，随时听候调令，我们小汤山全体队员都义无反顾，奔赴一线做出我们应有的贡献。</p>
                    <p>在此，我们积极请战，若有战，召必回，战必胜！</p>
                </span>
            <p>原第一军医大学赴小汤山医疗队全体队员</p>
            <p>2020年1月23日</p>
        </div>
        <ul class="fingerprints">
            <transition-group name="gradual">
                <li v-for="(item, index) in fingerprints" :key="index"></li>
            </transition-group>
        </ul>
        <ul class="records">
            <transition-group name="tell">
                <li v-for="(item, index) in records" :key="index"></li>
            </transition-group>
        </ul>

        <VueAudio  ref="bgAudio" :file-url="src_bg"></VueAudio>
    </div>
</template>

<script>
    import VueAudio from '@/components/Vue-Audio';

    import src_bg from '@/assets/audios/play_up.mp3';

    export default {
        name: 'BattleAssignmentBook',
        components: {
            VueAudio
        },
        data: function () {
            return{
                src_bg,
                showMask: true,
                fingerprints: [],
                records: []
            }
        },
        mounted: function () {
            const self = this;
            self.$nextTick(function(){

                self.$refs.bgAudio.updateState('play');

                setTimeout(function () {
                    self.showImagesByStep(self.fingerprints, 4, 3000, function () {
                        setTimeout(function () {
                            self.showImagesByStep(self.records, 6, 3500);
                        },3500);
                    });
                }, 22000);
            });

        },
        methods: {
            showImagesByStep: function (arr, stepCount, time, onComplete = null) {
                (function f(){
                    arr.push(null);
                    if(arr.length < stepCount){
                        setTimeout(f, time);
                    }else if(onComplete != null){
                        onComplete();
                    }
                })();
            }
        }
    }
</script>

<style scoped>

    .gradual-enter-active, .gradual-leave-active{
        transition: opacity 6s;
    }
    .gradual-enter, .gradual-leave-to{
        opacity: 0;
    }

    .tell-enter-active, .tell-leave-active{
        transition: opacity 6s;
    }
    .tell-enter, .tell-leave-to{
        opacity: 0;
    }


    .battle-assignment-book{
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background-image: linear-gradient(#f6e7e6, #e6e7f6);

        display: flex;
        /*align-items: center;*/
        justify-content: center;
    }
    .text-content{
        position: absolute;
        /*color: #666666;*/
        width: 85%;
        height: auto;
        max-width: 30em;
        /*top: 10vh;*/

        overflow: hidden;

        animation: up 20s linear;
        animation-fill-mode: forwards;
        bottom: 0;
    }

    @keyframes up {
        from{
            top: 100vh;
        }
        to{
            top: -300px;
        }
    }

    .text-content>p:nth-child(1){
        text-align: center;
        font-weight: bold;
        font-size: 2em;
    }
    .text-content>p:nth-child(2){
        font-weight: 600;
        font-size: 1.2em;
        line-height: 6em;
    }
    .text-content>span>p{
        text-indent: 2em;
        line-height: 2em;
    }
    .text-content>p:nth-last-child(2){
        line-height: 6em;
        text-align: right;
        font-weight: 600;
    }
    .text-content>p:nth-last-child(1){
        text-align: right;
        font-weight: 600;
    }

    /*指纹*/
    .fingerprints{
        position: fixed;
        bottom: 5vh;
        width: 85%;
        max-width: 50em;
        height: 40vw;
        min-height: 50vh;
        max-height: 65vh;
        opacity: 0.5;
        display: flex;
        justify-content: center;
    }
    .fingerprints li{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;

        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .fingerprints li:nth-child(1){background-image: url(../assets/images/fingerprints_0.png);}
    .fingerprints li:nth-child(2){background-image: url(../assets/images/fingerprints_1.png);}
    .fingerprints li:nth-child(3){background-image: url(../assets/images/fingerprints_2.png);}
    .fingerprints li:nth-child(4){background-image: url(../assets/images/fingerprints_3.png);}

    /*照片*/
    .records{
        position: fixed;
        width: 100vw;
        height: 100vh;
    }
    .records li{
        position: fixed;
        width: 60%;
        height: 60%;

        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;

        filter: drop-shadow(2px 2px 6px rgba(0,0,0,.2));
    }
    .records li:nth-child(1){
        transform: translate(-60%,-90%) rotate(20deg);
        background-image: url(../assets/images/a_0.png);
    }
    .records li:nth-child(2){
        transform: translate(-10%,-60%) rotate(-40deg);
        background-image: url(../assets/images/a_1.png);}
    .records li:nth-child(3){
        transform: translate(-93%,-20%) rotate(-20deg);
        background-image: url(../assets/images/a_2.png);
    }
    .records li:nth-child(4){
        transform: translate(-28%,0%) rotate(25deg);
        background-image: url(../assets/images/a_3.png);
    }
    .records li:nth-child(5){
        transform: translate(-50%,-40%) rotate(-0deg);
        background-image: url(../assets/images/a_4.png);
    }
    .records li:nth-child(6){
        transform: translate(-50%,-50%);
        background-image: url(../assets/images/play_up.png);
        filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 1));
    }
</style>