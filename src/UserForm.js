// useUserMutation - 서버 데이터를 변경하는 custom hook import
import { useUserQuery, useUserMutation } from './hooks/useUsers';
// input에서 변경할 정보값을 실시간으로 담아주기 위한 state
import { useState } from 'react';

function UserForm() {
	// useUserQuery custom hook을 이용하여 첫번째 사용자 데이터를 반환 받는다.
	const { data } = useUserQuery(1);
	// 반환된 사용자 데이터 객체에서 name값만 뽑아 UserName state에 옮겨 담는다.
	// 이때 data에 optional chaining을 쓰는 이유는 해당 데이터가 반환되기 전까지는 undefind로 초기화되어 있지 않기 때문에 초기 mount될 때 에러를 피하기 위함
	const [UserName, setUserName] = useState(data?.name);

	// useUserMutation custom hook 함수를 호출해서 객체를 반환받는다.
	const userMutation = useUserMutation();

	// 전송버튼 클릭시 동작될 핸들러 함수
	const handleSubmit = (e) => {
		e.preventDefault();

		// userMutation 객체에 등록되어 있는 mutate함수 호출 (custom hook 내부에 mutate 요청 성공시 등록한 함수)
		// 해당 인수에 배열을 인수로 전달 [body parser로 전달할 변경할 데이터, 요청 URL에 붙일 쿼리값]
		userMutation.mutate([UserName, 1]);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{/* 
					리액트에서 input 요소 작업시 콘솔에 uncontrolled input 에러문구 발생
					- 해당 value값에 값이 없을때에 대한 대비책이 없을 때 뜨는 오류문구
					- 해결방법: 값이 없을 때 빈문자를 대신 적용
				*/}
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default UserForm;
