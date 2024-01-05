import { Router } from 'express';

export interface IRoute {
    readonly router: Router;
}

export interface IApp {
    routes: { [key: string]: IRoute };
}
