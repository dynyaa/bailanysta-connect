import { useState, useEffect } from 'react'
import { supabase, Comment } from '@/lib/supabase'
import { toast } from '@/components/ui/use-toast'

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchComments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch comments",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const addComment = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content,
        })
        .select(`
          *,
          profiles (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .single()

      if (error) throw error

      setComments(prev => [...prev, data])

      // Update post comments count
      await supabase.rpc('increment_comments_count', { post_id: postId })

      // Create notification
      const { data: post } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single()

      if (post && post.user_id !== user.id) {
        await supabase
          .from('notifications')
          .insert({
            user_id: post.user_id,
            type: 'comment',
            content: 'commented on your post',
            related_user_id: user.id,
            related_post_id: postId,
          })
      }

      toast({
        title: "Success",
        description: "Comment added successfully!"
      })

      return { data, error: null }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    }
  }

  useEffect(() => {
    if (postId) {
      fetchComments()
    }
  }, [postId])

  return {
    comments,
    loading,
    fetchComments,
    addComment,
  }
}