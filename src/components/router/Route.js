import { PropTypes } from 'react';
import invariant from 'invariant';

const Route = () => invariant(false, '<Route> elements are for config only and shouldn\'t be rendered');

Route.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export { Route };
