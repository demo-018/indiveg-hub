import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  });

  const handleSave = () => {
    // In a real app, this would make an API call to update the user
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>Your basic account details</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editedUser.name}
                            onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                          />
                        ) : (
                          <p className="p-3 bg-muted rounded-md">{user.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editedUser.email}
                            onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                          />
                        ) : (
                          <p className="p-3 bg-muted rounded-md flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {user.email || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      {isEditing ? (
                        <Input
                          id="mobile"
                          value={editedUser.mobile}
                          onChange={(e) => setEditedUser(prev => ({ ...prev, mobile: e.target.value }))}
                        />
                      ) : (
                        <p className="p-3 bg-muted rounded-md flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {user.mobile}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Member Since</Label>
                      <p className="p-3 bg-muted rounded-md flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(user.joinedAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Account Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="w-full justify-center">
                      Active Member
                    </Badge>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/orders">View Orders</a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/order-tracking">Track Order</a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="/contact">Contact Support</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Addresses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Saved Addresses
                </CardTitle>
                <CardDescription>Manage your delivery addresses</CardDescription>
              </CardHeader>
              <CardContent>
                {user.addresses.length > 0 ? (
                  <div className="grid gap-4">
                    {user.addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{address.street}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.area}, {address.city}, {address.state} - {address.pincode}
                            </p>
                            {address.isDefault && (
                              <Badge variant="secondary" className="mt-2">Default</Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No addresses saved yet.</p>
                )}
                <Separator className="my-4" />
                <Button variant="outline">Add New Address</Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;