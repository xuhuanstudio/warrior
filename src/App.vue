<template>
  <div id="app">
    <transition name="gradual">
      <Start v-if="showStart" @event-next="showStart=false,showPrologue=true"></Start>
      <Prologue v-else-if="showPrologue"  @event-next="showPrologue=false, showPlotChatting=true"></Prologue>
      <PlotChatting v-else-if="showPlotChatting" @event-next="showPlotChatting=false, showBattleAssignmentBook=true"></PlotChatting>
      <BattleAssignmentBook v-else-if="showBattleAssignmentBook"></BattleAssignmentBook>
    </transition>
  </div>
</template>

<script>
import Start from "@/components/Start";
import Prologue from "@/components/Prologue";
import PlotChatting from "@/components/PlotChatting";
import BattleAssignmentBook from "@/components/BattleAssignmentBook";

export default {
  name: 'App',
  components: {
    Start,
    Prologue,
    PlotChatting,
    BattleAssignmentBook
  },
  data: function () {
    return{
      showStart: true,
      showPrologue: false,
      showPlotChatting: false,
      showBattleAssignmentBook: false
    }
  },
  created: function () {

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;

  outline: none;
  /*font-size: 14px;*/
  list-style: none;
}

.gradual-enter-active, .gradual-leave-active{
    transition: opacity 3s;
}
.gradual-enter, .gradual-leave-to{
    opacity: 0;
}
</style>
