import { useMemo } from 'react'
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
const formData = {
    email:'victor@google.com',
    password:'1234567'
  }
export const LoginPage = () => {

  const {status,errorMessage} =useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const {email,password,onInputChange,formState} = useForm(formData)

  const isAuthenticated = useMemo(()=> status === 'authenticated',[status])
  const onSubmit = (e)=>{
    e.preventDefault()
    // esta no es la accion a despachar
  
    dispatch(startLoginWithEmailPassword(formState))
  }
  const onGoogleSignIn = ()=>{
 
    dispatch(startGoogleSignIn())
  }
  return (
    <AuthLayout title='Login'>
        <form 
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn'
        >
            <Grid container>
                <Grid item xs={12} sx={{mt:2}}>
                    <TextField 
                    label="Correo" 
                    type='email' 
                    name='email'
                    value={email}
                    onChange={onInputChange}
                    placeholder='correo@google.com'
                    fullWidth
                    /> 
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{mt:1}}>
                    <TextField 
                    label="Contraseña" 
                    type='password' 
                    name='password'
                    value={password}
                    onChange={onInputChange}
                    placeholder='Contraseña'
                    fullWidth
                    /> 
                </Grid>

                <Grid container
                spacing={2}
                sx={{mt:2}}
                >
                    <Grid item 
                    xs={12}
                    display={!!errorMessage ? '' : 'none'}
                    sx={{mt:1,mb:1}}
                    >
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                        disabled={isAuthenticated}
                        type='submit'
                        variant='contained'
                        fullWidth
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                        disabled={isAuthenticated}
                        variant='contained'
                        fullWidth
                        onClick={onGoogleSignIn}
                        >
                            <Google/>
                            <Typography sx={{ml:1}}>
                                Google
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container 
                direction={"row"}
                justifyContent={"end"}
                sx={{mt:1.5}}
                >
                    <Link component={RouterLink} color={"inherit"} to="/auth/register">
                    Crear una cuenta
                    </Link>
                </Grid>
            </Grid>
        </form>
 

    </AuthLayout>
  )
}
