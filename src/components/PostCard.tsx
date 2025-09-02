import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/lib/supabase';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import CommentsModal from '@/components/CommentsModal';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuth();
  const { likePost } = usePosts();
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);

  const handleLike = () => {
    if (!user) return;
    likePost(post.id);
  };

  return (
    <Card className="shadow-card hover-lift transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.profiles.avatar_url} alt={post.profiles.full_name} />
              <AvatarFallback className="gradient-primary text-white">
                {post.profiles.full_name?.charAt(0) || post.profiles.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{post.profiles.full_name}</h3>
              <p className="text-muted-foreground text-xs">@{post.profiles.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-xs">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground leading-relaxed">{post.content}</p>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!user}
              className="flex items-center space-x-2 hover-glow transition-smooth"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes_count}</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCommentsModalOpen(true)}
              className="flex items-center space-x-2 hover-glow"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments_count}</span>
            </Button>

            <Button variant="ghost" size="sm" className="hover-glow">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
      
      <CommentsModal 
        open={commentsModalOpen} 
        onOpenChange={setCommentsModalOpen}
        postId={post.id}
        postAuthor={post.profiles.full_name || post.profiles.username}
      />
    </Card>
  );
};

export default PostCard;