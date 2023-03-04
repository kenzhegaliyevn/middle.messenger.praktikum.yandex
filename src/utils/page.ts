import Block from './block';
import Router from './services/router';

export interface PageProps {
    styles?: Record<string, any>,
    icons?: Record<string, any>,
    images?: Record<string, any>,
    router?: Router,
}

export default class Page extends Block<PageProps> {


}