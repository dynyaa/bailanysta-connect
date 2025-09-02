import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useComments } from '@/hooks/useComments'
import { useAuth } from '@/hooks/useAuth'
import { formatDistanceToNow } from 'date-fns'
import { Send, Loader2 } from 'lucide-react'
import PostSkeleton from '@/components/PostSkeleton'

interface CommentsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: string
  postAuthor: string
}

export default function CommentsModal({ open, onOpenChange, postId, postAuthor }: CommentsModalProps) {
  const { user } = useAuth()
  const { comments, loading, addComment } = useComments(postId)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setSubmitting(true)
    const { data } = await addComment(newComment)
    if (data) {
      setNewComment('')
    }
    setSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Comments on {postAuthor}'s post</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.profiles.avatar_url} />
                    <AvatarFallback className="gradient-primary text-white text-xs">
                      {comment.profiles.full_name?.charAt(0) || comment.profiles.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{comment.profiles.full_name}</span>
                      <span className="text-muted-foreground text-xs">
                        @{comment.profiles.username}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {user && (
          <form onSubmit={handleSubmit} className="flex space-x-2 pt-4 border-t">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
            />
            <Button 
              type="submit" 
              size="sm" 
              className="gradient-primary hover-glow"
              disabled={submitting || !newComment.trim()}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}