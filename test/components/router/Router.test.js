import React from 'react';
import { shallow } from 'enzyme';
import Route from '../../../src/components/router/Route';
import Router from '../../../src/components/router/Router';

const RootComponentStub = ({ children }) => <div>{children}</div>;
const FoundComponentStub = () => <div className="found">found</div>;
const NotFoundComponentStub = () => <div className="not-found" />;

describe('<Route/>', () => {
    describe('render methods', () => {
        it('should render components that match a route', () => {
            const wrapper = shallow(
                <Router location={'/a'}>
                    <Route component={FoundComponentStub} path="/a" />
                    <Route component={FoundComponentStub} path="/b" />
                </Router>
            );
            expect(wrapper.find(FoundComponentStub).length).toBe(1);
        });
        it('should render the right component when using a root component (index)', () => {
            const wrapper = shallow(
                <Router location={'/a'}>
                    <Route index path="/" component={RootComponentStub}>
                        <Route component={FoundComponentStub} path="a" />
                        <Route component={FoundComponentStub} path="b" />
                    </Route>
                </Router>
            );
            expect(wrapper.find(FoundComponentStub).length).toBe(1);
        });

        it('should render a NotFound route', () => {
            const wrapper = shallow(
                <Router location={'/not-found'}>
                    <Route component={FoundComponentStub} path="/a" />
                    <Route component={NotFoundComponentStub} path="*" />
                </Router>
            );
            expect(wrapper.find(NotFoundComponentStub).length).toBe(1);
        });
    });
});
