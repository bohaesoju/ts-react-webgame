import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'always' });

interface User {
    nickname: string;
    password: string;
}

interface userStore {
    isLoggingIn: boolean;
    data: User | null;
    logIn: (data: User) => void;
    logOut: () => void;
}

const userStore = observable<userStore>({
    isLoggingIn: false,
    data: null,
    logIn: action((data: User) => {
        userStore.isLoggingIn = true;
        setTimeout(action(() => {
            userStore.data = data;
            userStore.isLoggingIn = false;
            postStore.data.push('1');
        }), 2000);
    }),
    logOut: action(() => {
        userStore.data = null;
    }),
});

interface postStore {
    data: string[];
    addPost: (data: string) => void;
}

const postStore = observable<postStore>({
    data: [],
    addPost: (data) => {
        postStore.data.push(data);
    },
})

export { userStore, postStore };