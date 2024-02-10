import { DeleteOutline, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
 

export const NoteView = () => {
    const dispatch = useDispatch()
    const {active:note,messageSaved,isSaving} = useSelector(state => state.journal)
   
    const {title,body,date,formState, onInputChange} = useForm(note)
 
    const dateString = useMemo(()=>{
        const newDate = new Date(21312)

        return newDate.toUTCString()
    },[ ])
    
    useEffect(()=>{
        dispatch(setActiveNote(formState))
    },[formState])

    const fileInputRef = useRef()
    useEffect(()=>{
        if(messageSaved.length >0){
            Swal.fire('Nota actualizada',messageSaved,'success')
        }
    })
    const onSaveNote = () =>{
        dispatch(startSaveNote())
    }
    const onFileInputChange = ({target})=>{
        if(target.files == 0) return
        dispatch(startUploadingFiles(target.files))
      
    }
    const onDelete = () =>{
        dispatch(startDeletingNote())
    }
    return (
        <Grid container 
        className='animate__animated animate__fadeIn'
        direction={'row'}
        justifyContent={'space-between'}
        sx={{mb:1,mt:5}}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight={'light'}>{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}

                    onClick={()=> fileInputRef.current.click()}
                    />
                <Button color="primary" sx={{padding:2}} onClick={onSaveNote}>
                    <SaveOutlined sx={{fontSize:30,mr:1}}/>
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Titulo'
                    name='title'
                    value={title}
                    onChange={onInputChange}
                    sx={{border:'none',mb:1}}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="¿Que sucedio el dia de hoy"
                    name='body'
                    value={body}
                    onChange={onInputChange}
                    minRows={5}
                />
            </Grid>

            <Grid container justifyContent={"end"}>
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>
            {/* imagen gallery */}
            <ImageGallery/>
        </Grid>
  )
}
