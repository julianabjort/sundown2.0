export const state = () => ({
    userId: null,
    missionName: '',
    missionDesc: '',
    missionDate: null,
    selectedImages: [],
    missionLat: null,
    missionLong: null

});

export const mutations = {
    setUserId(state, payload) {
        state.userId = payload.userId
    },
    setMissionName(state, payload) {
        state.missionName = payload.missionName
    },
    setMissionDesc(state, payload) {
        state.missionDesc = payload.missionDesc
    },
    setMissionDate(state, payload) {
        state.missionDate = payload.missionDate
    },
    setSelectedImages(state, payload) {
        state.selectedImages = payload.selectedImages
    },
    setMissionLat(state, payload) {
        state.missionLat = payload.missionLat
    },
    setMissionLong(state, payload) {
        state.missionLong = payload.missionLong
    }
}

export const getters = {
    counter: (state) => state.counter
}