import userSlice, {
  initialState,
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  checkUserAuth,
} from "./user-slice";
import { User } from "../../types";

const user: User = {
  name: "TestUser",
  email: "test@mail.com",
};

describe("userSlice", () => {
  it("should initialize correctly", () => {
    const state = userSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  describe("loginUser", () => {
    it("fulfilled", () => {
      const action = { type: loginUser.fulfilled.type, payload: user };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user, isAuthChecked: true });
    });
  });

  describe("registerUser", () => {
    it("fulfilled", () => {
      const action = { type: registerUser.fulfilled.type, payload: user };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user, isAuthChecked: true });
    });
  });

  describe("logoutUser", () => {
    it("fulfilled", () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe("getUser", () => {
    it("fulfilled", () => {
      const action = { type: getUser.fulfilled.type, payload: user };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user });
    });
  });

  describe("checkUserAuth", () => {
    it("fulfilled", () => {
      const action = { type: checkUserAuth.fulfilled.type, payload: user };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user, isAuthChecked: true });
    });

    it("rejected", () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, isAuthChecked: true });
    });
  });

  describe("updateUser", () => {
    it("fulfilled", () => {
      const action = { type: updateUser.fulfilled.type, payload: user };
      const state = userSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, user });
    });
  });
});
