import { createApp, defineComponent } from "vue";

const App = defineComponent({
  template: '<div></div>'
})

const appComponent = createApp(App);
appComponent.mount('#app');
