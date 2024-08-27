import simpleRestProvider from 'ra-data-simple-rest';

import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';
import httpClient from './httpClient';
import { create } from 'domain';

const dataProvider = simpleRestProvider(import.meta.env.VITE_SIMPLE_REST_URL, httpClient);

const customDataProvider = {
    ...dataProvider,
    getList: async (resource: any, params: { pagination: { page: any; perPage: any }; filter: any }) => {
        const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            page: page,
            limit: perPage,
            ...params.filter,
            // filter: JSON.stringify(params.filter),
        };
        const endpoint = resource === 'editor' || resource === 'admin' ? 'users' : resource;
        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${endpoint}?${fetchUtils.queryParameters(query)}`;

        const response = await httpClient(url);
        const data = response.json.data;
        console.log(data);

        // Custom logic to fetch the total count
        // const totalResponse = await  httpClient(`${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}/count`);
        // @ts-ignore
        const total = response.json.numberOfElements ?? 0;
        console.log(total);

        return {
            data,
            total,
        };
    },
    delete: (resource, params) => {
        if(resource === 'admin' || resource === 'editor'){

        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/admin/users/delete-user/${params.id}`;
            return httpClient(url, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        } else {
            dataProvider.delete(resource,params)
        }
    },
    create: (resource: ResourceType, params: CareateParams) => {
        if(resource === 'admin' || resource === 'editor'){

            console.log(params)
            const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/admin/users/create-user`;
            return httpClient(url, {
                method: 'POST',
                body: JSON.stringify(params.data)
            }).then(({ json }) => ({ data: {id: 11, success: "Bravooo"} }));
        } else {
            dataProvider.create(resource,params)
        } 

    }
};

const customListWithIdDataProvider = {
    ...dataProvider,
    getList: async (resource: any, params: { pagination: { page: any; perPage: any }; filter: any }) => {
        const query = {
            ...params.filter,
        };

        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}?${fetchUtils.queryParameters(query)}`;

        const response = await httpClient(url);
        let data = response.json;

        // Custom logic to fetch the total count
        // const totalResponse = await  httpClient(`${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}/count`);
        // @ts-ignore
        const total = response.json.numberOfElements ?? 0;

        let id = 0;
        data = data.map((record) => ({ id: id++, ...record }));

        return {
            data,
            total: data.length,
        };
    },
};

const customListDataProvider = {
    ...dataProvider,
    getList: async (resource: any, params: { pagination: { page: any; perPage: any }; filter: any }) => {
        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}`;

        const response = await httpClient(url);
        let data = response.json;

        // Custom logic to fetch the total count
        // const totalResponse = await  httpClient(`${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}/count`);
        // @ts-ignore
        const total = response.json.numberOfElements ?? 0;

        return {
            data,
            total: data.length,
        };
    },
    update: async(resource: ResourceType, params: UpdateParams) => {
        if(resource === "static-data/technologies") {
            const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/static-data/technologies/${params.id}`;
            return await httpClient(url, {method: "PATCH", body: params.data.featured, headers: new Headers({"Content-Type": "application/json"})}).then(({ json }) => ({ data: json }));
        } else {
            return dataProvider.update(resource, params);
        }
    },
    delete: (resource: ResourceType, params: UpdateParams) => {
        if(resource === "static-data/technologies/details") {
            const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/static-data/technologies/${params.id}`;
                return httpClient(url, {
                    method: 'DELETE',
                }).then(({ json }) => ({ data: json }));
            } else {
                dataProvider.delete(resource,params)
            }
    },
    create: (resource: ResourceType, params: CareateParams) => {
        console.log(params)
        if(resource === "static-data/technologies/details") {
            const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/static-data/technologies`;
                return httpClient(url, {
                    method: 'POST',
                    body: JSON.stringify(params.data)
                }).then(({ json }) => ({ data: json }));
            } else {
                dataProvider.create(resource,params)
            } 
    }
    

};

const dataProviders = [
    {
        dataProvider: customDataProvider,
        resources: ['users', 'editor', 'admin'],
    },
    {
        dataProvider: customDataProvider,
        resources: ['job-offers', 'notifications'],
    },
    {
        dataProvider: customListWithIdDataProvider,
        resources: [
            'static-data/form-of-employments',
            'static-data/work-types',
            'static-data/addresses/with-postal-codes',
        ],
    },
    {
        dataProvider: customListDataProvider,
        resources: ['static-data/technologies/details', 'static-data/about-us/all', 'static-data/technologies'],
    },
];

export default (type, resource, params) => {
    console.log(type, resource, params);
    const dataProviderMapping = dataProviders.find((dp) => dp.resources.includes(resource));
    console.log(dataProviderMapping);

    const mappingType = {
        [GET_LIST]: 'getList',
        [GET_ONE]: 'getOne',
        [GET_MANY]: 'getMany',
        [GET_MANY_REFERENCE]: 'getManyReference',
        [CREATE]: 'create',
        [UPDATE]: 'update',
        [UPDATE_MANY]: 'updateMany',
        [DELETE]: 'delete',
    };

    return dataProviderMapping.dataProvider[mappingType[type]](resource, params);
};
