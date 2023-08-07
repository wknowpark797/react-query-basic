import UserName from './UserName';
import UserAddress from './UserAddress';

function UserInfo() {
	return (
		<div>
			<h1>UserInfo</h1>
			<UserName />
			<UserAddress />
		</div>
	);
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
