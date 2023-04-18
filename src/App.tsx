import React from 'react'

import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Post, PostType } from './components/Post/Post'

import styles from './App.module.css'

import './global.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      username: 'Diego Fernandes',
      avatar_url: 'https://github.com/diego3g.png',
      role: 'CTO at @Rocketseat'
    },
    content: [
      {
        id: 'paragraph-post1-1',
        type: 'paragraph',
        text: 'Fala galeraa 👋'
      },
      {
        id: 'paragraph-post1-2',
        type: 'paragraph',
        text: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        id: 'link-post1-1',
        type: 'link',
        text: 'diego.design/doctorcare',
        emoji: '👉'
      }
    ],
    hashtags: ['#novoprojeto', '#nlw', '#rocketseat'],
    comments: [],
    publishedAt: new Date('2023-03-01 20:00:00')
  },
  {
    id: 2,
    author: {
      username: 'Mayk Brito',
      avatar_url: 'https://github.com/maykbrito.png',
      role: 'Web Developer'
    },
    content: [
      {
        id: 'paragraph-post2-1',
        type: 'paragraph',
        text: 'Fala pessoal 👋'
      },
      {
        id: 'paragraph-post2-2',
        type: 'paragraph',
        text: 'Finalmente finalizei meu novo site/portfólio. Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻'
      },
      {
        id: 'link-post2-1',
        type: 'link',
        text: 'maykbrito.com.br',
        emoji: '👉'
      }
    ],
    hashtags: ['#novosite', '#webdev', '#portifolio'],
    comments: [],
    publishedAt: new Date('2023-03-02 00:00:00')
  }
]

export const App = () => {
  return (
    <React.Fragment>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => (
              <Post 
                key={post.id} 
                post={post} />
            ))
          }
        </main>
      </div>
    </React.Fragment>
  )
}
