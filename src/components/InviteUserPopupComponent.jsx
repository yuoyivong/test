"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const initialInvitedUsers = [
  { id: 1, name: "Kroem Vandy", email: "kroemvandy@example.com", avatar: "/images/profile/dy.jpg" },
];

const allUsers = [
  { id: 2, name: "Junior Garcia", email: "junior.garcia@example.com", avatar: "/images/profile/dy.jpg" },
  { id: 3, name: "John Deo", email: "john.deo@example.com", avatar: "/images/profile/jd.jpg" },
  { id: 4, name: "Joh De", email: "john@example.com", avatar: "/images/profile/jd.jpg" },
];

const InviteUserPopupComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invitedUsers, setInvitedUsers] = useState(initialInvitedUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle inviting the selected user
  const handleInvite = () => {
    if (selectedUser && !invitedUsers.some((u) => u.id === selectedUser.id)) {
      setInvitedUsers([...invitedUsers, selectedUser]); // Add user to the invited list
      setSelectedUser(null); // Clear the selected user after inviting
    }
  };

  // Handle selecting a user
  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user
  };

  // Handle removing an invited user
  const handleRemove = (userId) => {
    setInvitedUsers(invitedUsers.filter((user) => user.id !== userId)); // Remove user from invited list
  };

  // Filter users based on the search term
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Invite User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl !rounded-3xl">
          <DialogHeader>
            <DialogTitle className="md:text-xl lg:text-[20px]">Invite User</DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <hr />
          </div>

          {/* Search bar and invite button aligned horizontally */}
          <div className="flex items-center space-x-2 mt-4">
            <div className="relative flex-1">
              <div className="absolute px-3 flex py-3">
                <SearchNormal1 size="20" color="#8c95a5" />
              </div>
              <Input
                className="w-full h-11 text-base border-none rounded-xl bg-primaryCherUi focus-visible:ring-0 pl-12 text-blackUi"
                placeholder="Search user for invitation"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              type="submit"
              className="h-11 text-base rounded-xl bg-gray-700"
              onClick={handleInvite}
              disabled={!selectedUser} // Disable invite button if no user is selected
            >
              Invite
            </Button>
          </div>

          {/* Filtered users for selection */}
          <div className="mt-4">
            <h4 className="text-sm">Select a User</h4>
            <div className="mt-4 space-y-2 h-36 overflow-y-auto no-scrollbar">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  // Select user when clicked
                  <div
                    key={user.id}
                    className={`bg-[#f4f6fa] p-2 rounded-xl flex justify-between cursor-pointer ${
                      selectedUser?.id === user.id ? 'border-2 border-blue-500' : ''
                    }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="flex items-center">
                      <Avatar className="relative w-[34px] h-[34px]">
                        <AvatarImage className="h-10" src={user.avatar} alt="profile" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="px-3">
                        <h3 className="text-base font-semibold text-gray-700">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No users found</p>
              )}
            </div>
          </div>

          {/* Already invited users */}
         <div className="mt-1">
         <h4 className="text-sm">Who has access</h4>
          <div className="mt-4 h-40 overflow-y-auto no-scrollbar">
              {invitedUsers.map((user) => (
                <div key={user.id} className="py-1">
                  <div className="bg-[#f4f6fa] p-2 rounded-xl flex justify-between">
                    <div className="px-2">
                    <div className="flex items-center">
                      <Avatar className="relative w-[34px] h-[34px]">
                        <AvatarImage className="h-10" src={user.avatar} alt="profile" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="px-3">
                        <h3 className="text-base font-semibold text-gray-700">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    </div>
                    <Button
                      variant="link"
                      className="text-red-600 text-base font-medium"
                      onClick={() => handleRemove(user.id)} // Remove user from invited list
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
          </div>
         </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default InviteUserPopupComponent;
