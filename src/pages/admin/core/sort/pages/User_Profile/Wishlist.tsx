import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import WishlistCard from "@/components/wishlist/WishlistCard";
import WishlistItemCard from "@/components/wishlist/WishlistItemCard";
import { ProtectedRoute } from "@/features/auth";

const Wishlist = () => {
  const [wishlists, setWishlists] = useState<any[]>([]);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [selectedWishlist, setSelectedWishlist] = useState<string | null>(null);
  const session = useSession();

  useEffect(() => {
    const fetchWishlists = async () => {
      const { data } = await supabase
        .from("wishlists")
        .select("*")
        .eq("user_id", session?.user?.id);
      if (data) {
        setWishlists(data);
      }
    };

    if (session) {
      fetchWishlists();
    }
  }, [session]);

  const handleCreateWishlist = async () => {
    if (!newWishlistName) return;

    const { data, error } = await supabase
      .from("wishlists")
      .insert([{ name: newWishlistName, user_id: session?.user?.id }])
      .select();

    if (error) {
      console.error("Error creating wishlist:", error);
    } else if (data) {
      setWishlists([...wishlists, data[0]]);
      setNewWishlistName("");
    }
  };

  const handleSelectWishlist = (id: string) => {
    setSelectedWishlist(id);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">My Wishlists</h1>
        <div className="mt-4">
          <Dialog>
            <DialogTrigger>
              <Button>
                <Plus className="mr-2" />
                Create New Wishlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col space-y-4">
                <Label htmlFor="wishlist-name">Wishlist Name</Label>
                <Input
                  id="wishlist-name"
                  value={newWishlistName}
                  onChange={(e) => setNewWishlistName(e.target.value)}
                  placeholder="Enter wishlist name"
                />
                <Button onClick={handleCreateWishlist}>Create Wishlist</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlists.map((wishlist) => (
            <WishlistCard 
              key={wishlist.id} 
              wishlist={wishlist} 
              onSelect={handleSelectWishlist}
            />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Wishlist;