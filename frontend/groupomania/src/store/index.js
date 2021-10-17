import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

let token = JSON.parse(localStorage.getItem('token'));
if(token) {
    instance.defaults.headers.common['Authorization'] = token; // on applique les auth au header avec le bearer token
}

const store = createStore({
    state: {
        user: {
            userId: 0,
            nom: '',
            prenom: '',
            isAdmin: false,
            token: ''
        },

    },
    getters: {
        formattedHeaders: state => {
          return { 'Accept': 'application/json',
          'Content-Type': 'application/json', 
          "authorization" : "bearer "+state.loggedInUser.token
        }
        }
      },
    actions: {
        createAccount : ({commit}, userData) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/auth/signup', userData)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        // requete post user login
        userLogin: ({commit}, userData) => {
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userData)
                .then(function (res) {
                    commit('setUser', res.data)
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
            })
        },
        
     /*   showProfile: ({commit}) => {
            instance.get('api/auth/:id')
                .then(function (res) {
                  commit('userInfos', res.data.result[0]);
                })
                .catch(err => console.log(err.message))
          },*/
    }
})

export default store;