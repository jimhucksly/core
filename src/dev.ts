import { createApp, defineComponent } from 'vue';
import { generatePalette } from './palette';
import { strings } from './utils/string';

const App = defineComponent({
  template: '<div id="title">DN Core Library </div>',
  created() {
    const palette = document.createElement('style');
    palette.innerHTML = generatePalette();
    palette.id = 'dn-palette';
    document.body.appendChild(palette);
  }
})

const appComponent = createApp(App);
appComponent.mount('#app');
