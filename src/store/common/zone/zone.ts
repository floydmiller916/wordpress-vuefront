import { MutationTree, GetterTree, ActionTree } from "vuex";
import { RootState } from "vuefront-store";
import { Zone, ZonesResult } from "vuefront-api";
import gql from "graphql-tag";

export type State = {
  zone: Zone;
  entities: ZonesResult;
};
export const state: State = {
  zone: {},
  entities: {
    content: [],
  },
};

export const getters: GetterTree<State, RootState> = {
  get(state) {
    return state.zone;
  },
  list(state) {
    return state.entities;
  },
};

export const mutations: MutationTree<State> = {
  setZone(state, payload) {
    state.zone = payload;
  },
  setEntities(state, payload) {
    state.entities = payload;
  },
};

export const actions: ActionTree<State, RootState> = {
  async list({ commit, dispatch, rootGetters }, zoneData) {
    try {
      const { data } = await this.$vfapollo.query({
        query: gql`
          query ($page: Int, $size: Int, $country_id: String) {
            zonesList(page: $page, size: $size, country_id: $country_id) {
              content {
                id
                name
              }
              totalPages
              totalElements
              first
              last
              number
              numberOfElements
            }
          }
        `,
        variables: zoneData,
      });
      commit("setEntities", data.zonesList);
    } catch (e) {
      commit("vuefront/setResponseError", e, {
        root: true,
      });
    }
  },
  async get({ commit, dispatch, rootGetters }, { id }) {
    try {
      const { data } = await this.$vfapollo.query({
        query: gql`
          query ($id: String) {
            zone(id: $id) {
              id
              name
            }
          }
        `,
        variables: { id },
      });
      commit("setZone", data.zone);
    } catch (e) {
      commit("vuefront/setResponseError", e, {
        root: true,
      });
    }
  },
};
