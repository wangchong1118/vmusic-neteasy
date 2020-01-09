import * as types from './types';

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },
    [types.SET_DISC](state, disc) {
      state.disc = disc;
    },
    [types.SET_PLAYING_STATE](state, flag) {
      state.playing = flag;
    },
    [types.SET_FULLSCREEN](state, flag) {
      state.fullScreen = flag;
    },
    [types.SET_PLAYLIST](state, list) {
      state.playlist = Object.assign([], list);
    },
    [types.SET_SEQUENCE_LIST](state, list) {
      state.sequenceList = Object.assign([], list);
    },
    [types.SET_TOPLIST](state, toplist) {
      state.toplist = Object.assign([], toplist);
    },
    [types.SET_PLAY_MODE](state, mode) {
      state.mode = mode;
    },
    [types.SET_CURRENT_INDEX](state, index) {
      state.currentIndex = index;
    }
}

export default mutations;