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
    // get all post
    getPost: builder.query({
      query: ({category,search,type,sorting}:Record<string,any>) =>{
        // console.log({category,search,type,sorting});
        return  ({
          url: "/post/all-post",
          method: "GET",
          params: { category,search,type,sorting},
        })
      },
      providesTags: ["Post"],
    }),
    // get all post by admin
    getPostByAdmin: builder.query({
      query: () =>{
        return  ({
          url: "/post/all-post-byAdmin",
          method: "GET",
        })
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
    getSpecificPost: builder.query({
      query: (id) => ({
        url: `/post/getSpecificUserPost/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    // upvote or downvote
    upvoteDownvote: builder.mutation({
      query: (postId) => ({
        url: "/post/upvoteDownvote",
        method: "POST",
        body:postId,
      }),
      invalidatesTags: ["Post"],
    }),
    // get specific data
    deleteSpecificPost: builder.mutation({
      query: (id) => ({
        url: `/post/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    // update specific data
    updateSpecificPost: builder.mutation({
      query: ({ id, updateInFo }: { id: string; updateInFo: any }) => {
        
        return({
        url: `/post/updatePost/${id}`,
        method: "PATCH",
        body:updateInFo
      })},
      invalidatesTags: ["Post"],
    }),
    // get specific data
    updateSpecificPostByAdmin: builder.mutation({
      query: ({ id, updateInFo }: { id: string; updateInFo: any }) => {
        // console.log(id,updateInFo);
        return({
        url: `/post/updatePostByAdmin/${id}`,
        method: "PATCH",
        body:updateInFo
      })},
      invalidatesTags: ["Post"],
    }),
    // comment post
    commentToPost: builder.mutation({
      query: (data) => ({
        url: "/post/comment",
        method: "POST",
        body:data
      }),
      invalidatesTags: ["Post"],
    }),
    // delete comment from post
    deleteComment: builder.mutation({
      query: (data) => ({
        url: "/post/comment",
        method: "DELETE",
        body:data
      }),
      invalidatesTags: ["Post"],
    }),
    //Update comment into post
    updateComment: builder.mutation({
      query: (data) => ({
        url: "/post/comment",
        method: "PATCH",
        body:data
      }),
      invalidatesTags: ["Post"],
    }),
    //Update comment into post
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/post/getSinglePost/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    // delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete-post/${id}`,
        method: "DELETE",
        
      }),
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
  useGetPostQuery,
  useGetSpecificPostQuery,
  useGetMyPostQuery,
  useUpvoteDownvoteMutation,
  useDeleteSpecificPostMutation,
  useUpdateSpecificPostMutation,
  useCommentToPostMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useUpdateSpecificPostByAdminMutation,
  useGetPostByAdminQuery,
  useDeletePostByAdminMutation
} = postApi;