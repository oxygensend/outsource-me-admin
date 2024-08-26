import simpleRestProvider from "ra-data-simple-rest";

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
import httpClient from "./httpClient";

const dataProvider = simpleRestProvider(
  import.meta.env.VITE_SIMPLE_REST_URL, httpClient
);


const customDataProvider = {
    ...dataProvider,
    getList: async (resource: any, params: { pagination: { page: any; perPage: any; }; filter: any; }) => {
        const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            page: page,
            limit: perPage,
            ...params.filter
            // filter: JSON.stringify(params.filter),
        };
        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}?${fetchUtils.queryParameters(query)}`;

        const response = await httpClient(url);
        const data = response.json.data;
        console.log(data);

        // Custom logic to fetch the total count
        // const totalResponse = await  httpClient(`${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}/count`);
        // @ts-ignore
        const  total = response.json.numberOfElements ?? 0;
        console.log(total)

        return {
            data,
            total,
        };
    },
};

const customListWithIdDataProvider = {
    ...dataProvider,
    getList: async (resource: any, params: { pagination: { page: any; perPage: any; }; filter: any; }) => {

      const query = {
        ...params.filter
    };
       
        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}?${fetchUtils.queryParameters(query)}`;

        const response = await httpClient(url);
        let data = response.json
        console.log(data);

        // Custom logic to fetch the total count
        // const totalResponse = await  httpClient(`${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}/count`);
        // @ts-ignore
        const  total = response.json.numberOfElements ?? 0;
        console.log(total)

        let id= 0;
        data = data.map(record => ({"id": id++, ...record}))
        console.log(data)

        return {
            data,
            total: data.length
        };
    },
};

const customListDataProvider = {
    ...dataProvider,
    getList: async (resource: any, params: { pagination: { page: any; perPage: any; }; filter: any; }) => {
       
        const url = `${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}`;

        const response = await httpClient(url);
        let data = response.json
        console.log(data);

        // Custom logic to fetch the total count
        // const totalResponse = await  httpClient(`${import.meta.env.VITE_SIMPLE_REST_URL}/${resource}/count`);
        // @ts-ignore
        const  total = response.json.numberOfElements ?? 0;
        console.log(total)

        return {
            data,
            total: data.length
        };
    },
};

const dataProviders = [ 
    {
      dataProvider: customDataProvider,
      resources: ['users'],
    },
    {
      dataProvider: customDataProvider,
      resources: ['job-offers', 'notifications'],
    },
    {
      dataProvider: customListWithIdDataProvider,
      resources: ['static-data/form-of-employments', 'static-data/work-types', 'static-data/addresses/with-postal-codes'],
    },
    {
      dataProvider: customListDataProvider,
      resources: ['static-data/technologies/details', 'static-data/about-us/all'],
    },
  ];


export default (type, resource, params) => {
    console.log(type, resource, params)
    const dataProviderMapping = dataProviders.find((dp) =>
      dp.resources.includes(resource));
    console.log(dataProviderMapping)
  
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
  }