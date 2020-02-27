import Vue from 'vue'
import { date } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from '../functions/function-show-error-message'
import { getStatus, lastActivity } from '../utils/chat-utils'

const initValue = {
    currentTime: new Date().toLocaleString(),
    selectedChatRoom: null,
    loadingData: false,
    loadingCount: 0,
    recentChats: {},
    userStorage: {
        contacts: {}
    },
    teams: {},
    users: {
    }
}

const state = { ... initValue }

const mutations = {
    clearData(state){
        state = {...initValue}
    },
    updateCurrentTime(state, payload) {
        state.currentTime = new Date();
    },
    updateSelectedChatRoom(state, payload) {
        if (payload) {
            if (!state.selectedChatRoom || (state.selectedChatRoom !== payload)) {
                state.selectedChatRoom = payload;
            }
        } else {
            state.selectedChatRoom = null;
        }

    },
    addUserInfo(state, { id, data }) {
        state.users = { ...state.users, [id]: data };
    },
    addUserStorage(state, payload) {
        Vue.set(state, 'userStorage', payload)
    },
    updateChatStorage(state, { id, data }) {
        Vue.set(state.recentChats, id, { ...state.recentChats[id], ...data });
    },
    sendMessage(state, { roomId, chatId, ...data }) {
        if (state.recentChats[roomId]) {
            if (!state.recentChats[roomId].content) {
                state.recentChats[roomId].content = {}
            }
            const currentChat = state.recentChats[roomId].content[chatId] || {};
            Vue.set(state.recentChats[roomId].content, chatId, { ...currentChat, ...data })
        }

    },
    setLoadingData(state, payload) {
        if (payload) {
            state.loadingCount += 1;
            state.loadingData = true
        } else {
            if (state.loadingCount > 1) {
                state.loadingCount -= 1;
            } else {
                state.loadingCount = 0;
                state.loadingData = false;
            }
        }
    }
}

