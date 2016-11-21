import { stub } from 'sinon';

export const history = stub.yield();
export const navigate = to => stub(to);
