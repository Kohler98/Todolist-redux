import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { memo, useMemo } from 'react'
import { setActiveNote } from '../../store/journal'
import { useDispatch } from 'react-redux'

export const SideBarItem = memo(({note}) => {

    const dispatch = useDispatch()
    const onClickNote = () =>{
        dispatch(setActiveNote(note))
    }
    const newTitle = useMemo(()=>{
        return note.title.length > 17
        ? note.title.substring(0,17) + '...'
        : note.title
    },[note.title])
  return (
    <ListItem key={note.id} disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={note.body}/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
})
