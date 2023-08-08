import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import UserName from './UserName';
import UserAddress from './UserAddress';
import Menu from './Menu';

function App() {
	// QueryClient 인스턴스 생성
	const queryClient = new QueryClient();

	return (
		// QueryClientProvider 컴포넌트로 해당 인스턴스를 props로 전달
		// 루트 컴포넌트인 App 전역에서 어떤 자식 컴포넌트에서도 React Query 활용 가능
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<Menu />

				{/* 
					[ 라우터 설정 이유 ]
					주소창에 URL만 바꾸면 전체 페이지가 full load되기 때문에 
					각각의 컴포넌트마다의 비동기 데이터의 stale, cache time이 모두 초기화 되기 때문에 테스트가 불가능 
					- 라우터 설정을 통해 페이지가 변경될 때 full load되지 않으면서 컴포넌트의 mount, unmount를 테스트하기 위함
				*/}
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/name' element={<UserName />} />
					<Route path='/address' element={<UserAddress />} />
				</Routes>
			</div>

			{/* 각 컴포넌트가 mount될 때 각각의 캐싱된 서버 데이터를 확인할 수 있는 React Query 전용 개발 툴 (배포시에는 제거) */}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
