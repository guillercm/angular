import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout/layout.component'),
        children: [
            {
                path: 'auth',
                children: [
                    {
                        path: 'login',
                        loadComponent: () => import('./auth/pages/login/login.component'),
                    },
                    {
                        path: '**',
                        redirectTo: 'login'
                    }
                ],
            },
            {
                path: '**',
                redirectTo: 'auth'
            }
        ]
    }
]