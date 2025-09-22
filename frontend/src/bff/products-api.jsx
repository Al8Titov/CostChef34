import apiService from '../services/api';

export const getUserProducts = async () => {
	try {
		const products = await apiService.getProducts();
		return products;
	} catch (error) {
		console.error('Ошибка при загрузке продуктов:', error);
		return [];
	}
};

export const createProduct = async (productData) => {
	try {
		const createdProduct = await apiService.createProduct(productData);
		console.log('Продукт создан:', createdProduct);
		return createdProduct;
	} catch (error) {
		console.error('Ошибка при создании продукта:', error);
		throw error;
	}
};

export const deleteProduct = async (productId) => {
	try {
		await apiService.deleteProduct(productId);
		console.log('Продукт удален:', productId);
		return true;
	} catch (error) {
		console.error('Ошибка при удалении продукта:', error);
		return false;
	}
};
