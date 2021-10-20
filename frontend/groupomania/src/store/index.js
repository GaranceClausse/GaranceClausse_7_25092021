import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

let token = JSON.parse(localStorage.getItem('token'));
if (token) {
    instance.defaults.headers.common['Authorization'] = token; // on applique les auth au header avec le bearer token
}

const store = createStore({
    state: {
        status: '',
        user: {
            userId: -1,
            nom: '',
            email: '',
            isAdmin: false,
            token: ''
        },
        posts: [],
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        setUser: function(state, user) {
            user.token = 'Bearer ' + user.token;
            state.user = user;
            localStorage.setItem('token', JSON.stringify(user.token));
            instance.defaults.headers.common['Authorization'] = user.token;
        },
        userOn: function(state, data) {
            state.user.userId = data.userId;
            state.user.nom = data.nom;
            state.user.email = data.email;
            state.user.isAdmin = data.isAdmin;
        },
        logout: function(state) {
            localStorage.removeItem('token');
            state.user = {
                userId: -1,
                nom: '',
                email: '',
                isAdmin: false,
                token: ''
            };
        },
        setPost: function(state, posts) {
            state.posts = posts;
        }
    },
    actions: {
        createAccount: ({ commit }, userData) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/signup', userData)
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
        userLogin: ({ commit }, userData) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userData)
                    .then(function (res) {
                        commit('setStatus', '');
                        commit('setUser', res.data);
                        resolve(res);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            })
        },

        getuserData: ({commit}, userData) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.get(`/auth/${userData.id}`)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
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