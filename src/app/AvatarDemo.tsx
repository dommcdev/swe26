"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage
          src="https://i.pravatar.cc/150?img=1"
          alt="User 1"
        />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage
          src="https://i.pravatar.cc/150?img=2"
          alt="User 2"
        />
        <AvatarFallback>U2</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>

      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=3" />
          <AvatarFallback>U3</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=4" />
          <AvatarFallback>U4</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=5" />
          <AvatarFallback>U5</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}