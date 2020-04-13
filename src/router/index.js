import Vue from 'vue';
import VueRouter from 'vue-router';

const Start = () => import('@/views/Start');
const Prologue = () =>  import('@/views/Prologue');
const PlotChatting = () =>  import('@/views/PlotChatting');
const BattleAssignmentBook = () =>  import('@/views/BattleAssignmentBook');

Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: '/start'},
    {path: '/start', component: Start},
    {path: '/prologue', component: Prologue},
    {path: '/plot-chatting', component: PlotChatting},
    {path: '/battle-assignment-book', component: BattleAssignmentBook}
];

const router = new VueRouter({
    routes,
    mode: 'abstract'
});

export default router;