const actions = {
    updateCurrentTime({ dispatch, commit }, payload) {
        commit('updateCurrentTime', null)
    },
    updateSelectedChatRoom({ commit }, payload) {
        commit('updateSelectedChatRoom', payload)
    },
    findChatRoomByUserInfo({ state, commit, dispatch }, payload) {
        const keys = Object.keys(state.userStorage.contacts);
        const contacts = keys.map(key => state.userStorage.contacts[key])
        const filter = contacts.filter(contact => contact.peerer === payload.id);
        if (filter && filter.length > 0) {
            commit('updateSelectedChatRoom', filter[0].id)
        } else {
            dispatch('fbCreateNewSingleChat', payload)
        }
    },
    clearData({commit}){
        commit('clearData');
    },
    sendMessage({ state, commit, dispatch }, payload) {
        const roomId = state.selectedChatRoom;
        if(state.recentChats && state.recentChats[roomId] && !state.recentChats[roomId].content) {
            state.recentChats[roomId].peerers.forEach(peererId => {
                if(peererId !== payload.sender) {
                    const refNotification = firebaseDb.ref('notifications/' + peererId)
                    refNotification.push({chatType: 'contact', peerer: payload.sender, roomId: roomId})
                }
            })
        }
        dispatch('fbSendMessage', payload)
        dispatch('fbUpdateLasActivity', null)
    },

    fbReadContactData({ commit }, payload) {
        let contactList = firebaseDb.ref('users')
        commit('setLoadingData', true)
        contactList.once('value', snapshop => {
            commit('setLoadingData', false)
        }, error => {
            showErrorMessage(error.message)
            try {
				this.$router.replace('/auth')
			} catch (error) {}  
        })

        // child added
        contactList.on('child_added', snapshot => {
            let userInfo = snapshot.val()
            commit('addUserInfo', { id: snapshot.key, data: userInfo })
        })
        contactList.on('child_changed', snapshot => {
            commit('addUserInfo', { id: snapshot.key, data: snapshot.val() })
        })
    },
    fbReadUserStorage({ commit, dispatch }, id) {
        let userStorage = firebaseDb.ref('userStorage/' + id)
        commit('setLoadingData', true)
        userStorage.once('value', snapshop => {
            commit('setLoadingData', false)
        }, error => {
            showErrorMessage(error.message)
            try {
				this.$router.replace('/auth')
			} catch (error) {}  
        })

        // child added
        userStorage.on('child_added', snapshot => {
            let userInfo = snapshot.val()
            commit('addUserStorage', userInfo)
            dispatch('fbReadChatStorage', { contacts: userInfo.contacts })
        })

        userStorage.on('child_changed', snapshot => {
            let userInfo = snapshot.val()
            commit('addUserStorage', userInfo)
            dispatch('fbReadChatStorage', { contacts: userInfo.contacts })
        })
    },
    fbReadChatStorage({ commit }, { contacts }) {
        const keys = Object.keys(contacts);
        keys.forEach(key => {
            const contact = contacts[key]
            let chatRoomInfo = firebaseDb.ref('chatStorage/' + contact.id)
            chatRoomInfo.on('child_added', snapshot => {
                let chatData = snapshot.val()
                const data = {
                    [snapshot.key]: chatData
                }
                commit('updateChatStorage', { id: contact.id, data })
            })

            let chatRoomContent = firebaseDb.ref('chatStorage/' + contact.id + '/content')
            chatRoomContent.on('child_added', snapshot => {
                let chatData = snapshot.val()
                const data = {
                    roomId: contact.id,
                    chatId: snapshot.key,
                    ...chatData
                }
                commit('sendMessage', data)
            })
        })

    },
    fbReadNotification({dispatch}, userId) {
        const ref = firebaseDb.ref('notifications/' + userId);
        ref.on('child_added', snapshot => {
            let notification = snapshot.val()
            firebaseDb.ref('notifications/' + userId + '/' + snapshot.key).remove();
            if(notification.chatType) {
                if(notification.chatType === 'contact') {
                    dispatch('fbCreateUserStorageChatContact', {
                        roomId: notification.roomId,
                        peererId: notification.peerer
                    })

                }
            }
        })
    },
    fbReadData({ commit, dispatch }, payload) {
        let userId = firebaseAuth.currentUser.uid
        dispatch('fbReadContactData', null)
        dispatch('fbReadUserStorage', userId)
        dispatch('fbReadNotification', userId)
    },

    fbSendMessage({ commit }, { id, sender, message, messageType }) {
        let taskRef = firebaseDb.ref('chatStorage/' + id + '/content')
        const data = {
            sender,
            message,
            messageType,
            date: new Date().toLocaleString()
        }
        const ref = taskRef.push(data, error => {
            if (error) {
                showErrorMessage(error.message)
            }
            else {

            }
        })

    },
    fbCreateUserStorageChatContact({dispatch, commit}, {roomId, peererId}) {
        const userId = firebaseAuth.currentUser.uid;
        const refUserContact = firebaseDb.ref('userStorage/' + userId + '/chat/contacts')

        const dataUserContact = {
            id: roomId,
            peerer: peererId,
        }
        const itemUserContact = refUserContact.push(dataUserContact, error => {
            if (error) {
                showErrorMessage(error.message)
            } else {
                const contacts = {
                    [itemUserContact.key]: { id: roomId }
                }
                dispatch('fbReadChatStorage', { contacts });
                commit('updateSelectedChatRoom', roomId)
            }
        })

    },
    fbCreateNewSingleChat({ dispatch, commit }, payload) {
        const userId = firebaseAuth.currentUser.uid;
        const refChatStorage = firebaseDb.ref('chatStorage')
        const dataChat = {
            content: {},
            name: payload.name,
            peerers: {
                0: userId,
                1: payload.id
            }
        }
        const itemRef = refChatStorage.push(dataChat, error => {
            if (error) {
                showErrorMessage(error.message)
            } else {
               dispatch('fbCreateUserStorageChatContact', {
                   roomId: itemRef.key, 
                   peererId: payload.id
                })
            }
        })
    },
    fbUpdateLasActivity() {
        const userId = firebaseAuth.currentUser.uid;;
        const lastActivity = firebaseDb.ref('users/'+userId+ '/lastActivity');
        lastActivity.set(new Date().toLocaleString())
    }
}

