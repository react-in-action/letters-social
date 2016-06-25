import React, { PropTypes } from 'react';
import { categories } from '../../../db/constants';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

class Sidebar extends React.Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    onFilterSelect: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.filterBy = this.filterBy.bind(this);
  }
  state = {
    categories,
  }
  filterBy(filterName) {
    // this.props.onFilterSelect(filterName);
  }

  render() {
    return (
      <div className="sidebar">
        <AutoAffix
          viewportOffsetTop={65}
        >
          <ButtonGroup vertical block>
            {
              categories.map(category => {
                return (
                  <Button
                    key={category}
                    onClick={this.filterBy(category)}
                    className="filter"
                  >
                    {category}
                  </Button>
                );
              })
            }
          </ButtonGroup>
        </AutoAffix>
      </div>
    );
  }
}

export default Sidebar;
