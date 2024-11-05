import { baseApi } from "../baseApi/baseApi";

const followersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFollowers: builder.query({
      query: () => ({
        url: "/followers/myFollowers",
        method: "GET",
      }),
      providesTags: ["Followers"],
    }),
    getSpecificFollowers: builder.query({
      query: (data) => ({
        url: `/followers/specificFollowers/${data}`,
        method: "GET",
      }),

      providesTags: ["Followers"],
    }),
  }),
});

export const { useGetMyFollowersQuery, useGetSpecificFollowersQuery } =
  followersApi;
