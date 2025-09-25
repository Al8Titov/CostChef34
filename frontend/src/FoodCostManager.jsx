
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Authorization, Register, Home, Dishes, CreateRecipe, Warehouse, Users } from './pages';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	max-width: 1350px;
	min-height: 100vh;
	margin: 0 auto;
	background-color: #f4f3daff;

	@media (max-width: 768px) {
		width: 100%;
	}

	@media (max-width: 480px) {
		width: 100%;
	}
`;

const Content = styled.div`
	padding: 100px 0 90px 0;
	flex: 1;

	@media (max-width: 768px) {
		padding: 80px 0 70px 0;
	}

	@media (max-width: 480px) {
		padding: 70px 0 60px 0;
	}
`;

export const FoodCostManager = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dishes" element={<Dishes />} />
					<Route path="/create-recipe" element={<CreateRecipe />} />
					<Route path="/warehouse" element={<Warehouse />} />
					<Route path="/users" element={<Users />} />
					<Route path="*" element={<div>Страница не найдена</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
