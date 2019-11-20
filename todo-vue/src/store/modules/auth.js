// auth라는 모듈에서 관리하고 싶은 값은 token이고. token을 직접 변경 시키지 못하고 mutations를 통해서 변경, 그렇기 때문에 mutations들은 기본적으로 state를 인자로
// 그런데 mutation도 직접 호출하는게 아니라 actions 에서 호출하는데 그냥 할 수 있는게 아니라 commit을 통해서!
// getters는 computed랑 동일한데 token을 활용하는 변수들을 관리해서 state가 변경되면 같이 변경되도록(?)
// 많은 컴포넌트에서 사용하기 위해 서로를 보호하기위한 방법이다..
import jwtDecode from 'jwt-decode'
// state : data와 유사 (실제 상태와 관련된 값이 저장되어있다)
const state = {
    token: null // token이 데이터이고
}

//mutations : state를 변화시키기위한 메서드(함수)
const mutations = {
    // 첫번째 인자는 무조건 state !!
    // 이후 인자는 payload(즉, 임의의 매개변수)
    setToken(state, token) {  // 그 데이터를 변경시키는 것이 mutations
        state.token = token
    }
}

const actions = {
    // 첫번째 인자는 context (다양한 것들이 있다)
    // 이후 인자는 payload (임의의 매개변수 값)
    login(context, token) {
        // mutations 호출 -> commit 통해서!
        context.commit('setToken', token)
    },
    logout(context) {
        context.commit('setToken', null)
    }
}

const getters = {
    options(state) {
        return {
            headers: {
                Authorization: `JWT ${state.token}`
            }
        }            
    },
    user(state) {
        return jwtDecode(state.token).user_id
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}