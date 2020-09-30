// import RegisterGql from './register.graphql'
// import LoginGql from './login.graphql'
// import LogoutGql from './logout.graphql'
// import EditGql from './edit.graphql'
// import EditPasswordGql from './editPassword.graphql'
// import CheckGql from './check.graphql'
import gql from 'graphql-tag'

export const state = () => ({
  customer: null,
  auth: false,
  token: false
})

export const getters = {
  get(state) {
    return state.customer
  },
  auth(state) {
    return state.auth
  },
  token(state) {
    return state.token
  }
}

export const mutations = {
  setCustomer(state, payload) {
    state.customer = payload
  },
  setAuth(state, payload) {
    state.auth = payload
  },
  setToken(state, payload) {
    state.token = payload
    this.$cookies.set('token', payload)
  }
}

export const actions = {
  async login({ commit, dispatch, rootGetters }, customerData) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: gql`mutation($email: String, $password: String) {
          accountLogin(email: $email, password: $password) {
            token
            customer {
              id
              firstName
              lastName
              email
            }
          }
        }
        `,
        variables: customerData
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      const { accountLogin } = rootGetters['apollo/get']
      commit('setCustomer', accountLogin.customer)
      commit('setToken', accountLogin.token)
      commit('setAuth', true)
      return true
    }

    return false
  },
  async logout({ commit, dispatch, rootGetters }) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: gql`mutation {
          accountLogout {
            status
          }
        }
        `
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      commit('setCustomer', {})
      commit('setToken', null)
      commit('setAuth', rootGetters['apollo/get'].accountLogout.status)
    }
  },
  async edit({ commit, dispatch, rootGetters }, customerData) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: gql`mutation($customer: CustomerInput) {
          accountEdit(customer: $customer) {
            id
            firstName
            lastName
            email
          }
        }
        `,
        variables: {
          customer: customerData
        }
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      commit('setCustomer', rootGetters['apollo/get'].accountEdit)

      return true
    }

    return false
  },
  async editPassword({ commit, dispatch, rootGetters }, { password }) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: gql`mutation($password: String) {
          accountEditPassword(password: $password) {
            id
            firstName
            lastName
            email
          }
        }
        `,
        variables: {
          password
        }
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      commit('setCustomer', rootGetters['apollo/get'].accountEditPassword)
      return true
    }

    return false
  },
  async register({ commit, dispatch, rootGetters }, customerData) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: gql`mutation($customer: CustomerInput) {
          accountRegister(customer: $customer) {
            id
            firstName
            lastName
            email
          }
        }
        `,
        variables: {
          customer: customerData
        }
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      commit('setCustomer', rootGetters['apollo/get'].accountRegister)
      return true
    }

    return false
  },
  async checkLogged({ commit, dispatch, rootGetters }) {
    await dispatch(
      'apollo/query',
      {
        query: `{
          accountCheckLogged {
            status
            customer {
              id
              lastName
              firstName
              email
            }
          }
        }`
      },
      {
        root: true
      }
    )

    if (
      !rootGetters['vuefront/error'] &&
      rootGetters['apollo/get'].accountCheckLogged &&
      rootGetters['apollo/get'].accountCheckLogged.customer
    ) {
      commit(
        'setCustomer',
        rootGetters['apollo/get'].accountCheckLogged.customer
      )

      commit('setAuth', rootGetters['apollo/get'].accountCheckLogged.status)

      if (!rootGetters['apollo/get'].accountCheckLogged.status) {
        commit('setToken', null)
      }
    }
  }
}
