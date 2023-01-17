const fs = require('fs')

class ProductManager {

    constructor() {
        this.path = './products.json'
    }

    async addProduct(product) {

        try {
            //trae todos los productos del archivo
            const productsFile = await this.getProducts()

            let id = 1;

            //Busca el id más alto guardado y lo incrementa en uno
            productsFile.forEach(product => {
                if (product.id > id) {
                    id = product.id
                }
            });
            product.id = id + 1
            /////////////////////////////

            //Agrega al array y guarda el archivo
            productsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
            return 'Producto agregado correctamente'

        } catch (error) {
            console.log(error)
        }

    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, 'utf-8')
                const productsJS = JSON.parse(products)

                return productsJS

            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const productsFile = await this.getProducts()
            const product = productsFile.find((product) => product.id === id)

            if (product===undefined){
                return 'No se encontró un producto con ese ID'
            }else{
                return product
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, campo, valor) {
        try {
            const productsFile = await this.getProducts()
            let valido = false;

            //Busca el index según el id
            let index = productsFile.map(producto => producto.id).indexOf(id)

            if(index != -1){
                //Comprueba que el campo ingresado exista y asgina el valor
                switch (campo) {
                    case 'title':
                        productsFile[index].title = valor
                        valido = true
                        break
                    case 'description':
                        productsFile[index].description = valor
                        valido = true
                        break
                    case 'price':
                        productsFile[index].price = valor
                        valido = true
                        break
                    case 'thumbnail':
                        productsFile[index].thumbnail = valor
                        valido = true
                        break
                    case 'code':
                        productsFile[index].code = valor
                        valido = true
                        break
                    case 'stock':
                        productsFile[index].stock = valor
                        valido = true
                        break
                    default:
                        valido = false
                        break
                }

                if (valido == true) {
                    //Guarda los cambios en el archivos
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
                    return 'Producto actualizado correctamente'
                }else{
                    return `No hay un campo con el nombre: ${campo}`
                }

            } else {
                return `No hay un producto con el id: ${id}`
            }         

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {

        const productsFile = await this.getProducts()

        //Comprueba que hay un producto con ese ID
        const existe = productsFile.find(product => product.id == id)

        if (existe != undefined){
            //Crea un arreglo nuevo sin el producto que se quiere eliminar
            const newProductsFile = productsFile.filter(product => product.id != id);

            //Guarda los cambios en el archivos
            await fs.promises.writeFile(this.path, JSON.stringify(newProductsFile))
            return 'Producto eliminador correctamente'
        } else {
            return 'No existe un producto con ese ID'
        }      

    }

}

/////////////////////////////////////////////////////////////////////////////////

const producto1 = {
    id: '',
    title: 'cinturon',
    description: 'cinturon de cuero',
    price: 300,
    thumbnail: './img/cinturon.png',
    code: 159,
    stock: 150
}

const manager = new ProductManager()

async function prueba() {

    // const agregarProducto = await manager.addProduct(producto1)
    // console.log(agregarProducto)

    // const obtenerProductos = await manager.getProducts()
    // console.log(obtenerProductos)

    // const getProductById = await manager.getProductById(4);
    // console.log(getProductById);

    const updateProduct = await manager.updateProduct(4,'price',350)
    console.log(updateProduct)

    // const deleteProduct = await manager.deleteProduct(3)
    // console.log(deleteProduct)
}

prueba()