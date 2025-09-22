import apiService from '../services/api';

export const server = {
	async authorize(authLogin, authPassword) {
		try {
			const response = await apiService.login({
				login: authLogin,
				password: authPassword
			});

			return {
				error: null,
				res: {
					id: response.user.id,
					login: response.user.login,
					nickname: response.user.nickname,
					email: response.user.email,
					role_id: response.user.role_id,
					session: response.token,
				},
			};
		} catch (error) {
			return {
				error: error.message || 'Ошибка авторизации',
				res: null,
			};
		}
	},

	async register(regLogin, regPassword, regNickname, regEmail) {
		try {
			const response = await apiService.register({
				login: regLogin,
				password: regPassword,
				nickname: regNickname,
				email: regEmail
			});

			return {
				error: null,
				res: {
					id: response.user.id,
					login: response.user.login,
					nickname: response.user.nickname,
					email: response.user.email,
					role_id: response.user.role_id,
					session: response.token,
				},
			};
		} catch (error) {
			return {
				error: error.message || 'Ошибка регистрации',
				res: null,
			};
		}
	},
};
