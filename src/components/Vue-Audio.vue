<template>
    <audio :src="fileUrl" :loop="loop" :class="className"></audio>
</template>

<script>
    export default {
        name: "Vue-Audio.vue",
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            fileUrl: String
        },
        data: function(){
          return{
              className: "audio" + (new Date().getTime()) +  Math.floor(Math.random()*1000),
              audioElement: ""
          }
        },
        mounted: function(){
            this.audioElement = document.querySelector("."+this.className);
        },
        methods: {
            updateState: function (value) {
                switch (value) {
                    case "play":
                        this.audioElement.play();
                        break;
                    case  "pause":
                        this.audioElement.pause();
                        break;
                    case  "stop":
                        this.audioElement.pause();
                        this.audioElement.currentTime = 0;
                        break;
                    case  "replay":
                        this.audioElement.currentTime = 0;
                        this.audioElement.play();
                        break;
                }
            }
        }
    }
</script>

<style scoped>
</style>