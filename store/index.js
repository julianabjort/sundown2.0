export const state = () => ({
    title: "counter",
    counter: 0,
});

export const mutations = {
    increment(state, newValue) {
        state.counter+=newValue;
    },
    decrement(state, newValue) {
        state.counter-=newValue;
    }
}

export const getters = {
    counter: (state) => state.counter
}