import { expect } from 'chai'
import { mount } from '@vue/test-utils/dist/vue-test-utils.cjs.js'

import Lanes from '@/components/Lanes.vue'

describe('Lanes.vue', () => {
    it('renders two lanes with title "To Do" and "Doing"', () => {
        const wrapper = mount(Lanes, {
            props: {
                lanes: [
                    {
                        id: "lane1",
                        icon: "list",
                        status: 0,
                        title: "To Do",
                        description: "All tasks you need to do",
                    },
                    {
                        id: "lane2",
                        icon: "hourglass-start",
                        status: 1,
                        title: "Doing",
                        description: "All tasks you need to do",
                    },
                ],
                tasks: {}
            }
        })
        expect(wrapper.findAll('[data-test="title"]')[0].text()).to.include('To Do')
        expect(wrapper.findAll('[data-test="title"]')[1].text()).to.include('Doing')
    })
})