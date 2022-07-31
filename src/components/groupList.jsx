import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    console.log(Object.keys(items));
    return (
        <ul className="list-group">
            {Object.keys(items).map(item =>
                <li
                    key={items[item][valueProperty]}
                    onClick={() => onItemSelect(items[item])}
                    className={'list-group-item' + (items[item] === selectedItem ? ' active' : '')}
                    role='button'
                >
                    {items[item][contentProperty]}
                </li>
            )}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func
};

export default GroupList;
