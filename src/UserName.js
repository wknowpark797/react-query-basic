// mutation으로 서버 데이터 변경을 위한 form 요소가 있는 컴포넌트 import
import UserForm from './UserForm';

// 유저 정보를 가져오기 위해 useUserQuery custom hook을 import
import { useUserQuery } from './hooks/useUsers';

/*
	[ React Query의 탄생 배경 ]
	- 수시로 바뀌는 서버 데이터를 정적인 상태로 전역관리하는 것이 잘못되었다라는 관점으로 시작된 개념

	- 컴포넌트가 mount될 때마다 같은 서버쪽에 데이터 요청을 하더라도 최신 데이터를 유지하기 위해서 매번 데이터 요청을 보낸다.
	- 동일한 데이터를 여러 컴포넌트에서 계속 호출하면 비효율적이기 때문에 
		queryKey의 고유 문자값을 기준으로 동일한 데이터일 경우 refetching 할지 결정
*/

function UserName() {
	// useUserQuery로 데이터를 호출하여 데이터 반환값과 동기적으로 데이터 성공 유무를 비구조화할당으로 받는다.
	const { data, isSuccess } = useUserQuery(1);

	return (
		<div>
			{isSuccess && <h2>Name: {data.name}</h2>}

			{/* 서버 데이터 변경요청 데스트를 위한 input이 있는 컴포넌트 (mutation 테스트를 할 컴포넌트) */}
			<UserForm />
		</div>
	);
}

export default UserName;
