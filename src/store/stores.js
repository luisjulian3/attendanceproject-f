// store.js
import { createStore } from 'vuex';
import * as authService from '@/services/authService.js'; 
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    shouldShowLogin: true,
    token: authService.getToken(), 
    nik: null,
    full_name: null,
    bind_status: null,
    attendanceEmployeeLogFlag: null,
    registerEmployeeFlag: null,
    settingsEmployeeFlag: null,
  },
  mutations: {
    setShouldShowLogin(state, value) {
      state.shouldShowLogin = value;
    },
    setToken(state, token) {
      state.token = token;
    },
    setNik(state, nik) {
      state.nik = nik;
    },
      setFullName(state, full_name) {
      state.full_name = full_name;
    },
      setBindStatus(state, bind_status) {
      state.bind_status = bind_status;
    },
     setAttendanceEmployeeLogFlag(state, flag) {
      state.attendanceEmployeeLogFlag = flag;
      console.log(flag);
    },
    setRegisterEmployeeFlag(state, flag) {
      state.registerEmployeeFlag = flag;
      console.log(flag)
    },
    setSettingsEmployeeFlag(state, flag) {
      state.settingsEmployeeFlag = flag;
      console.log(flag)
    }
  },
  plugins: [createPersistedState()]
});

export default store;
