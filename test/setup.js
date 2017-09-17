import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.Raven = {
    setUserContext: jest.fn(),
    captureException: jest.fn()
};

// Mapbox gets written to the window, so we need to stub stuff out
global.L = {
    latLng: jest.fn(),
    mapbox: {
        map: jest.fn(() => {
            return {
                setView: jest.fn(),
                invalidateSize: jest.fn()
            };
        }),
        marker: {
            icon: jest.fn()
        }
    },
    marker: jest.fn(() => {
        return {
            addTo: jest.fn(),
            setLatLng: jest.fn(),
            icon: jest.fn()
        };
    })
};
