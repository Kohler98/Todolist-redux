 
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNoteLogout } from "../../../src/store/journal"
import { demoUser } from "../../fixtures/authFixtures"


jest.mock('../../../src/firebase/providers')

describe('pruebas en auth thunks', () => { 
    const dispatch = jest.fn()
    
    beforeEach(()=>jest.clearAllMocks())

    test('debe de invocar el checking credentials',async()=>{
        await checkingAuthentication()()

        expect(dispatch).toHaveBeenLastCalledWith(checkingCredentials())
    })

    test('startGoogleSignIn debe de llamar checking credentials y login - exito', async() => { 
        const loginData = {ok:true,...demoUser}

        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login)
     })
    test('startGoogleSignIn debe de llamar checking credentials y login - error', async() => { 
        const loginData = {ok:false,errorMessage:'Un error en Google'}
        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
        
     })

     test('startLogingWithEmailPasswor debe de llamar checkingCredentials y login -exito', async() => { 
        const loginData = {ok:true,...demoUser}

        const formData = {email:demoUser.email,password:'123456'}

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
      })

      test('startLogout debe de llamar el logout firebase, clearNote y logout ', async() => {
            await startLogout()(dispatch)

            expect(logoutFirebase).toHaveBeenCalled()
            expect(dispatch).toHaveBeenCalledWith(clearNoteLogout())
        })
 })