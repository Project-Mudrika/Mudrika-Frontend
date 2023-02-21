import { createStore, action } from "easy-peasy";

export const store = createStore({
  userData: {
    walletId: null,
    type: null,
    data: {},
  },
  updateData: action((state, { walletId, type, data }) => {
    state.userData.walletId = walletId;
    state.userData.type = type;
    state.userData.data = data;
  }),
});
