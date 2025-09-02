import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PostCard from '@/components/PostCard';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import PostSkeleton from '@/components/PostSkeleton';
import CreatePostModal from '@/components/CreatePostModal';
import AuthModal from '@/components/AuthModal';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { Plus, TrendingUp, Users, Sparkles } from 'lucide-react';

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { posts, loading } = usePosts();
  const { user } = useAuth();

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.profiles.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.profiles.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <div className="font-semibold text-lg">{posts.length}</div>
              <div className="text-muted-foreground text-sm">Posts</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover-lift transition-smooth">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="font-semibold text-lg">{user ? 'Connected' : 'Join'}</div>
              <div className="text-muted-foreground text-sm">Community</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover-lift transition-smooth">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="font-semibold text-lg">Live</div>
              <div className="text-muted-foreground text-sm">Updates</div>
            </CardContent>
          </Card>
        </div>

        {/* Create Post Button */}
        {user && (
          <Card className="shadow-card mb-8 animate-fade-in">
            <CardHeader>
              <Button
                onClick={() => setCreatePostModalOpen(true)}
                className="w-full gradient-primary hover-glow justify-start"
              >
                <Plus className="w-5 h-5 mr-2" />
                Share your dance moment...
              </Button>
            </CardHeader>
          </Card>
        )}

        {/* Feed */}
        <div className="space-y-6">
          {loading ? (
            // Show skeletons while loading
            Array.from({ length: 5 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No posts found matching your search.' : user ? 'No posts yet. Be the first to share!' : 'Join the community to see posts!'}
              </p>
              {!user && (
                <Button onClick={() => setAuthModalOpen(true)} className="gradient-primary hover-glow">
                  Join Bailanysta
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Load More */}
        {!loading && filteredPosts.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="hover-lift">
              Load More Posts
            </Button>
          </div>
        )}
      </div>

      <CreatePostModal open={createPostModalOpen} onOpenChange={setCreatePostModalOpen} />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Feed;