import { expect } from 'chai'
import { mount } from '@vue/test-utils/dist/vue-test-utils.cjs.js'

import Lanes from '@/components/Lanes.vue'

describe('Lanes.vue', () => {
    const props = {
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
                description: "Task you are working on",
            },
        ],
        tasks: {}
    }
    it('renders two lanes with title "To Do" and "Doing"', () => {
        const wrapper = mount(Lanes, { props })
        expect(wrapper.findAll('[data-test="title"]')[0].text()).to.include('To Do')
        expect(wrapper.findAll('[data-test="title"]')[1].text()).to.include('Doing')
    })
    it('renders two lanes with descriptions "All tasks you need to do" and "Task you are working on"', () => {
        const wrapper = mount(Lanes, { props })
        expect(wrapper.findAll('[data-test="description"]')[0].text()).to.include(props.lanes[0].description)
        expect(wrapper.findAll('[data-test="description"]')[1].text()).to.include(props.lanes[1].description)
    })
})