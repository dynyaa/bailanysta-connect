import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import PostCard from '@/components/PostCard';
import { ArrowRight, Users, Heart, Zap, Star, Play, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/bailanysta-hero.jpg';

const Index = () => {
  const navigate = useNavigate();

  const featuredPosts = [
    {
      author: {
        name: 'Sofia Martinez',
        username: 'sofia_flamenco',
        avatar: '/placeholder.svg'
      },
      content: 'Flamenco is the language of the soul. Every stomp, every clap tells a story of passion and heritage 🔥 #FlamencoLife #SpanishDance',
      timestamp: '2h',
      likes: 189,
      comments: 27,
      isLiked: true
    },
    {
      author: {
        name: 'Marcus Johnson',
        username: 'marcus_street',
        avatar: '/placeholder.svg'
      },
      content: 'Street cypher tonight was insane! The community here never fails to inspire. Hip-hop culture at its finest 🎤',
      timestamp: '4h',
      likes: 156,
      comments: 22
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-rainbow opacity-10"></div>
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-24 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Bailanysta
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-in-left">
                The social network where dancers connect, create, and inspire. 
                Share your passion, discover new moves, and build your dance community.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-in-right">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => navigate('/profile')}
                  className="shadow-2xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Dancing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  onClick={() => navigate('/feed')}
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Explore Feed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Where Dance Meets <span className="text-primary">Community</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Connect with dancers worldwide, share your journey, and discover inspiration every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-card hover-lift text-center animate-bounce-in">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect & Share</h3>
                <p className="text-muted-foreground">
                  Build your dance network and share your passion with like-minded artists from around the world
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-lift text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Inspired</h3>
                <p className="text-muted-foreground">
                  Discover new styles, techniques, and creative expressions from dancers across all genres
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover-lift text-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Grow Together</h3>
                <p className="text-muted-foreground">
                  Support each other's journey, celebrate achievements, and build lasting friendships
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-primary" />
                Trending Now
              </h2>
              <p className="text-muted-foreground">See what's moving the community</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/feed')}>
              View All
            </Button>
          </div>

          <div className="space-y-6">
            {featuredPosts.map((post, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-in-left">
            Create your profile, share your dance story, and become part of the global dance community
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-in-right">
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/profile')}
              className="border-white text-white hover:bg-white hover:text-primary shadow-2xl"
            >
              Create Profile
            </Button>
            <Button 
              variant="ghost" 
              size="xl"
              onClick={() => navigate('/feed')}
              className="text-white hover:bg-white/20"
            >
              <Heart className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
