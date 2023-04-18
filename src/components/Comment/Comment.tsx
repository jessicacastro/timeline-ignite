import React from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from '../Avatar/Avatar'

import styles from './Comment.module.css'

interface Author {
  username: string
  avatar_url: string
}

interface CommentProps {
  content: string;
  author: Author;
  commentId: string;
  likes: number;
  publishedAt: Date;
  onDeleteComment: (commentId: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const Comment = 
  ({ 
    content, 
    onDeleteComment, 
    author, 
    commentId, 
    likes, 
    publishedAt, 
    onLikeComment 
  }: CommentProps) => {
  const publishedAtFormatted = format(publishedAt, "dd 'de' MMMM 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true })

  const handleDeleteComment = () => onDeleteComment(commentId)

  const handleLikeComment = () => onLikeComment(commentId)

  return (
    <div className={styles.comment}>
      <Avatar
        src={author.avatar_url}
        hasBorder={false}
        alt={`Foto de ${author.username}`} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.username}</strong>
              <time 
                title={publishedAtFormatted} 
                dateTime={publishedAt.toISOString()}>
                  {publishedDateRelativeToNow}
              </time>
            </div>

            <button 
              title="Excluir comentário"
              onClick={handleDeleteComment}>
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button 
            onClick={handleLikeComment}>
            <ThumbsUp size={20}/>
            Aplaudir<span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}