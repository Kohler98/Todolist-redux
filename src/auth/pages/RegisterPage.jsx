import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'


const formValidations = {
    email: [(value)=> value.includes("@"),"El correo debe de tener un @"],
    password: [(value)=> value.length>=6,"La contraseña debe de tener mas de 6 letras"],
    displayName:[(value)=>value.length>=1,"El nombre es obligatorio"]
}

const formData = {
    email:'victor@google.com',
    password:'1234567',
    displayName:'Victor leon'
  }
export const RegisterPage = () => {


    const dispatch = useDispatch()
    const [formSubmitted,setFormSubmitted] = useState(false)
    const {displayName,email,password,onInputChange,formState
        ,isFormValid,displayNameValid,emailValid, passwordValid} = useForm(formData,formValidations)
        
    const {status,errorMessage} = useSelector(state => state.auth)
    const isCheckingAuthentication = useMemo(()=> status === 'checking',[status])
 
    const onSubmit = (e) =>{
        e.preventDefault()
        setFormSubmitted(true)
        if(!isFormValid) return 
        dispatch(startCreatingUserWithEmailPassword(formState))
 
    }
    return (
    <AuthLayout title='Create an Account'>
        <form 
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn '

        >
            <Grid container>
                <Grid item xs={12} sx={{mt:2}}>
                    <TextField 
                    label="Nombre completo" 
                    type='text' 
                    placeholder='Tu nombre'
                    name='displayName'
                    value={displayName}
                    onChange={onInputChange}
                    error={!!displayNameValid && formSubmitted}
                    helperText={displayNameValid}
                    fullWidth
                    /> 
                </Grid>
            </Grid>
 
            <Grid container>
                <Grid item xs={12} sx={{mt:2}}>
                    <TextField 
                    label="Correo" 
                    type='email' 
                    placeholder='correo@google.com'
                    fullWidth
                    name='email'
                    value={email}
                    onChange={onInputChange}
                    error={!!emailValid  && formSubmitted}
                    helperText={emailValid}
                    /> 
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{mt:1}}>
                    <TextField 
                    label="Contraseña" 
                    type='password' 
                    placeholder='Contraseña'
                    fullWidth
                    name='password'
                    value={password}
                    onChange={onInputChange}
                    error={!!passwordValid  && formSubmitted}
                    helperText={passwordValid}
                    /> 
                </Grid>

                <Grid container
                spacing={2}
                sx={{mt:2}}
                
                >
                    <Grid item 
                    xs={12}
                    display={!!errorMessage ? '' : 'none'}
                    >
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                        disabled={isCheckingAuthentication}
                        variant='contained'
                        fullWidth
                        type='submit'
                        >
                            Create an Account
                        </Button>
                    </Grid>
 
                </Grid>

                <Grid container 
                direction={"row"}
                justifyContent={"end"}
                sx={{mt:1.5}}
                >
                  <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
                    <Link component={RouterLink} color={"inherit"} to="/auth/login">
                    Ingresar
                    </Link>
                </Grid>
            </Grid>
        </form>
 

    </AuthLayout>
  )
}
