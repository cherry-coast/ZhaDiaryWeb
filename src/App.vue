<script src="./js/App.js"></script>

<template>
  <div class="app-container">
    <div class="main-view">
      <WebHome
        :totalPosts="totalPosts"
        :totalComments="totalComments"
        :allCategories="allCategories"
        :selectedCategories="selectedCategories"
        :filteredPosts="filteredPosts"
        :currentUser="currentUser"
        :postCounts="postCounts"
        @openPostForm="openPostForm"
        @search="handleSearch"
        @openLogin="showLoginModal = true"
        @openProfile="showUserProfile = true"
        @logout="currentUser = null"
        @toggleCategory="handleDesktopCategoryToggle"
        @toggleLike="toggleLike"
        @viewDetail="viewDetail"
      />
      
      <MobileHome
        :feedTitle="feedTitle"
        v-model:mobileSearchQuery="mobileSearchQuery"
        :filteredPosts="filteredPosts"
        :selectedCategories="selectedCategories"
        :totalPosts="totalPosts"
        :hasActiveFilters="hasActiveFilters"
        :currentUser="currentUser"
        @submitMobileSearch="submitMobileSearch"
        @toggleLike="toggleLike"
        @viewDetail="viewDetail"
        @resetHome="resetHome"
        @openCategory="showCategoryModal = true"
        @openPostForm="openPostForm"
        @openLogin="showLoginModal = true"
        @openProfile="showUserProfile = true"
      />
    </div>

    <PostForm 
      v-if="showPostForm"
      :categories="allCategories"
      @submit="addPost"
      @close="showPostForm = false"
    />

    <PostDetail
      v-if="viewPostDetail"
      :post="viewPostDetail"
      @addComment="addComment"
      @close="closeDetail"
    />

    <CategoryModal
      :visible="showCategoryModal"
      :selectedCategories="selectedCategories"
      :allCategories="allCategories"
      @close="showCategoryModal = false"
      @confirm="handleCategoryConfirm"
    />

    <LoginModal
      :visible="showLoginModal"
      @close="showLoginModal = false"
      @login="user => currentUser = user"
    />

    <UserProfileModal
      :visible="showUserProfile"
      :user="currentUser || {}"
      @close="showUserProfile = false"
      @updateUser="user => currentUser = user"
    />
  </div>
</template>

<style src="./css/App.css"></style>
