export const state = () => ({
    missionName: '',
    missionDesc: '',
    missionDate: null,
    selectedImages: [],

});

export const mutations = {
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
    }
}

export const getters = {
    counter: (state) => state.counter
}