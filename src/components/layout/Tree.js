import React, {} from 'react';
import {Link} from 'react-router-dom';

class Tree extends React.Component {

    render() {
        let items = this.props.items
        if (!items || items === undefined) {
            items = []
        }
        let count = items.length - 1
        return (
            <nav className="breadcrumb  is-size-6 ml-4" aria-label="breadcrumbs">
                <ul>
                    {
                        items.map((item, i) => {
                            if (i !== count)
                                return (
                                    <li key={`tree-li-${i}`}>
                                        <Link to={`${item['path']}`} key={`tree-link-${i}`}>{item['name']}</Link>
                                    </li>
                                )
                            else
                                return (
                                    <li className="is-active" key={`tree-li-${i}`}>
                                        <Link to={`${item['path']}`} key={`tree-link-${i}`}
                                              aria-current="page">{item['name']}</Link>
                                    </li>
                                )
                        })
                    }
                </ul>
            </nav>
        )
    }
}

export default Tree;