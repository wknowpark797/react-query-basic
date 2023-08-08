/*
	[ Custom Hook ]
	리액트의 기본 훅을 활용하여 자주 사용하는 기능들을 플러그인처럼 하나의 패키지로 묶어서 재활용하는 형태

	custom hook의 전제조건
	1. 파일이름이 use로 시작해야한다.
	2. 다른 리액트 훅 안쪽에서는 호출이 불가능하다. (useEffect, 다른 핸들러 함수안쪽)
*/

/*
	useQuery: 문자열로 구성된 고유의 queryKey를 이용해서 비동기 데이터를 가져와서 관리하기 위한 함수
	useMutation: 데이터를 가져오는것 뿐만아니라 서버의 데이터를 직접 변경요청을 할 수 있는 함수
	useQueryClient: 추가적인 인스턴스의 함수를 호출하기 위한 객체
*/
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/*
	React Query를 사용하기 위해서는 순수함수의 형태로 데이터를 fetching해주는 함수가 필요
	해당 함수는 useQuery의 두번째 인수로 전달
	외부에서 인수값을 전달받는 비동기 서버통신 함수 
		- queryKey값을 비구조화할당하여 인수로 전달 (배열: useQuery의 첫번째 인수로 전달되는 배열 queryKey)
*/
const fetchUser = async ({ queryKey }) => {
	// queryKey 배열의 두번째 값이 fetching 함수로 전달할 값이기 때문에 해당 값을 fetching URL에 템플릿 리터럴로 연결 후 데이터 호출
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	// 해당 데이터가 받아지면 json 형태로 동기적으로 parsing하여 데이터를 리턴하는 순수 함수
	return await response.json();
};

/*
	실제적으로 내보내서 활용할 custom hook
	해당 훅 안쪽에는 내부적으로 useQuery를 호출하는데 위에서 만든 fetching 함수를 인수로 필요로 함
	해당 훅을 호출할 때 fetching 함수 안쪽에 옵션값을 전달해야 하기 때문에 opt 파라미터 연결
*/
export const useUserQuery = (opt) => {
	/*
		useQuery([ 고유 queryKey ], 데이터 fetching 함수, { React Query 설정값 })
			- 비동기 데이터를 fetching하여 React Query의 설정값에 따라 캐싱처리 후 리턴
		
		[ queryKey의 첫번째 배열값 ]
		- 고유 문자값 ('user')
		- 리액트는 해당 문자값을 통해 전체 앱 어플리케이션 안에서 
			어떤 컴포넌트에서든 여러번 호출이 되더라도 queryKey의 고유값이 같으면 동일한 데이터로 인지하여 
			기존 stale time, cache time을 공유하면서 다시 refetching처리를 하지 않는다.

		[ queryKey의 두번째 배열값 ]
		- fetching 함수를 호출할 때 필요한 custom 옵션값을 전달함으로서 
			각각의 데이터를 고유 데이터로 인지시켜준다. (opt)
	*/
	return useQuery(['user', opt], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5,
		cacheTime: 1000 * 5,
	});
};

/*
	데이터 변경요청 후 가져오는 Custom Hook
	useUserMutation custom hook에서 사용되는 서버 데이터를 변경하는 비동기 호출 함수
	- 인수로 배열값을 비구조화할당으로 내부로 전달
*/
export const updateUserName = async ([userName, num]) => {
	// 파라미터로 받은 두번째 값을 요청 URL의 쿼리 형태로 담아준다.
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		/*
			fetch 메서드의 두번째 옵션값으로 객체 리터럴을 지정해서 데이터를 가져오는 것 뿐만이 아닌 Rest 방식 데이터 요청이 가능
			- get(queryString), delete(queryString), put(body객체로 전달), post(body객체로 전달)
		*/
		method: 'PATCH',

		/*
			- 서버쪽으로 전달할 데이터를 문자화하여 전달
			- 서버쪽에서는 해당 데이터를 다시 body parser로 파싱한 후 
				동일한 name에 해당하는 document를 찾은 뒤 같이 전달된 userName값으로 해당 document의 서버 데이터 변경
		*/
		body: JSON.stringify({
			name: userName,
		}),

		// 데이터 요청할 때 header 객체도 함께 전달
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	const result = await response.json();
	return result;
};

// 위의 비동기 데이터변경 함수를 활용하여 서버 데이터를 변경한 후 반환값을 캐싱처리해주는 custom hook 생성
export const useUserMutation = () => {
	/*
		기존에 생성된 QueryClient 인스턴스를 호출하는 함수
		해당 queryClient 인스턴스에서 prototype에 등록되어 있는 setQueryData라는 서버 데이터 변경 요청 함수를 호출하기 위함
	*/
	const queryClient = useQueryClient();

	// useMutation(비동기 함수, { 옵션 설정 객체 - onSuccess(mutation 요청이 성공적으로 들어가면 연결된 핸들러 함수 호출) })
	return useMutation(updateUserName, {
		/*
			mutation 요청 성공시 연결된 핸들러 함수 호출
			훅 호출시 생성되는 객체의 mutate property에 해당 핸들러 함수가 등록된다. (args: 변경할 데이터를 전달)
		*/
		onSuccess: (args) => {
			// queryClient 인스턴스 객체의 setQueryData 함수 호출
			// setQueryData(queryKey, 변경할 데이터)
			queryClient.setQueryData(['user', args.id], args);
		},
	});
};
