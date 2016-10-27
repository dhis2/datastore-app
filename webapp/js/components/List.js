import React, {Component} from 'react';

class List extends Component {
    render() {
        const {items} = this.props;
        if (!items.length) {
            return <h2>Loading...</h2>
        }
        const mappedItems = items.map(item => <li key={item}>{item}</li>);
        return (
            <div>
                <ul>
                    {mappedItems}
                </ul>
            </div>
        );
    }
}

export default List

