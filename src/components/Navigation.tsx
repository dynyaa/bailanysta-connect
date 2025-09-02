import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Home, Plus, Search, Heart, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import CreatePostModal from '@/components/CreatePostModal';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { 
      icon: Plus, 
      label: 'Create', 
      action: () => user ? setCreatePostModalOpen(true) : setAuthModalOpen(true)
    },
    { icon: Heart, label: 'Activity', path: '/activity' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bailanysta
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                item.action ? (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    onClick={item.action}
                    className="flex items-center space-x-2 hover-lift"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="flex items-center space-x-2 hover-lift"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                )
              ))}
              
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center space-x-2 hover-lift"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center space-x-2 hover-lift"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
              )}
              
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  item.action ? (
                    <Button
                      key={item.label}
                      variant="ghost"
                      onClick={() => {
                        item.action();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-start space-x-3 w-full"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  ) : (
                    <Button
                      key={item.label}
                      variant="ghost"
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-start space-x-3 w-full"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  )
                ))}
                
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-start space-x-3 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-start space-x-3 w-full"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <CreatePostModal open={createPostModalOpen} onOpenChange={setCreatePostModalOpen} />
    </>
  );
};

export default Navigation;