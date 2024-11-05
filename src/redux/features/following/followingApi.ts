import { baseApi } from "../baseApi/baseApi";

export const followingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markFollowing: builder.mutation({
      query: (data) => ({
        url: "/following",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Following"],
    }),
    getMyFollowing: builder.query({
      query: () => ({
        url: "/following/myFollowing",
        method: "GET",
      }),
      providesTags: ["Following"],
    }),
  }),
});

export const { useMarkFollowingMutation ,useGetMyFollowingQuery} = followingApi;
