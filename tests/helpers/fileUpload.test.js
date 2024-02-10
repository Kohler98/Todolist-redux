import { fileUpload } from "../../src/helpers/fileUpload"

describe('Pruebas en fileUpload',()=>{
    test('debe de subir un archivo a cloudinary', async() => { 
        const imageUrl = ""
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File((blob,'foto.jpg'))
        const url = await fileUpload(file)

        expect(typeof url).toBe("string")
     })
})