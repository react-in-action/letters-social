import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { CreatePost } from './Create';

describe('<Create/>', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('constructor', () => {
        it('should be constructed properly', () => {
            const onSubmitStub = sandbox.stub();
            const component = shallow(<CreatePost onSubmit={onSubmitStub}/>);
            expect(component.instance().handleSubmit).toBeDefined();
            expect(component.instance().handlePostChange).toBeDefined();
        });
    });
    describe('event methods', () => {
        it('should handle a post submission', () => {
            const onSubmitStub = sandbox.stub();
            const preventDefaultStub = sandbox.stub();
            const wrapper = shallow(<CreatePost onSubmit={onSubmitStub}/>);
            const mockNewValue = 'new value';
            wrapper.find('textarea').simulate('change', {
                target: {
                    value: mockNewValue
                }
            });
            wrapper.find('form').simulate('submit', {
              preventDefault: preventDefaultStub
            });

            expect(onSubmitStub.calledOnce).toBe(true);
            expect(preventDefaultStub.calledOnce).toBe(true);
            const calledWithArgs = onSubmitStub.args[0][0];
            expect(calledWithArgs.id).toBeDefined();
            expect(calledWithArgs.date).toBeDefined();
            expect(calledWithArgs.content).toBe(mockNewValue);
        });
    });
    describe('render methods', () => {
        it('should render correctly', () => {
            const onSubmitStub = sandbox.stub();
            const wrapper = shallow(<CreatePost onSubmit={onSubmitStub}/>);
            expect(wrapper.find('form').length).toBe(1);
            expect(wrapper.find('textarea').length).toBe(1);
            expect(wrapper.find('button').length).toBe(1);
        });
    });
});
