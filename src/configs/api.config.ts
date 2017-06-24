
import { DefaultConfig } from './default.config';

export const API = {
    pages: {
        getAllPages: DefaultConfig.host+"api/me/pages",
        subscribe: DefaultConfig.host+"api/me/pages/subscribe",
    }
}