import { mount } from '@vue/test-utils/dist/vue-test-utils.cjs.js'

import Lanes from '../src/components/Lanes.vue'

test('renders a todo', () => {
    const wrapper = mount(Lanes)

    expect(wrapper.find('[data-test="todo"]').text()).toBe('Learn Vue.js 3')
})