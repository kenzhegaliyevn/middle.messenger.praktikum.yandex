import Block from './block';
import Router from './services/router';

export interface PageProps {
    styles?: Record<string, unknown>,
    icons?: Record<string, unknown>,
    images?: Record<string, unknown>,
    router?: Router,
}

export default class Page extends Block<PageProps> {


}