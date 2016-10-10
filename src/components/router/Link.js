import { PropTypes, Children, Component, cloneElement } from 'react';
import { navigate } from '../../history';

class Link extends Component {
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { to, children } = this.props;
    return cloneElement(Children.only(children), {
      onClick: () => navigate(to),
    });
  }
}

export { Link };
