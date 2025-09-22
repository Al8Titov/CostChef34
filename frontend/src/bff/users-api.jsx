import apiService from '../services/api';

export const getUsers = async () => {
	try {
		const users = await apiService.getUsers();
		return users;
	} catch (error) {
		console.error('Ошибка при загрузке пользователей:', error);
		return [];
	}
};

export const updateUserRole = async (userId, roleId) => {
	try {
		const updatedUser = await apiService.updateUserRole(userId, roleId);
		console.log('Роль пользователя обновлена:', updatedUser);
		return updatedUser;
	} catch (error) {
		console.error('Ошибка при обновлении роли пользователя:', error);
		throw error;
	}
};

export const deleteUserWithCascade = async (userId) => {
	try {
		await apiService.deleteUser(userId);
		console.log('Пользователь удален:', userId);
		return true;
	} catch (error) {
		console.error('Ошибка при удалении пользователя:', error);
		throw error;
	}
};
