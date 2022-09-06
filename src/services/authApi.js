// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query:(user) =>{
            return {
                url: 'register',
                method: 'POST',
                body: user,
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    serviceProviderregister: builder.mutation({
        query:(user) =>{
            return {
                url: '/service-provider/signup',
                method: 'POST',
                body: user,
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    loginUser: builder.mutation({
        query:(user) =>{
            return {
                url: '/login',
                method: 'POST',
                body: user,
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    getRole: builder.query({
        query:() =>{
            return {
                url: 'admin/role',
                method: 'get',
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    getRolebyId: builder.query({
        query:(id) =>{
            return {
                url: `admin/role/${id}`,
                method: 'get',
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    updaterolename : builder.mutation({
        query:({actual_data , id}) =>{
            console.log('id',id)
            console.log('user',actual_data)

            return {
                url: `/admin/role/update/${id}`,
                method: 'post',
                body: actual_data,
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    deleteRole: builder.mutation({
        query: (id) => {
          return {
            url: `/admin/role/${id}`,
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),

    postRole: builder.mutation({
        query:(user) =>{
            return {
                url: '/admin/role/create',
                method: 'POST',
                body: user,
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    updateRole: builder.mutation({
        query:(id) =>{
            console.log(id,'id')
            return {
                url:   `/admin/role/status/${id}`,
                method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    
    addClient: builder.mutation({
        query:(user) =>{
            return {
                url: '/client/create',
                method: 'POST',
                body: user,
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    getClientData: builder.query({
        query:(id) =>{
            return {
                url: `/client`,
                method: 'get',
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
    getClientDataByID: builder.query({
        query:(id) =>{
            return {
                url: `/client/edit/${id}`,
                method: 'get',
                Headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation , useLoginUserMutation, useGetRoleQuery, usePostRoleMutation, useGetRolebyIdQuery, usePostUserInfoMutation,useUpdateRoleMutation, useUpdaterolenameMutation, useDeleteRoleMutation, useServiceProviderregisterMutation , useAddClientMutation , useGetClientDataQuery, useGetClientDataByIDQuery} = authApi