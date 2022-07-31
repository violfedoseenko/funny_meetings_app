import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (number > 4 && number < 15) return 'человек тусанет';
        const lastOne = Number(number.toString().slice(-1));
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут';
        else return 'человек тусанет';
    };
    return (
        <h1>
            <span
                className={
                    'badge m-1 bg-' + (length === 0 ? 'danger' : 'primary')
                }
            >
                {length > 0
                    ? `${length} ${renderPhrase(length)} с тобой сегодня`
                    : 'Никто не тусанет с тобой сегодня'}
            </span>
        </h1>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number
};

export default SearchStatus;
