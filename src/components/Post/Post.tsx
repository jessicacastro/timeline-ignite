import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { format, formatDistanceToNow } from 'date-fns';

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'

import styles from './Post.module.css'

interface Author {
  username: string
  avatar_url: string
  role: string
}

interface Content {
  id: string
  type: 'paragraph' | 'link'
  text: string
  emoji?: string
}

interface Comment {
  id: string
  content: string
  author: Author;
  publishedAt: Date;
  likes: number
}

export interface PostType {
  id: number;
  author: Author;
  content: Content[];
  hashtags: string[];
  comments: Comment[];
  publishedAt: Date;
}

interface PostProps {
  post: PostType
}

export const Post = ({ post }: PostProps) => {
  const [comments, setComments] = useState([
    {
      id: 'comment-1',
      content: 'Muito massa esse projeto! Parabéns! 🚀',
      author: {
        username: 'Mayk Brito',
        avatar_url: 'https://github.com/maykbrito.png',
        role: 'Web Developer'
      },
      publishedAt: new Date(),
      likes: 10
    }
  ])
  const [newComment, setNewComment] = useState('')

  const publishedAtFormatted = format(post.publishedAt, "dd 'de' MMMM 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true })

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault() // handle to prevent page reload

    if (!newComment) return

    const newCommentObject = {
      id: `comment-${comments.length + 1}`,
      content: newComment,
      author: {
        username: 'Diego Fernandes',
        avatar_url: 'https://www.github.com/diego3g.png',
        role: 'CTO at @Rocketseat'
      },
      publishedAt: new Date(),
      likes: 0
    }

    setComments([...comments, newCommentObject])
    setNewComment('')
  }

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value)
    event.target.setCustomValidity('')
  }

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('O comentário não pode ser vazio!')

  }

  const deleteComment = (commentId: string) => {
    const commentsWithoutDeletedOne = comments.filter((item) => item.id !== commentId)
    setComments(commentsWithoutDeletedOne)
  }

  const likeComment = (commentId: string) => {
    const commentsWithLikedOne = comments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          likes: item.likes + 1
        }
      }
      
      return item
    })

    setComments(commentsWithLikedOne)
  }

  const newCommentIsEmpty = !newComment

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatar_url} />

          <div className={styles.authorInfo}>
            <strong>{post.author.username}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedAtFormatted} dateTime={post.publishedAt.toISOString()}>Publicado {publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          post.content.map((item) => (
            item.type === 'paragraph' 
            ? <p key={item.id}>{item.text}</p>
            : <p key={item.id}>
                <span>
                  {item.emoji}
                </span>
                <a href={item.text}>{item.text}</a>
              </p>
          ))
        }
        <p>
          {
            post.hashtags.map(hashtag => (
              <a key={hashtag} href="#">{hashtag} </a>
            ))
          }
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <h4>Deixe seu feedback</h4>

        <textarea 
          name='comment'
          placeholder='Deixe seu comentário!'
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button 
            type='submit'
            disabled={newCommentIsEmpty}>Publicar</button>
        </footer>
      </form>

      { comments && 
        <div className={styles.comments}>
          {
            comments.map((comment) => (
              <Comment
                key={comment.id}
                commentId={comment.id}
                author={comment.author}
                content={comment.content}
                publishedAt={comment.publishedAt} 
                likes={comment.likes}
                onDeleteComment={deleteComment}
                onLikeComment={likeComment} />
            ))
          }
        </div> 
      }
    </article>
  )
}