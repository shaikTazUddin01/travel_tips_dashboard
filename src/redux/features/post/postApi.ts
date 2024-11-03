import { baseApi } from "../baseApi/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create post
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // get all post by admin
    getPostByAdmin: builder.query({
      query: () => {
        return {
          url: "/post/all-post-byAdmin",
          method: "GET",
        };
      },
      providesTags: ["Post"],
    }),
    // get my post
    getMyPost: builder.query({
      query: (query: string | undefined) => ({
        url: "/post/my-post",
        method: "GET",
        params: { type: query },
      }),
      providesTags: ["Post"],
    }),

    // get specific data
    updateSpecificPostByAdmin: builder.mutation({
      query: ({ id, updateInFo }: { id: string; updateInFo: any }) => {
        // console.log(id,updateInFo);
        return {
          url: `/post/updatePostByAdmin/${id}`,
          method: "PATCH",
          body: updateInFo,
        };
      },
      invalidatesTags: ["Post"],
    }),

    // delete post by admin
    deletePostByAdmin: builder.mutation({
      query: (id) => ({
        url: `/post/delete-post-byAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetMyPostQuery,
  useUpdateSpecificPostByAdminMutation,
  useGetPostByAdminQuery,
  useDeletePostByAdminMutation,
} = postApi;