const getters = {
    contactList: (state) => {
        const userIds = Object.keys(state.users);
        return userIds.map(userId => {
            const userInfo = state.users[userId]
            return {
                ...userInfo,
                lastActivity: lastActivity(userInfo.lastActivity),
                id: userId,
                status: getStatus(state.currentTime, userInfo.lastActivity)
            }
        }).filter(user => user.id !== firebaseAuth.currentUser.uid)
    },
    recentInfoChats: (state, getters) => {
        const chatRomIds = Object.keys(state.recentChats);
        let chatRooms = chatRomIds.map(id => {
            const { lastActivity, name, peerers } = state.recentChats[id];
            let avata = '';
            let userName = '';
            if (peerers.length === 2) {
                let userId = firebaseAuth.currentUser.uid
                peerers.forEach(peerer => {
                    if (peerer !== userId) {
                        avata = state.users[peerer].avata
                        userName = state.users[peerer].name
                    }
                })
            }
            return { id, lastActivity, name: userName , peerers, avata }
        })

        chatRooms.sort((a, b) => {
            const timeA = new Date(a.lastActivity).getTime(), timeB = new Date(b.lastActivity).getTime();
            if (timeA > timeB) return 1;
            else if (timeA < timeB) return -1;
            return 0;
        })

        return chatRooms;
    },
    chatContents: (state, getters) => {
        const id = state.selectedChatRoom;

        return id && state.recentChats[id] ? state.recentChats[id].content : [];
    },
    filteredChatContent: (state, getters) => {
        const chatContents = { ...getters.chatContents };
        const keys = Object.keys(chatContents);
        let messages = [], message = {};
        const convertMessageToArray = (message) => {
            if (typeof message.message === 'string') { return { ...message, message: [message.message] } }
            return message;
        }
        keys.forEach(key => {
            const chat = chatContents[key]
            if (Object.keys(message).length === 0) {
                message = { ...chat, id: key };
            } else {
                if (chat.sender !== message.sender) {
                    messages.push({ ...convertMessageToArray(message) });
                    message = { ...chat, id: key };
                } else {
                    const time = (new Date(chat.date) - new Date(message.date)) / 1000;
                    if (time < 30) {
                        message.message = typeof message.message === 'string' ? [message.message, chat.message] : [...message.message, chat.message];
                        message.date = chat.date;
                    } else {
                        messages.push({ ...convertMessageToArray(message) });
                        message = { ...chat, id: key };
                    }
                }
            }
        })
        keys.length > 0 ? messages.push({ ...convertMessageToArray(message) }) : '';

        return messages;
    },
    peersInfo: (state, getters) => {
        // get list peersInfo inside Room
        try {
            if (state.selectedChatRoom) {
                const peerers = state.recentChats[state.selectedChatRoom].peerers;
                const users = peerers.reduce((acc, current) => {
                    const userInfo = state.users[current];
                    if (userInfo) {
                        const { name, avata } = userInfo;
                        return { ...acc, [current]: { name, avata } }
                    }
                    return { ...acc };
                }, {})
                return users
            }
        } catch (error) {
        }
        return []
    },
    chatRoomInfo: (state, getters) => {
        const selectedChatRoom = state.selectedChatRoom;
        if (!selectedChatRoom || !state.recentChats[selectedChatRoom]) {
            return {}
        }
        const chatContent = [...getters.filteredChatContent]
        const peerers = state.recentChats[selectedChatRoom].peerers;
        let roomName = 'Room: ' + state.recentChats[selectedChatRoom].name;
        const users = peerers.reduce((acc, peererId) => {
            const userInfo = state.users[peererId];
            if (userInfo) {
                const { name, avata } = userInfo;
                // roomName = name;
                return { ...acc, [peererId]: { name, avata } }
            }
            return { ...acc };
        }, {})

        return {
            name: roomName,
            peerers: users,
            chatContent: chatContent
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}