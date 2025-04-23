
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import DemoVideo from "@/components/shared/DemoVideo";
import { toast } from "sonner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created! Welcome to Money Mentor!");
    // For demo purposes, just navigate to dashboard
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <header className="flex items-center justify-between p-6">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="h-9 w-9 rounded-lg bg-finance-navy dark:bg-finance-teal flex items-center justify-center shadow-neo">
            <span className="text-white font-bold text-xl">$</span>
          </div>
          <h1 className="text-xl font-bold">Money Mentor</h1>
        </Link>
        <ThemeToggle />
      </header>
      
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-2">Start Your Financial Journey</h1>
                <p className="text-muted-foreground">
                  Join thousands of users transforming their finances with AI-powered insights
                </p>
              </div>
              <DemoVideo 
                isPlaying={isVideoPlaying}
                onPlay={() => setIsVideoPlaying(true)}
              />
            </div>

            <Card className="w-full max-w-md mx-auto neo-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Enter your details to create your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="Email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="Password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full interactive-gradient">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="bg-white dark:bg-background hover-scale">
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 dark:bg-[#1877F2]/80 hover-scale">
                      <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M20 10.061c0-5.557-4.497-10.061-10.042-10.061-5.544 0-10.042 4.504-10.042 10.061 0 5.022 3.658 9.184 8.437 9.939v-7.03h-2.541v-2.909h2.541v-2.216c0-2.514 1.493-3.906 3.776-3.906 1.094 0 2.239.196 2.239.196v2.459h-1.262c-1.242 0-1.629.775-1.629 1.57v1.897h2.773l-.443 2.909h-2.33v7.03c4.778-.755 8.437-4.917 8.437-9.939z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
