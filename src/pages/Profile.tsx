import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import PostCard from '@/components/PostCard';
import Navigation from '@/components/Navigation';
import { Camera, Edit, MapPin, Calendar, Link as LinkIcon, Users, Heart } from 'lucide-react';

const Profile = () => {
  const [newPost, setNewPost] = useState('');

  const userPosts = [
    {
      author: {
        name: 'Elena Rodriguez',
        username: 'elena_dance',
        avatar: '/placeholder.svg'
      },
      content: 'Just finished an amazing salsa performance! The energy tonight was incredible 💃✨ #SalsaNight #DanceLife',
      timestamp: '2h',
      likes: 124,
      comments: 18,
      isLiked: true
    },
    {
      author: {
        name: 'Elena Rodriguez',
        username: 'elena_dance',
        avatar: '/placeholder.svg'
      },
      content: 'Teaching a new bachata routine to my students tomorrow. Can\'t wait to see their faces when they nail the moves! 🎵',
      timestamp: '1d',
      likes: 89,
      comments: 12
    }
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Handle post creation
      console.log('Creating post:', newPost);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" alt="Elena Rodriguez" />
                    <AvatarFallback className="gradient-primary text-white text-2xl">
                      ER
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full gradient-primary hover-glow"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">Elena Rodriguez</h1>
                  <p className="text-muted-foreground mb-3">@elena_dance</p>
                  <p className="text-foreground mb-4">
                    Professional dancer & instructor 💃 Spreading joy through movement ✨ 
                    Salsa | Bachata | Contemporary
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Miami, FL</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined March 2023</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="w-4 h-4" />
                      <span>elenarodriguez.dance</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="text-center">
                      <div className="font-bold text-lg">1.2K</div>
                      <div className="text-muted-foreground text-sm">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">5.8K</div>
                      <div className="text-muted-foreground text-sm">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">156</div>
                      <div className="text-muted-foreground text-sm">Posts</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="gradient-primary hover-glow">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Create Post Section */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Share your dance journey</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="What's inspiring your dance today?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    🎵 Music
                  </Button>
                  <Button variant="outline" size="sm">
                    📍 Location
                  </Button>
                </div>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="gradient-primary hover-glow"
                >
                  Share Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <span>Posts</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Liked</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Following</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {userPosts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="liked" className="mt-6">
            <div className="text-center py-12">
              <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No liked posts yet</h3>
              <p className="text-muted-foreground">Posts you like will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="following" className="mt-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Following</h3>
              <p className="text-muted-foreground">Connect with other dancers to see their posts</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;