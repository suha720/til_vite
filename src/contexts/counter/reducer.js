// 2. reducer 함수
// action : {type : 글자, payload : 전달값}
export function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      // 초기값에 맞게 return 설정 하기
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "ADDNUM":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}
