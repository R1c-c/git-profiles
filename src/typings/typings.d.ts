import type { Session, SupabaseClient } from "@supabase/supabase-js";

export interface Post {
    id: number,
    titulo: string,
    data: string,
    imagem_capa: string,
    conteudo: string,
  }

export interface GlobalPostsType {
    searchInput: string, 
    posts: Post[], 
    activePost: Post | null,
    isActive: boolean, 
    likedPostsStorage: number[];
    setSearchInput: React.Dispatch<React.SetStateAction<string>>, 
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setActivePost: React.Dispatch<React.SetStateAction<Post | null>>,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>, 
    updateLikedPostsStorage: (newlist: number[]) => void,
    handleActivePost: (post: Post | null) => void,
    session: Session | null
  }