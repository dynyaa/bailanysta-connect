import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { usePosts } from '@/hooks/usePosts'
import { Loader2, Sparkles } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const { createPost } = usePosts()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    const { data } = await createPost(content)
    if (data) {
      setContent('')
      onOpenChange(false)
    }
    setLoading(false)
  }

  const generateAIContent = async () => {
    setAiLoading(true)
    try {
      // Call AI generation edge function
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: 'Generate an engaging social media post about dance or movement' 
        })
      })

      if (!response.ok) throw new Error('Failed to generate content')

      const result = await response.json()
      setContent(result.content)
      
      toast({
        title: "AI Content Generated!",
        description: "Feel free to edit the generated content"
      })
    } catch (error) {
      toast({
        title: "AI Unavailable",
        description: "AI generation is not configured yet",
        variant: "destructive"
      })
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="gradient-text">Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">What's on your mind?</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, dance moves, or inspiration..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={generateAIContent}
              disabled={aiLoading}
              className="flex items-center space-x-2"
            >
              {aiLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>AI Generate</span>
            </Button>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="gradient-primary hover-glow"
                disabled={loading || !content.trim()}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}