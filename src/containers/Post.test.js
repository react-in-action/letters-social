import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { Post as PostModel } from '../../db/models';
import { SinglePost } from './Post';
import { Post } from '../components/post/Post';


jest.mock('../shared/http');
describe('<SinglePost/>', function () {
  it('should render correctly', () => {
    const newPost = new PostModel();
    const component = renderer.create(<SinglePost params={{post: newPost.id}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
