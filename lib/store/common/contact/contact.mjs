import gql from "graphql-tag";
export const state = {
  contact: {}
};
export const getters = {
  get(state) {
    return state.contact;
  }

};
export const mutations = {
  setContact(state, payload) {
    state.contact = payload;
  }

};
export const actions = {
  async send(_ref, contactData) {
    let {
      dispatch,
      rootGetters,
      commit
    } = _ref;
    await dispatch("apollo/mutate", {
      mutation: gql`
          mutation ($name: String, $email: String, $message: String) {
            contactSend(name: $name, email: $email, message: $message) {
              status
            }
          }
        `,
      variables: contactData
    }, {
      root: true
    });

    if (!rootGetters["vuefront/error"]) {
      commit("notification/add", this.$i18n.global.t("elements.common.contact.successText"), {
        root: true
      });
      return true;
    } else {
      commit("notification/error", rootGetters["vuefront/error"].message);
    }

    return false;
  },

  async get(_ref2) {
    let {
      dispatch,
      rootGetters,
      commit
    } = _ref2;

    try {
      const {
        data
      } = await this.$vfapollo.query({
        query: gql`
          {
            contact {
              locations {
                address
                fax
                image
                geocode
                telephone
                open
                comment
              }
              address
              email
              fax
              comment
              open
              store
              telephone
            }
          }
        `
      });
      commit("setContact", data.contact);
    } catch (e) {
      commit("vuefront/setResponseError", e, {
        root: true
      });
    }
  }

};
//# sourceMappingURL=contact.mjs.map