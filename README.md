# BackEnd-Store-TS-TDD-SOLID-estudo

<p>#Tecnologias:</p>
  NodeJS
  Typescript
  Jest
  Amazon S3
  Multer
  Express
  
  
Este projeto é um cadastro de produtos, feito para praticar typescript e conceitos de TDD, clean Architeture and SOLID

photo:
  NewPhoto: Add a new Photo
    method: POST
    url: /photo
    multiPart:
      photo: file
    response:{
      id: number
      url: string
    }
  
  getPhoto: get Specific Photo
    method: GET
    url: /photo/:id
    response:{
      id: number
      url: string
    }
  
  listPhotos: Get a of all Photos
    method: GET
    url: /photos
    response:[
      {
        id: number
        url: string
      }
    ]
  deletePhoto: delete a specfic Photo
    method: DELETE
    url: /photo/:id
    response:{
      true
    }

Category:
  addCategory:
    method: POST
    url: /categoria
    JSON:{
      "name: string,
      "photo: number ----photo id
    }
    response:{
      id: number
      name: string
      photo:{
        id: number
        url: string
      }
    }
  
  listCategory:
    method: GET
    url: /categorias
    return:{
      [
        {
          id: number
          name: string
          photo:{
            id: number
            url: string
          }
        }
      ]
    }
    updateCategoria
    method: PUT
    url: /categoria/:id
    JSON:{
      "name": string
      "photo: number ----photo id
    }    
    response:{
      id: number
      name: string
      photo:{
        id: number
        url: string
      }
    }

  deleteCategory
    method: DELETE
    url: /categoria/:id
    response: boolean

Product
  newProduct
    method: POST
    url: /produto
    JSON:{
      "name": string,
      "description: string,
      "resume": string
      "preco": number
      photos: [
        number -----ids of photos
      ] 
      categoria: number ----- id of category
    }
    response:{
      id: number,
      name: string
      preco: number
      resume: string
      photos:[
        {
          id: number
          url: string
        }
      ]
      categoria:{
        id: number,
        name: string
        photo:{
          id: 1
          url: string
        }
      }
    }
  
  getProduto
    method: GET
    url: /produtos/:id
    response:{
      id: number,
      name: string
      preco: number
      resume: string
      photos:[
        {
          id: number
          url: string
        }
      ]
      categoria:{
        id: number,
        name: string
        photo:{
          id: 1
          url: string
        }
      }
    }
  
  listProdutos
    method: GET
    url: /produtos/:page
    response:{
      [
        {
          id: number,
          name: string
          preco: number
          resume: string
          photos:[
            {
              id: number
              url: string
            }
          ]
          categoria:{
            id: number,
            name: string
            photo:{
              id: 1
              url: string
            }
          }
        }
      ]
    }

  ListProducts of a specific Categoria
    method: GET
    url: /categoria/produto/:page
    JSON:{
      "categoria": number
    }
    response:{
      [
        {
          id: number,
          name: string
          preco: number
          resume: string
          photos:[
            {
              id: number
              url: string
            }
          ]
          categoria:{
            id: number,
            name: string
            photo:{
              id: 1
              url: string
            }
          }
        }
      ]
    }
  
  Update Product
    method: PUT
    url: /produto/:id
    JSON:
    {
      "name": string,
      "description: string,
      "resume": string
      "preco": number
      photos: [
        number -----ids of photos
      ] 
      categoria: number ----- id of category
    }
    response:{
      id: number,
      name: string
      preco: number
      resume: string
      photos:[
        {
          id: number
          url: string
        }
      ]
      categoria:{
        id: number,
        name: string
        photo:{
          id: 1
          url: string
        }
      }
    }

  delete Produto
    method: DELETE
    url: /produto/:id
    response: boolean
    





 

