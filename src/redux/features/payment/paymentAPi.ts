import { baseApi } from "../baseApi/baseApi";


export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyAccout: builder.mutation({
      query: (data) => ({
        url: "/verifyAccount",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "payment"],
    }),
    getAllVerifyInFo: builder.query({
      query: () => ({
        url: "/verifyAccount/all-payment",
        method: "GET",
        
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const { useVerifyAccoutMutation ,useGetAllVerifyInFoQuery} = paymentApi;