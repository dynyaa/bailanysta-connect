import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardMockProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const PostCardMock = ({ author, content, timestamp, likes, comments, isLiked = false }: PostCardMockProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="shadow-card hover-lift transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="gradient-primary text-white">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{author.name}</h3>
              <p className="text-muted-foreground text-xs">@{author.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-xs">{timestamp}</span>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-foreground leading-relaxed">{content}</p>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-2 hover-glow transition-smooth",
                liked && "text-red-500"
              )}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-current")} />
              <span className="text-sm">{likeCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover-glow">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{comments}</span>
            </Button>

            <Button variant="ghost" size="sm" className="hover-glow">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCardMock;