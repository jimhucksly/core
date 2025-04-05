import { createApp, defineComponent } from "vue";

const App = defineComponent({
  template: '<div id="title">DN Core Library </div><div id="shadow">DN Core Library </div>'
})

const appComponent = createApp(App);
appComponent.mount('#app');
