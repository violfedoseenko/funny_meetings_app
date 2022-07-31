import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {
    const renderCompont = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === 'function') {
                return component(item);
            }
            return component;
        };
        // если мы динамически передаем вложенные данные, то не можем получить к ним доступ
        // для этого используем lodash
        return _.get(item, columns[column].path);
    };

    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        // если мы динамически передаем вложенные данные, то не можем получить к ним доступ
                        // для этого используем lodash
                        <td key={column}>
                            {renderCompont(item, column)}
                        </td>
                    ))}
                </tr>))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
