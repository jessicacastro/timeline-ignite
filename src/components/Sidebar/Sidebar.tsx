import React from 'react'
import { PencilLine } from 'phosphor-react'
import { Avatar } from '../Avatar/Avatar'
import styles from './Sidebar.module.css'

export const Sidebar = ({}) => {
  return (
    <aside className={styles.sidebar}>
      <img 
        className={styles.cover}
        src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=100" 
        alt="Imagem de capa do usuário" />

      <div className={styles.profile}>
        <Avatar src="https://github.com/jessicacastro.png" username="Jessica Castro"/>
        <strong>Jessica Castro</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}