import { useQuery } from '@tanstack/react-query'; // fetching으로 받은 데이터를 캐시에 저장해준다.

function UserInfo() {
	const fetchUser = async ({ queryKey }) => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
		return await response.json();
	};

	/*
    [ queryKey ]
    동일한 queryKey(ex. user)를 가질 때 동일한 api데이터를 가져온다.
  */
	const { data, isLoading, isSuccess, isError } = useQuery(['user', 2], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5,
		cacheTime: 1000 * 5,
	});

	return <div>{isSuccess && <p>Name: {data.name}</p>}</div>;
}

export default UserInfo;

/*
  [ React Query ]
  - 데이터가 전역으로 저장되는 것이 아니기 때문에
    Custom Hook을 통해 fetching 함수를 호출하게끔 처리한다.
*/

/*
  - refetchOnWindowFocus
    focus할 때마다 데이터가 re-fetching 되는것을 방지
  - refetchOnMount
    컴포넌트 이동 후 돌아올 때 데이터가 re-fetching 되는것을 방지
  - staleTime
    default값은 0초
    fresh의 상태로 데이터를 유지시켜준다. (re-fetching X)
    -> stale 상태에서는 계속 데이터 re-fetching가 발생한다.)
  - cacheTime
    default값은 5분
    캐시에 데이터를 유지시켜준다.
    정해진 시간이 지나면 GC에 의해 메모리에서 값이 제거된다.
*/
