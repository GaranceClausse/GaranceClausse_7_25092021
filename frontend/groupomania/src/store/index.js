import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

let token = JSON.parse(localStorage.getItem('token'));
if (token) {
    instance.defaults.headers.common['Authorization'] = token; // on applique les auth au header avec le bearer token
}

let user = localStorage.getItem('user');
if (!user) {
    user = {
        userId: -1,
        token: ''
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: ''
        };
    }
}
const store = createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            nom: '',
            email: '',
            photo: '',
            isAdmin: false,
        },
        posts: [],
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: ''
            }
            localStorage.removeItem('user');
        },
        setPost: function(state, posts) {
            state.posts = posts;
        }
    },
    getters: {
        formattedHeaders: state => {
            return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "authorization": "bearer " + state.user.token
            }
        }
    },
    actions: {
        createAccount: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/signup', userInfos)
                    .then(function (res) {
                        commit('setStatus', 'created');
                        resolve(res);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            })
        },
        // requete post user login
        userLogin: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userInfos)
                    .then(function (res) {
                        commit('setStatus', '');
                        commit('logUser', res.data);
                        resolve(res);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            })
        },

      /*  getUserInfos: ({ commit }) => {
            instance.get(`/auth/${userInfos.id}`)
                .then(function (res) {
                    commit('userInfos', res.data.userInfos);
                })
                .catch(err => console.log(err.message))
        },*/

        postCreate: ({ commit }, postInfos) => {
            console.log(postInfos);
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/post', postInfos)
                    .then(function (res) {
                        resolve(res);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            })
        },
        postGetAll: ({commit}) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.get('/post')
                .then(function (res) {
                    commit('setPost', res.data)
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
    }
})

export default store;