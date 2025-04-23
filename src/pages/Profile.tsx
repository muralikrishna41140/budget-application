
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Settings, Bell, Lock, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg",
    memberSince: "January 2025",
    location: "New York, NY",
    occupation: "Software Engineer",
    bio: "Passionate about personal finance and building a secure financial future. Working on saving for early retirement and helping others achieve financial literacy."
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    weeklyReports: true,
    goalReminders: true,
    unusualActivity: true,
    tipsAndArticles: false,
    productUpdates: true
  });

  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    
    toast({
      title: "Notification preferences updated",
      description: `${key} notifications ${!notifications[key] ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "We've sent a confirmation email. Please follow the instructions to confirm account deletion.",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Info Card */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">Personal Information</CardTitle>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
              <CardDescription>Update your personal details and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="w-24 h-24 border-2 border-primary">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  )}
                  
                  <div className="text-center">
                    <Badge className="mb-2">Pro Member</Badge>
                    <p className="text-sm text-muted-foreground">Member since {profileData.memberSince}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input 
                          id="occupation" 
                          name="occupation" 
                          value={formData.occupation} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea 
                          id="bio" 
                          name="bio" 
                          rows={4}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          value={formData.bio} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            <User className="inline h-4 w-4 mr-1" /> Full Name
                          </p>
                          <p>{profileData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            <Mail className="inline h-4 w-4 mr-1" /> Email
                          </p>
                          <p>{profileData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            <Phone className="inline h-4 w-4 mr-1" /> Phone
                          </p>
                          <p>{profileData.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                          <p>{profileData.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Occupation</p>
                          <p>{profileData.occupation}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Bio</p>
                        <p className="text-sm">{profileData.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            {isEditing && (
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>
          
          {/* Connected Accounts */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">Connected Accounts</CardTitle>
              <CardDescription>Link your financial accounts for better insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Chase Bank", connected: true, image: "/placeholder.svg" },
                  { name: "Bank of America", connected: true, image: "/placeholder.svg" },
                  { name: "Vanguard", connected: false, image: "/placeholder.svg" },
                  { name: "Robinhood", connected: false, image: "/placeholder.svg" }
                ].map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center mr-3">
                        <img src={account.image} alt={account.name} className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={account.connected ? "outline" : "default"} 
                      size="sm"
                    >
                      {account.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Connect Another Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                <CardTitle className="text-xl">Notification Preferences</CardTitle>
              </div>
              <CardDescription>Decide how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailUpdates" className="font-medium">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive account updates via email</p>
                  </div>
                  <Switch 
                    id="emailUpdates" 
                    checked={notifications.emailUpdates}
                    onCheckedChange={() => handleNotificationChange('emailUpdates')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports" className="font-medium">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get a summary of your weekly financial activity</p>
                  </div>
                  <Switch 
                    id="weeklyReports" 
                    checked={notifications.weeklyReports}
                    onCheckedChange={() => handleNotificationChange('weeklyReports')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="goalReminders" className="font-medium">Goal Reminders</Label>
                    <p className="text-sm text-muted-foreground">Notifications about your financial goals</p>
                  </div>
                  <Switch 
                    id="goalReminders" 
                    checked={notifications.goalReminders}
                    onCheckedChange={() => handleNotificationChange('goalReminders')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="unusualActivity" className="font-medium">Unusual Activity</Label>
                    <p className="text-sm text-muted-foreground">Get alerted about suspicious transactions</p>
                  </div>
                  <Switch 
                    id="unusualActivity" 
                    checked={notifications.unusualActivity}
                    onCheckedChange={() => handleNotificationChange('unusualActivity')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tipsAndArticles" className="font-medium">Tips & Articles</Label>
                    <p className="text-sm text-muted-foreground">Receive personalized financial tips</p>
                  </div>
                  <Switch 
                    id="tipsAndArticles" 
                    checked={notifications.tipsAndArticles}
                    onCheckedChange={() => handleNotificationChange('tipsAndArticles')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="productUpdates" className="font-medium">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">Learn about new features and improvements</p>
                  </div>
                  <Switch 
                    id="productUpdates" 
                    checked={notifications.productUpdates}
                    onCheckedChange={() => handleNotificationChange('productUpdates')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                <CardTitle className="text-xl">Security Settings</CardTitle>
              </div>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Last updated 2 months ago
                  </p>
                  <Button>Change Password</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your active sessions and sign out remotely
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">MacBook Pro - Chrome</p>
                        <p className="text-xs text-muted-foreground">New York, USA • Current session</p>
                      </div>
                      <Badge>Active Now</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">iPhone 13 - Safari</p>
                        <p className="text-xs text-muted-foreground">New York, USA • Last active: 2 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all your data
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <CardTitle className="text-xl">Billing & Subscription</CardTitle>
              </div>
              <CardDescription>Manage your subscription plan and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                <div className="bg-muted/50 border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <Badge className="mb-1 bg-primary">Pro Plan</Badge>
                      <p className="font-medium text-lg">$9.99/month</p>
                    </div>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your subscription renews on May 15, 2025
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 09/26</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-red-500 rounded mr-3"></div>
                      <div>
                        <p className="font-medium">Mastercard ending in 5555</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Set Default</Button>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4">
                  Add Payment Method
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Billing History</h3>
                <div className="text-sm border rounded-lg divide-y overflow-hidden">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50">
                    <div>
                      <p className="font-medium">April 15, 2025</p>
                      <p className="text-muted-foreground">Pro Plan - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$9.99</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50">
                    <div>
                      <p className="font-medium">March 15, 2025</p>
                      <p className="text-muted-foreground">Pro Plan - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$9.99</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50">
                    <div>
                      <p className="font-medium">February 15, 2025</p>
                      <p className="text-muted-foreground">Pro Plan - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$9.99</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Paid</Badge>
                    </div>
                  </div>
                </div>
                
                <Button variant="link" className="mt-2 p-0 h-auto">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Need Help/Support */}
      <Card className="glass-card mt-8">
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <HelpCircle className="h-6 w-6 mr-3 text-primary" />
            <div>
              <h3 className="font-medium">Need help with your account?</h3>
              <p className="text-sm text-muted-foreground">Our support team is here to help you with any questions.</p>
            </div>
          </div>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Profile;
