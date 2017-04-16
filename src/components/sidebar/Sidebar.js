import React, { PropTypes } from 'react';
import { categories } from '../../../db/constants';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

class Sidebar extends React.Component {
    static propTypes = {
        category: PropTypes.string,
        onClearFilter: PropTypes.func.isRequired,
        onFilterSelect: PropTypes.func.isRequired,
        onMediaFilterSelect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.selectFilter = this.selectFilter.bind(this);
        this.showFilters = this.showFilters.bind(this);
    }
    state = {
        categories,
        showFilters: false
    };

    selectFilter(category, withImages, withLinks) {
        this.props.onFilterSelect(category, withImages, withLinks);
    }

    showFilters() {
        this.setState({
            showFilters: !this.state.showFilters
        });
    }

    render() {
        return (
            <AutoAffix viewportOffsetTop={40}>
                <div className="sidebar hidden-xs">
                    <div className="filters">
                        <small className="filter-section-header">
                            Categories
                        </small>
                        <ButtonGroup vertical block>
                            {categories.map(category => {
                                return (
                                    <Button
                                        key={category}
                                        onClick={() =>
                                            this.selectFilter(category)}
                                        className="filter-control"
                                    >
                                        {category}
                                    </Button>
                                );
                            })}
                        </ButtonGroup>

                        <small className="filter-section-header">Media</small>
                        <ButtonGroup vertical block>
                            <Button
                                onClick={() =>
                                    this.props.onMediaFilterSelect('image')}
                                className="filter-control"
                            >
                                With images <i className="fa fa-picture" />
                            </Button>
                        </ButtonGroup>

                        <small className="filter-section-header">Links</small>
                        <ButtonGroup vertical block>
                            <Button
                                onClick={() =>
                                    this.props.onMediaFilterSelect('link')}
                                className="filter-control"
                            >
                                With links <i className="fa fa-link" />
                            </Button>
                        </ButtonGroup>

                        <hr className="filter-section-divider" />

                        <Button
                            bsStyle="danger"
                            block
                            onClick={() => this.props.onClearFilter()}
                        >
                            Clear filters <i className="fa fa-close" />
                        </Button>
                    </div>
                </div>
            </AutoAffix>
        );
    }
}

export default Sidebar;
