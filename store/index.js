
const defaultState = () => {
    return {
    userId: null,
    reportId: '',
    missionName: '',
    missionDesc: '',
    missionDate: null,
    selectedImages: [
    ],
    missionLat: null,
    missionLong: null,
    isEditing: false,
    }
}

export const state = defaultState()

export const mutations = {
    setUserId(state, payload) {
        state.userId = payload.userId
    },
    setReportId(state, payload) {
        state.reportId = payload.reportId
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
    },
    setIsEditing(state, payload) {
        state.isEditing = payload.isEditing
    },
    set(state, {key, value}) {
        state[key] = value 
    },
    reset(state) {
        Object.assign(state, defaultState())
    }
}

export const getters = {
    missionName: (state) => state.missionName,
    missionDesc: (state) => state.missionDesc,
    missionDate: (state) => state.missionDate,
    selectedImages: (state) => state.selectedImages,
    missionLat: (state) => state.missionLat,
    missionLong: (state) => state.missionLong,

}