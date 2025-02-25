export interface Config {
    apis: Apis;
    languages: Languages;
}

export interface Apis {
    [key: string]: Api;
}

export interface Api {
    baseUrl: string;
    apiKey?: string;
    endpoints: Endpoints;
}

export interface Endpoints {
    [key: string]: string;
}

export interface Languages {
    availables: string[];
    default: string;
}


//   export interface Config {
//     endpoints: string[];
//     user_menu: UserMenu[];
//     apiRestJava: string;
//     TOKEN_KEY: string;
//     REFRESH_TOKEN_KEY: string;
//     AUTHORIZATION_HEADER_KEY: string;
//   }
