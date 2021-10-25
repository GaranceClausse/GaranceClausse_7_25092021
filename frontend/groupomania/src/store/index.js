import { createStore } from 'vuex';

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
            userId: 0,
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
                userId: 0,
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

        getUserData: ({commit}, userData) => {
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
        userModify: ({commit}, userData) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.put(`/auth/${userData.id}`, {
                    data: {
                        password: userData.password
                    }
                })
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        userDelete: ({commit}, userData) => {
            commit;
            return new Promise((resolve, reject) => {
                instance.delete(`/auth/${userData.id}`, {
                    data: {
                        password: userData.password
                    }
                })
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
        postLike: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post(`/post/${data.id}/like`, {
                    like: data.like,
                    userId: data.userId
                })
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        //requete delete article
        postDelete: ({commit}, postId) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.delete(`/post/${postId}`)
                .then(function (res) {
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