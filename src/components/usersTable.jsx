import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest }) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: { name: 'Качества', component: (user) => (<QualitiesList qualities={user.qualities}/>) },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился раз' },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: { path: 'bookmark', name: 'Избранное', component: (user) => (<BookMark status={user.bookmark} onClick={() => onToggleBookMark(user._id)}/>) },
        delete: {
            component: (user) => (
                <button
                    className='btn btn-danger btn-sm m-2'
                    onClick={() => onDelete(user._id)}
                >
                Delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired

};

export default UsersTable;
