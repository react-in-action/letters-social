import crash from '../../src/middleware/crash';
import * as types from '../../src/constants/types';

const mockStore = () => {
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
    };
    const next = jest.fn();
    const invoke = action => crash(store)(next)(action);
    return { next, invoke };
};

describe('crash middleware', function() {
    test('should log out any error info on the action', () => {
        console.error = jest.fn();
        const { next, invoke } = mockStore();
        const action = { type: types.app.ERROR, error: 'oops' };
        invoke(action);
        expect(next).toHaveBeenCalledWith(action);
        expect(console.error).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(action.error);
    });
});
