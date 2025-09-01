import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PostCard from '@/components/PostCard';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import PostSkeleton from '@/components/PostSkeleton';
import { Plus, TrendingUp, Users, Sparkles } from 'lucide-react';

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const posts = [
    {
      author: {
        name: 'Carlos Martinez',
        username: 'carlos_moves',
        avatar: '/placeholder.svg'
      },
      content: 'Breaking in a new studio today! The wooden floors and mirrors make all the difference. Ready to practice some new hip-hop combinations 🔥',
      timestamp: '30m',
      likes: 45,
      comments: 8
    },
    {
      author: {
        name: 'Maya Chen',
        username: 'maya_contemporary',
        avatar: '/placeholder.svg'
      },
      content: 'Just choreographed a piece to "River" by Leon Bridges. The emotions flowing through movement never cease to amaze me. Can\'t wait to perform this! 🌊✨',
      timestamp: '1h',
      likes: 132,
      comments: 24,
      isLiked: true
    },
    {
      author: {
        name: 'Diego Santos',
        username: 'diego_tango',
        avatar: '/placeholder.svg'
      },
      content: 'Tango is not just a dance, it\'s a conversation between souls. Tonight\'s milonga was pure magic 💫 #TangoLife #BuenosAires',
      timestamp: '3h',
      likes: 89,
      comments: 15
    },
    {
      author: {
        name: 'Aria Johnson',
        username: 'aria_ballet',
        avatar: '/placeholder.svg'
      },
      content: 'After months of preparation, finally nailed that triple pirouette! The key was finding my center and trusting the technique 🩰 Practice makes progress!',
      timestamp: '5h',
      likes: 203,
      comments: 31,
      isLiked: true
    },
    {
      author: {
        name: 'Raj Patel',
        username: 'raj_bollywood',
        avatar: '/placeholder.svg'
      },
      content: 'Teaching Bollywood fusion to beginners never gets old. Seeing their faces light up when they catch the rhythm for the first time is everything! 🎭',
      timestamp: '8h',
      likes: 67,
      comments: 12
    }
  ];

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePost = () => {
    if (newPost.trim()) {
      console.log('Creating post:', newPost);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search posts, users, or hashtags..."
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="shadow-card hover-lift transition-smooth">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="font-semibold text-lg">1.2K</div>
              <div className="text-muted-foreground text-sm">Trending</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover-lift transition-smooth">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="font-semibold text-lg">5.8K</div>
              <div className="text-muted-foreground text-sm">Dancers</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover-lift transition-smooth">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="font-semibold text-lg">892</div>
              <div className="text-muted-foreground text-sm">Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Create Post */}
        <Card className="shadow-card mb-8 animate-fade-in">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>Share your dance moment</span>
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="What's moving you today? Share your dance journey..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none border-muted focus:border-primary transition-smooth"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover-lift">
                    📸 Photo
                  </Button>
                  <Button variant="outline" size="sm" className="hover-lift">
                    🎵 Music
                  </Button>
                  <Button variant="outline" size="sm" className="hover-lift">
                    💃 Style
                  </Button>
                </div>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="gradient-primary hover-glow animate-pulse-glow"
                >
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed */}
        <div className="space-y-6">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 5 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No posts found matching your search.' : 'No posts available.'}
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="hover-lift">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;