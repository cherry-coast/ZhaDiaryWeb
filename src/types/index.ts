export interface Comment {
  id: number
  author: string
  content: string
  likes: number
}

export interface Post {
  id: number
  author: string
  avatar: string
  content: string
  category: string
  images: string[]
  likes: number
  comments: Comment[]
  createdAt: string
  isLiked: boolean
  melonStyle?: number | null
}

export interface User {
  username: string
  avatar: string
  isLoggedIn?: boolean
}
