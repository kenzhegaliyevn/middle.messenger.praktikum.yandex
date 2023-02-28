import EventBus from './eventbus';


export default class GlobalEventBus {
  static EVENTS = {

    ACTION_INIT: 'action:init',

    VALIDATE_LOGIN: 'validate:login',
    VALIDATE_LOGIN_FAILED: 'validate:login:failed',
    ACTION_LOGIN: 'action:login',
    ACTION_LOGIN_SUCCEED: 'action:login:succeed',
    ACTION_LOGIN_FAILED: 'action:login:failed',

    ACTION_LOGOUT: 'action:logout',

    ACTION_DELETECHAT: 'action:delete_chat',
    ACTION_DELETECHAT_SUCCEED: 'action:delete_chat:succeed',

    VALIDATE_SIGNUP: 'validate:signup',
    VALIDATE_SIGNUP_FAILED: 'validate:signup:failed',
    ACTION_SIGNUP: 'action:signup',
    ACTION_SIGNUP_SUCCEED: 'action:signup:succeed',
    ACTION_SIGNUP_FAILED: 'action:signup:failed',

    ACTION_GETUSER: 'action:get_user',
    ACTION_GETUSER_SUCCEED: 'action:get_user:succeed',
    ACTION_GETUSER_FAILED: 'action:get_user:failed',

    VALIDATE_SAVEINFO: 'validate:save_info',
    VALIDATE_SAVEINFO_FAILED: 'validate:save_info:failed',
    ACTION_SAVEINFO: 'action:save_info',
    ACTION_SAVEINFO_FAILED: 'action:save_info:failed',
    ACTION_SAVEINFO_SUCCEED: 'action:save_info:succeed',

    VALIDATE_SAVEPASSWORD: 'validate:save_password',
    VALIDATE_SAVEPASSWORD_FAILED: 'validate:save_password:failed',
    ACTION_SAVEPASSWORD: 'action:save_password',
    ACTION_SAVEPASSWORD_FAILED: 'action:save_password:failed',
    ACTION_SAVEPASSWORD_SUCCEED: 'action:save_password:succeed',

    ACTION_CHANGEAVATAR: 'action:change_avatar',
    ACTION_CHANGEAVATAR_SUCCEED: 'action:change_avatar:succeed',
    ACTION_CHANGEAVATAR_FAILED: 'action:change_avatar:failed',

    ACTION_GETCHATS: 'action:get_chats',
    ACTION_GETCHATS_SUCCEED: 'action:get_chats:succeed',

    VALIDATE_CREATECHAT: 'validate:create_chat',
    VALIDATE_CREATECHAT_FAILED: 'validate:create_chat:failed',
    ACTION_CREATECHAT: 'action:create_chat',
    ACTION_CREATECHAT_FAILED: 'action:create_chat:failed',
    ACTION_CREATECHAT_SUCCEED: 'action:create_chat:succeed',

    ACTION_FINDUSER: 'action:find_user',
    ACTION_ADDFINDUSER_SUCCEED: 'action:add_find_user:succeed',
    ACTION_ADDFINDUSER_FAILED: 'action:add_find_user:failed',
    ACTION_DELETEFINDUSER_SUCCEED: 'action:delete_find_user:succeed',
    ACTION_DELETEFINDUSER_FAILED: 'action:delete_find_user:failed',

    VALIDATE_ADDCHATUSER: 'validate:add_chat_user',
    VALIDATE_ADDCHATUSER_FAILED: 'validate:add_chat_user:failed',
    ACTION_ADDCHATUSER: 'action:add_chat_user',
    ACTION_ADDCHATUSER_FAILED: 'action:add_chat_user:failed',
    ACTION_ADDCHATUSER_SUCCEED: 'action:add_chat_user:succeed',

    VALIDATE_DELETECHATUSER: 'validate:delete_chat_user',
    VALIDATE_DELETECHATUSER_FAILED: 'validate:delete_chat_user:failed',
    ACTION_DELETECHATUSER: 'action:delete_chat_user',
    ACTION_DELETECHATUSER_FAILED: 'action:delete_chat_user:failed',
    ACTION_DELETECHATUSER_SUCCEED: 'action:delete_chat_user:succeed',

    ACTION_GETCHATTOKEN: 'action:get_chat_token',
    ACTION_GETCHATTOKEN_SUCCEED: 'action:get_chat_token:succeed',

    ACTION_GETCHATUSERS: 'action:get_chat_users',
    ACTION_GETCHATUSERS_SUCCEED: 'action:get_chat_users:succeed',

    ACTION_CONNECTCHAT: 'action:connect_chat',
    ACTION_GETMESSAGES: 'action:get_messages',

    VALIDATE_SENDMESSAGE: 'validate:send_message',
    VALIDATE_SENDMESSAGE_FAILED: 'validate:send_message:failed',
    ACTION_SENDMESSAGE: 'action:send_message',
    ACTION_SENDMESSAGE_FAILED: 'action:send_message:failed',

    MESSAGES_RECEIVED: 'messages:received',
    USERDATA_UPDATED: 'user_data:updated',
  };

  static instance: GlobalEventBus;

  private _eventBus: EventBus;

  constructor() {
    if (GlobalEventBus.instance) {
      return GlobalEventBus.instance;
    }
    GlobalEventBus.instance = this;

    this._eventBus = new EventBus();
  }

  get EventBus() {
    return this._eventBus;
  }
}