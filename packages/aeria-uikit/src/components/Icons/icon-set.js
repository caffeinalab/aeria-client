/* eslint-disable react/no-multi-comp */

import React from 'react'

import StyledIcon from './StyledIcon'

const Delete = props => (
  <StyledIcon {...props} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.4 3.9h-2.2V2.5c0-.3-.2-.5-.5-.5H7.3c-.2 0-.5.2-.5.5v1.4H4.6c-.6 0-1.1.5-1.1 1.1v1.8h1V17c0 .5.5 1 1.1 1h8.8c.6 0 1.1-.5 1.1-1.1V6.8h1V5c0-.6-.5-1.1-1.1-1.1zM7.8 3h4.3v.9H7.8V3zm6.7 13.9c0 .1 0 .1 0 0l-8.9.1c-.1 0-.1 0-.1-.1V6.8h9v10.1zm1-11.1h-11V5c0-.1 0-.1.1-.1h10.8c.1 0 .1 0 .1.1v.8z"/>
    <path d="M11.9 7.9h1v8.2h-1V7.9zm-2.4 0h1v8.2h-1V7.9zm-2.3 0h1v8.2h-1V7.9z"/>
  </StyledIcon>
)

const Edit = props => (
  <StyledIcon {...props} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4 17H2.6c-.4 0-.6.2-.6.5s.3.5.6.5h14.9c.3 0 .6-.2.6-.5s-.4-.5-.7-.5zM2 11.8v2.7c0 .1 0 .3.2.4 0 0 .2.1.3.1H5c.1 0 .3-.1.4-.2l8.5-9.2c.2-.2.2-.6 0-.8l-2.4-2.7c-.2-.2-.5-.2-.7 0L9 4l-6.8 7.3c-.1.2-.2.3-.2.5zm9-8.4l1.7 1.9-1 1L10 4.4c.1 0 1-1 1-1zM3.1 12l6.3-6.8L11 7.1l-6.3 6.8H3c.1-.1.1-1.9.1-1.9z"/>
  </StyledIcon>
)

const Add = props => (
  <StyledIcon {...props} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.4 3.3h1.2v13.4H9.4V3.3z"/>
    <path d="M16.8 9.4v1.2H3.2V9.4h13.6z"/>
  </StyledIcon>
)

const Close = props => (
  <StyledIcon {...props} width="20" height="20" transform="rotate(45)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.4 3.3h1.2v13.4H9.4V3.3z"/>
    <path d="M16.8 9.4v1.2H3.2V9.4h13.6z"/>
  </StyledIcon>
)

const Back = props => (
  <StyledIcon {...props} width="20" height="20" transform="rotate(45)" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.4 3.3h1.2v13.4H9.4V3.3z"/>
    <path d="M16.8 9.4v1.2H3.2V9.4h13.6z"/>
  </StyledIcon>
)

const Show = props => (
  <StyledIcon {...props} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5.06c-3.17 0-6 1.73-8.16 4.55a.66.66 0 0 0 0 .78c2.12 2.82 5 4.55 8.16 4.55s6-1.73 8.16-4.55a.66.66 0 0 0 0-.78C16 6.79 13.17 5.06 10 5.06zm.23 8.42a3.49 3.49 0 1 1 3.25-3.25 3.49 3.49 0 0 1-3.25 3.25zm-.11-1.61a1.88 1.88 0 1 1 1.75-1.75 1.87 1.87 0 0 1-1.75 1.75z"/>
  </StyledIcon>
)

const Hidden = props => (
  <StyledIcon {...props} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.21 8.14l1.65 1.65a1.86 1.86 0 0 0-1.65-1.65z"/>
    <path d="M18.16 9.61C16 6.79 13.17 5.06 10 5.06a8.67 8.67 0 0 0-2.49.38l1.3 1.3a3.4 3.4 0 0 1 1-.22 3.49 3.49 0 0 1 3.71 3.71 3.4 3.4 0 0 1-.22 1l2 2a12.74 12.74 0 0 0 2.88-2.81.66.66 0 0 0-.02-.81zM3.87 4.9l1.5 1.5a12.24 12.24 0 0 0-3.53 3.2.66.66 0 0 0 0 .78c2.12 2.82 5 4.55 8.16 4.55a8.69 8.69 0 0 0 3.26-.65l2 2 .85-.85L4.71 4.05zm6.36 8.58a3.49 3.49 0 0 1-3.71-3.71 3.37 3.37 0 0 1 .57-1.65L8.27 9.3a1.8 1.8 0 0 0-.14.57 1.87 1.87 0 0 0 2 2 1.8 1.8 0 0 0 .57-.14l1.18 1.18a3.37 3.37 0 0 1-1.65.57z"/>
  </StyledIcon>
)

export default {
  Delete,
  Edit,
  Add,
  Close,
  Back,
  Show,
  Hidden,
}
