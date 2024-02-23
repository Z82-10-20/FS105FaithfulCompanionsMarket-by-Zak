import { BIRDS_URL, CATS_URL, DOGS_URL, FISHES_URL, PETFOOD_URL, ACCESSORIES_URL, UPLOAD_URL, } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Birds
    getBirds: builder.query({
      query: () => ({
        url: BIRDS_URL,
       }),
       providesTags:['Bird'],
       keepUnusedDataFor: 5,
       }),
   
    getBirdDetails: builder.query({
      query: birdId => `${BIRDS_URL}/${birdId}`,
      keepUnusedDataFor: 5,
    }),
    createBird: builder.mutation({
      query: () => ({
        url: BIRDS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Bird'],
    }),
    updateBird: builder.mutation({
      query: data => ({
        url: `${BIRDS_URL}/${data.birdId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Birds'],
    }),
    uploadBirdImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteBird: builder.mutation({
      query: (birdId) => ({
        url: `${BIRDS_URL}/${birdId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Birds'],
    }),
    createBirdReview: builder.mutation({
      query: data => ({
        url: `${BIRDS_URL}/${data.birdId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Birds'],
    }),
    getTopBirds: builder.query({
      query: () => `${BIRDS_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // Cats
    getCats: builder.query({
      query: () => CATS_URL,
      keepUnusedDataFor: 5,
    }),
    getCatsDetails: builder.query({
      query: catId => `${CATS_URL}/${catId}`,
      keepUnusedDataFor: 5,
    }),
    createCat: builder.mutation({
      query: data => ({
        url: CATS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cats'],
    }),
    updateCat: builder.mutation({
      query: data => ({
        url: `${CATS_URL}/${data.catId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cats'],
    }),
    uploadCatImage: builder.mutation({
      query: data => ({
        url: `${CATS_URL}/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteCat: builder.mutation({
      query: catId => ({
        url: `${CATS_URL}/${catId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cats'],
    }),
    createCatReview: builder.mutation({
      query: data => ({
        url: `${CATS_URL}/${data.catId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cats'],
    }),
    getTopCats: builder.query({
      query: () => `${CATS_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // Dogs
    getDogs: builder.query({
      query: () => DOGS_URL,
      keepUnusedDataFor: 5,
    }),
    getDogsDetails: builder.query({
      query: dogId => `${DOGS_URL}/${dogId}`,
      keepUnusedDataFor: 5,
    }),
    createDog: builder.mutation({
      query: data => ({
        url: DOGS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Dogs'],
    }),
    updateDog: builder.mutation({
      query: data => ({
        url: `${DOGS_URL}/${data.dogId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Dogs'],
    }),
    uploadDogImage: builder.mutation({
      query: data => ({
        url: `${DOGS_URL}/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteDog: builder.mutation({
      query: dogId => ({
        url: `${DOGS_URL}/${dogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dogs'],
    }),
    createDogReview: builder.mutation({
      query: data => ({
        url: `${DOGS_URL}/${data.dogId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Dogs'],
    }),
    getTopDogs: builder.query({
      query: () => `${DOGS_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // Fishes
    getFishes: builder.query({
      query: () => FISHES_URL,
      keepUnusedDataFor: 5,
    }),
    getFishesDetails: builder.query({
      query: fishId => `${FISHES_URL}/${fishId}`,
      keepUnusedDataFor: 5,
    }),
    createFish: builder.mutation({
      query: data => ({
        url: FISHES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Fishes'],
    }),
    updateFish: builder.mutation({
      query: data => ({
        url: `${FISHES_URL}/${data.fishId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Fishes'],
    }),
    uploadFishImage: builder.mutation({
      query: data => ({
        url: `${FISHES_URL}/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteFish: builder.mutation({
      query: fishId => ({
        url: `${FISHES_URL}/${fishId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fishes'],
    }),
    createFishReview: builder.mutation({
      query: data => ({
        url: `${FISHES_URL}/${data.fishId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Fishes'],
    }),
    getTopFishes: builder.query({
      query: () => `${FISHES_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // Pet Food
    getPetFood: builder.query({
      query: () => PETFOOD_URL,
      keepUnusedDataFor: 5,
    }),
    getPetFoodDetails: builder.query({
      query: petFoodId => `${PETFOOD_URL}/${petFoodId}`,
      keepUnusedDataFor: 5,
    }),
    createPetFood: builder.mutation({
      query: data => ({
        url: PETFOOD_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PetFood'],
    }),
    updatePetFood: builder.mutation({
      query: data => ({
        url: `${PETFOOD_URL}/${data.petFoodId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PetFood'],
    }),
    uploadPetFoodImage: builder.mutation({
      query: data => ({
        url: `${PETFOOD_URL}/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deletePetFood: builder.mutation({
      query: petFoodId => ({
        url: `${PETFOOD_URL}/${petFoodId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PetFood'],
    }),
    createPetFoodReview: builder.mutation({
      query: data => ({
        url: `${PETFOOD_URL}/${data.petFoodId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PetFood'],
    }),
    getTopPetFood: builder.query({
      query: () => `${PETFOOD_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // Accessories
    getAccessories: builder.query({
      query: () => ACCESSORIES_URL,
      keepUnusedDataFor: 5,
    }),
    getAccessoriesDetail: builder.query({
      query: accessoryId => `${ACCESSORIES_URL}/${accessoryId}`,
      keepUnusedDataFor: 5,
    }),
    createAccessory: builder.mutation({
      query: data => ({
        url: ACCESSORIES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Accessories'],
    }),
    updateAccessory: builder.mutation({
      query: data => ({
        url: `${ACCESSORIES_URL}/${data.accessoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Accessories'],
    }),
    uploadAccessoryImage: builder.mutation({
      query: data => ({
        url: `${ACCESSORIES_URL}/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteAccessory: builder.mutation({
      query: accessoryId => ({
        url: `${ACCESSORIES_URL}/${accessoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Accessories'],
    }),
    createAccessoryReview: builder.mutation({
      query: data => ({
        url: `${ACCESSORIES_URL}/${data.accessoryId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Accessories'],
    }),
    getTopAccessories: builder.query({
      query: () => `${ACCESSORIES_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  // Birds
  useGetBirdsQuery,
  useGetBirdDetailsQuery,
  useCreateBirdMutation,
  useUpdateBirdMutation,
  useUploadBirdImageMutation,
  useDeleteBirdMutation,
  useCreateBirdReviewMutation,
  useGetTopBirdsQuery,
  // Cats
  useGetCatsQuery,
  useGetCatsDetailsQuery,
  useCreateCatMutation,
  useUpdateCatMutation,
  useUploadCatImageMutation,
  useDeleteCatMutation,
  useCreateCatReviewMutation,
  useGetTopCatsQuery,
  // Dogs
  useGetDogsQuery,
  useGetDogsDetailsQuery,
  useCreateDogMutation,
  useUpdateDogMutation,
  useUploadDogImageMutation,
  useDeleteDogMutation,
  useCreateDogReviewMutation,
  useGetTopDogsQuery,
  // Fishes
  useGetFishesQuery,
  useGetFishesDetailsQuery,
  useCreateFishMutation,
  useUpdateFishMutation,
  useUploadFishImageMutation,
  useDeleteFishMutation,
  useCreateFishReviewMutation,
  useGetTopFishesQuery,
  // Pet Food
  useGetPetFoodQuery,
  useGetPetFoodDetailsQuery,
  useCreatePetFoodMutation,
  useUpdatePetFoodMutation,
  useUploadPetFoodImageMutation,
  useDeletePetFoodMutation,
  useCreatePetFoodReviewMutation,
  useGetTopPetFoodQuery,
  // Accessories
  useGetAccessoriesQuery,
  useGetAccessoriesDetailQuery,
  useCreateAccessoryMutation,
  useUpdateAccessoryMutation,
  useUploadAccessoryImageMutation,
  useDeleteAccessoryMutation,
  useCreateAccessoryReviewMutation,
  useGetTopAccessoriesQuery,
} = productApiSlice;
