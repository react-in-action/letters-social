import React from 'react';
import renderer from 'react-test-renderer';
import Route from '../../../src/components/router/Route';
import Router from '../../../src/components/router/Router';

const RootComponentStub = ({ children }) => <div>{children}</div>;
const FoundComponentStub = () => <div className="found">found</div>;
const NotFoundComponentStub = () => <div className="not-found" />;

describe('<Route/>', () => {
    test('should render components that match a route', () => {
        const component = renderer.create(
            <Router location={'/a'}>
                <Route component={FoundComponentStub} path="/a" />
                <Route component={FoundComponentStub} path="/b" />
            </Router>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should render the right component when using a root component (index)', () => {
        const component = renderer.create(
            <Router location={'/a'}>
                <Route index path="/" component={RootComponentStub}>
                    <Route component={FoundComponentStub} path="a" />
                    <Route component={FoundComponentStub} path="b" />
                </Route>
            </Router>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('should render a NotFound route', () => {
        const component = renderer.create(
            <Router location={'/not-found'}>
                <Route component={FoundComponentStub} path="/a" />
                <Route component={NotFoundComponentStub} path="*" />
            </Router>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
