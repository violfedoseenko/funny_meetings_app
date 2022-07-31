import React from 'react';
import PropTypes from 'prop-types';
import arrowUp from '../icons/caret-up-fill.svg';
import arrowDown from '../icons/caret-down-fill.svg';

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };
    const renderSortArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            return (
                <img src={(selectedSort.order === 'asc') ? arrowDown : arrowUp} alt='arrow'/>
            );
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        {...{ role: columns[column].path && 'button' }}
                        scope='col'>
                        {columns[column].name}
                        {renderSortArrow(selectedSort, columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired

};

export default TableHeader;
