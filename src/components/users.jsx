import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { paginate } from '../app/utils/paginate';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import api from '../api';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';

const Users = () => {
    const pageSize = 8;
    // по умолчанию всегда отображается первая страница useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
    };

    // при изменении любого состояния компонента вызывается функция внутри UseEffect
    // что говотит о том, что компонент преререндерился
    // UseEffect вызывается каждый раз при монтировании элемента в DOM
    //
    // несколько вариантов использования UseEffect:
    // -можно зызывать единожды при монитровании компонента  useEffect(() => {console.log('render');},[]);
    // -каждый раз при изменеии компонента
    // -или вызывать его когда изменяетс какое-либо конкретное состояние компонета, например currentPage: useEffect(() => {console.log('render');},[currentPage]); меняется при перелиствании страницы

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users;

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

        const count = filteredUsers.length;
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            // устанавливаем setSelectedProf как undefinde, тем самым сбрасывая фильтр
            // сюда можно добавтьь несколько действий
            setSelectedProf();
        };

        return (
            <div className='d-flex'>
                <div className='d-flex flex-column flex-shrink-0 p-3'>
                    {professions &&
                        (<GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />)}
                    <button onClick={clearFilter} className='btn btn-secondary mt-2'> Сброс фильтра</button>
                </div>
                <div className='d-flex flex-column'>
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className='div d-flex justify-content-center'>
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    };
    return 'Loading';
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
