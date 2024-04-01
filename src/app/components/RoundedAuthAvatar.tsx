"use client";

import Image from "next/image";
import React from "react";

interface RoundedAuthAvatarProps {
  src?: string | null | undefined;
  width: number
  height: number
}

const RoundedAuthAvatar: React.FC<RoundedAuthAvatarProps> = ({
  src,
  width,
  height,
}) => {
  return (
    <Image
        className="rounded-full"
        width={width}
        height={height}
        alt="Avatar"
        src={src || "/images/placeholder.jpg"}
    />
  )
}

export default RoundedAuthAvatar;