import { useState, useEffect } from 'react';
import { getUsers } from '../bff/users-api';

export const useUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchUsers = async () => {
		setLoading(true);
		setError(null);
		
		try {
			const usersData = await getUsers();
			setUsers(usersData);
		} catch (err) {
			setError('Ошибка загрузки пользователей');
			console.error('Error fetching users:', err);
		} finally {
			setLoading(false);
		}
	};

	const refreshUsers = () => {
		fetchUsers();
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return {
		users,
		loading,
		error,
		refreshUsers
	};
};