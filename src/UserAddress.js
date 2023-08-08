import { useUserQuery } from './hooks/useUsers';

function UserAddress() {
	/*
		- 컴포넌트가 mount되자마자 useUserQuery custom hook을 호출
		- 1 숫자값을 인수로 전달하면 인수값은 custom hook 안쪽에 있는 
			useQuery 함수의 첫번째 인수값인 배열 형태의 queryKey의 두번째 값으로 전달
		- 이렇게 만들어진 배열값은 다시 두번째 인수인 fetching 함수의 queryKey의 property에 담겨서 전달
		- fetching 함수 내부적으로 queryKey 배열의 두번째 인수값을 
			요청 URL에 queryString 형태로 붙여서 비동기 데이터 요청 시작
		- 해당 데이터 요청이 들어가고 pending 상태이면 isSuccess값은 실시간으로 false값 적용
			- pending이 끝나고 fulfilled 되면 true값 적용
			- pending이 끝나고 데이터 호출에 실패하면 isError property에 에러객체가 담긴다.
		- 데이터가 fulfilled되어 요청에 성공하면 data property로 반환값이 담긴다.

		- 아래의 custom hook 호출 구문에서 데이터 반환에 성공하면 data에 비구조화할당으로 반환값이 담기고 
			데이터가 동기적으로 담겨야 isSuccess값이 true가 적용된다.
		- 아래의 코드는 동기적으로 데이터 응답에 성공해야지만(isSuccess: true) data로 받은 내용을 화면에 출력
	*/
	const { data, isSuccess } = useUserQuery(1);

	/*
		data에 optional chaining을 사용하는 이유
		- isSuccess값이 true로 바뀌기 전까지 data값이 초기화되지 않아서 발생하는 undefind 리턴문 오류를 해결하기 위함
	*/
	return <div>{isSuccess && <h2>Address: {data.address?.street}</h2>}</div>;
}

export default UserAddress;
