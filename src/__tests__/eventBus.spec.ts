import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance, defineComponent } from 'vue';
import { Vue } from 'vue-property-decorator';
import { eventBus } from '../utils/eventBus';

interface IComponent {
  value: number;
}

let wrapper: VueWrapper<Vue, ComponentPublicInstance>;
let component: IComponent;

const rootComponent = defineComponent({
  template: '<div></div>',
  data() {
    return {
      value: 0,
    };
  },
});

function setupTest() {
  try {
    let options = {};
    wrapper = mount(rootComponent, options);
    component = wrapper.vm as unknown as IComponent;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

describe('EventBus', () => {
  beforeEach(() => {
    setupTest();
  });

  afterEach(() => {
    wrapper = null;
    component = null;
    eventBus.$flush();
  });

  it('Правильно привязывает обработчик события', () => {
    const handler = () => {
      component.value++;
    };
    eventBus.$on('event', handler);
    expect(eventBus.$has('event')).toBeTruthy();
  });

  it('Корректно отрабатывает вызов обработчика события', () => {
    const handler = () => {
      component.value++;
    };
    eventBus.$on('event', handler);
    eventBus.$emit('event');
    expect(component.value).toEqual(1);
  });

  it('Корректно создает единичный вызов обработчика события', () => {
    const handler = () => {
      component.value++;
    };
    eventBus.$once('event', handler);
    eventBus.$emit('event');
    expect(eventBus.$has('event')).toBeFalsy();
    eventBus.$emit('event');
    expect(component.value).toEqual(1);
  });

  it('Правильно привязывает несколько обработчиков к одному событию', async () => {
    const handler1 = () => {
      component.value++;
    };
    const handler2 = () => {
      component.value++;
    };
    eventBus.$on('event', handler1);
    eventBus.$on('event', handler2);
    eventBus.$emit('event');
    expect(component.value).toEqual(2);
  });

  it('Правильно отвязывает один обработчик от события', async () => {
    const handler1 = () => {
      component.value++;
    };
    const handler2 = () => {
      component.value++;
    };
    eventBus.$on('event', handler1);
    eventBus.$on('event', handler2);
    eventBus.$off('event', handler1);
    eventBus.$emit('event');
    expect(component.value).toEqual(1);
  });

  it('Корректно передает данные в emit', async () => {
    let result: number = null;
    let results: Array<number> = null;
    const handler = (...args: any[]) => {
      result = args[0];
      results = args;
    };
    eventBus.$on('event', handler);
    eventBus.$emit('event', 1);
    expect(result).toEqual(1);
    eventBus.$emit('event', 1, 2, 3);
    expect(results).toEqual([1, 2, 3]);
  });

  it('Корректно очищает все привязки', () => {
    const handler = () => {
      component.value++;
    };
    eventBus.$on('event', handler);
    eventBus.$flush();
    eventBus.$emit('event');
    expect(component.value).toEqual(0);
  });
});
