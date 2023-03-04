import { Input } from '../../components';
import AuthAPI, { LoginRequest } from '../api/auth-api';
import UserAPI, { FindUserRequest, PasswordRequest } from '../api/user-api';

import { config } from '../config';
import GlobalEventBus, { GlobalEvents } from '../globaleventbus';
import Router from '../services/router';
import { UserData } from '../user';


export default class UserController {

    private _router: Router;

    private _authAPI: AuthAPI;

    private _userAPI: UserAPI;

    constructor(router: Router) {
        this._router = router;

        this._authAPI = new AuthAPI(config.baseAPIUrl);
        this._userAPI = new UserAPI(config.baseAPIUrl);
    }

    public init() {
        GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_GETUSER);
        GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_GETCHATS);
    }

    public async getUser() {
        try {
            const user = await this._authAPI.getUser();
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_GETUSER_SUCCEED, user);
        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_GETUSER_FAILED, error);
        }
    }

    public async logout(successPath?: string) {
        try {
            this._authAPI.logout();

            // TODO: Переделать через EventBus
            if (successPath) {
                this._router.go(successPath);
            }
        } catch (error) {
            console.log('Logout await error', error);
        }

    }

    // TODO: Избавиться от Input
    public async login(inputs: Input[], successPath: string) {
        const user: LoginRequest = { login: '', password: '' };

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            user[element.name as keyof LoginRequest] = element.value;
        });

        try {
            await this._authAPI.login(user);

            // TODO: Переделать через EventBus
            this._router.go(successPath);

            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_LOGIN_SUCCEED);
            // Останавливаем крутилку
        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_LOGIN_FAILED, error);
        }
    }

    public async signup(inputs: Input[], successPath: string) {
        const data: UserData = {};

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>data)[element.name] = element.value;
        });

        try {
            await this._authAPI.signup(data);
            this._router.go(successPath);
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_SIGNUP_SUCCEED);

        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_SIGNUP_FAILED, error);
        }
    }    

    public async findUser(inputs: Input[], options: { succeedEvent: string, failedEvent: string }) {
        const data: FindUserRequest = { login: '' };

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>data)[element.name] = element.value;
        });

        try {
            const result = await this._userAPI.findUser(data);
            const users = JSON.parse(result.responseText);
            let found = false;
            let uFound;

            users.forEach((u: any) => {
                if (u.login === data.login) {
                    found = true;
                    uFound = u;
                }
            });
            if (!found) {
                const error = JSON.stringify({ reason: 'User not found' });
                GlobalEventBus.getInstance().EventBus.emit(options.failedEvent, error);
            } else {
                GlobalEventBus.getInstance().EventBus.emit(options.succeedEvent, uFound);
            }

        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(options.failedEvent, error);
        }
    }

    public async saveInfo(inputs: Input[]) {
        const data: UserData = {};

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>data)[element.name] = element.value;
        });

        try {
            await this._userAPI.saveInfo(data);
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_SAVEINFO_SUCCEED, data);

        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_SAVEINFO_FAILED, error);
        }
    }

    public async savePassword(inputs: Input[]) {
        const data: PasswordRequest = { oldPassword: '', newPassword: '' };

        inputs.forEach(input => {
            const element = input.element as HTMLInputElement;
            (<any>data)[element.name] = element.value;
        });

        try {
            await this._userAPI.savePassword(data);
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_SAVEPASSWORD_SUCCEED);

        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_SAVEPASSWORD_FAILED, error);
        }
    }

    public async changeAvatar(formData: FormData) {

        try {           
            const result = await this._userAPI.changeAvatar(formData);
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_CHANGEAVATAR_SUCCEED, result);

        } catch (error) {
            GlobalEventBus.getInstance().EventBus.emit(GlobalEvents.ACTION_CHANGEAVATAR_FAILED, error);
        }
    }
}