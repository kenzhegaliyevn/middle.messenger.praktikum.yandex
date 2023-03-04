import {
  Login, Signup, Chat, ProfileInfo, ProfileChange, ProfilePassword,
} from './pages';

import { default as styles } from './styles.scss';

import Router from './utils/services/router';
import { 
    validateCreateChat, validateLogin, validateSaveInfo, validateSavePassword, validateSignup,
    validateSendMessage, validateAddChatUser, validateDeleteChatUser, 
} from './utils/validator';
import GlobalEventBus, { GlobalEvents } from './utils/globaleventbus';
import User from './utils/user';
import UserController from './utils/controllers/user';
import ChatController from './utils/controllers/chat';
import MessagesController from './utils/controllers/messages';

function importAllImages(r: __WebpackModuleApi.RequireContext) {
    const images: Record<string, string> = {};
    r.keys().map((item) => { 
        images[item.replace('./', '').replace(/\.(svg|png|jpe?g)/, '')] = r(item).default;
    });
    return images;    
}

const icons = importAllImages(require.context('../static/icons/', false, /\.(png|jpe?g|svg)$/));

const user = User.getInstance();

const router = Router.getInstance('#app');

const g = GlobalEventBus.getInstance();

const userController = new UserController(router);
const chatController = new ChatController();
const messagesController = new MessagesController();


const assets = { styles, icons };
const initProps = { ...assets, router };

const login = new Login(initProps);

const signup = new Signup(initProps);

const chat = new Chat(initProps);

const profileInfo = new ProfileInfo(initProps);

const profileChange = new ProfileChange(initProps);

const profilePassword = new ProfilePassword(initProps);

function onGetUserSucceed(xhr: XMLHttpRequest) {
    const d = JSON.parse(xhr.responseText);
    user.setData(d);

    g.EventBus.emit(GlobalEvents.USERDATA_UPDATED, user);
    router.go(window.location.pathname === '/' ? '/chats' : window.location.pathname);
}

function onGetUserFailed() {
    router.go(window.location.pathname === '/signup' ? '/signup' : '/');
}

g.EventBus.on(GlobalEvents.ACTION_INIT, userController.init.bind(userController));

g.EventBus.on(GlobalEvents.ACTION_GETUSER, userController.getUser.bind(userController));
g.EventBus.on(GlobalEvents.ACTION_GETUSER_SUCCEED, onGetUserSucceed);
g.EventBus.on(GlobalEvents.ACTION_GETUSER_FAILED, onGetUserFailed);

g.EventBus.on(GlobalEvents.VALIDATE_LOGIN, validateLogin);
g.EventBus.on(GlobalEvents.ACTION_LOGIN, userController.login.bind(userController));
g.EventBus.on(GlobalEvents.ACTION_LOGIN_SUCCEED, chatController.getChats.bind(chatController));
g.EventBus.on(GlobalEvents.VALIDATE_SIGNUP, validateSignup);
g.EventBus.on(GlobalEvents.ACTION_SIGNUP, userController.signup.bind(userController));
g.EventBus.on(GlobalEvents.VALIDATE_SAVEINFO, validateSaveInfo);
g.EventBus.on(GlobalEvents.ACTION_SAVEINFO, userController.saveInfo.bind(userController));
// g.EventBus.on(GlobalEvents.ACTION_SAVEINFO_SUCCEED, onSaveInfoSucceed);

g.EventBus.on(GlobalEvents.VALIDATE_SAVEPASSWORD, validateSavePassword);
g.EventBus.on(GlobalEvents.ACTION_SAVEPASSWORD, userController.savePassword.bind(userController));
g.EventBus.on(GlobalEvents.ACTION_LOGOUT, userController.logout.bind(userController));
g.EventBus.on(GlobalEvents.ACTION_CHANGEAVATAR, userController.changeAvatar.bind(userController));
g.EventBus.on(GlobalEvents.VALIDATE_SENDMESSAGE, validateSendMessage);
g.EventBus.on(GlobalEvents.ACTION_SENDMESSAGE, messagesController.sendMessage.bind(messagesController));
g.EventBus.on(GlobalEvents.VALIDATE_ADDCHATUSER, validateAddChatUser);
g.EventBus.on(GlobalEvents.ACTION_ADDCHATUSER, chatController.addChatUser.bind(chatController));
g.EventBus.on(GlobalEvents.ACTION_FINDUSER, userController.findUser.bind(userController));
g.EventBus.on(GlobalEvents.VALIDATE_DELETECHATUSER, validateDeleteChatUser);
g.EventBus.on(GlobalEvents.ACTION_DELETECHATUSER, chatController.deleteChatUser.bind(chatController));
g.EventBus.on(GlobalEvents.ACTION_DELETECHAT, chatController.deleteChat.bind(chatController));



g.EventBus.on(GlobalEvents.ACTION_GETCHATS, chatController.getChats.bind(chatController));
g.EventBus.on(GlobalEvents.ACTION_GETCHATTOKEN, chatController.getChatToken.bind(chatController));
g.EventBus.on(GlobalEvents.ACTION_GETCHATUSERS, chatController.getChatUsers.bind(chatController));
g.EventBus.on(GlobalEvents.VALIDATE_CREATECHAT, validateCreateChat);
g.EventBus.on(GlobalEvents.ACTION_CREATECHAT, chatController.createChat.bind(chatController));
g.EventBus.on(GlobalEvents.ACTION_CONNECTCHAT, messagesController.connectChat.bind(messagesController));



router
    .use('/', login)
    .use('/signup', signup)
    .use('/chats', chat)
    .use('/settings', profileInfo)
    .use('/settings-change', profileChange)
    .use('/settings-password', profilePassword)
    .start();


g.EventBus.emit(GlobalEvents.ACTION_INIT);


