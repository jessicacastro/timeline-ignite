import React from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export const Avatar = ({ hasBorder = true, ...htmlElementProps}: AvatarProps) => {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...htmlElementProps} />
  )
}