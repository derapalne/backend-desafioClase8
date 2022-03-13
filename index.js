const ProductosAPI = require("./producto");
const express = require("express");
const { Router } = express;

const app = express();
const router = Router();
const productosApi = new ProductosAPI();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/api", express.static(__dirname + "/public"));

const server = app.listen(PORT, () => console.log(`Server escuchando por el puerto ${PORT}`));
server.on("error", (err) => console.log(`Error en el servidor: ${err}`));

productosApi.addProducto({
    title: "Goma",
    price: 50,
    thumbnail: "/abc.png",
});
productosApi.addProducto({
    title: "Lapiz",
    price: 58,
    thumbnail: "/cde.png",
});
productosApi.addProducto({
    title: "Regla",
    price: 88,
    thumbnail: "/efg.png",
});
productosApi.addProducto({
    title: "Collar",
    price: 30,
    thumbnail: "/ghi.png",
});

router.get("/productos", (req, res) => {
    res.json(productosApi.getAll());
});

router.get("/productos/:id", (req, res) => {
    res.json(productosApi.getProductoById(req.params.id));
});

router.post("/productos", (req, res) => {
    const id = productosApi.addProducto(req.body);
    if (isNaN(id)) {
        res.send(id);
    } else {
        res.json([{"id": id},productosApi.getProductoById(id)]);
    }
});

router.put("/productos/:id", (req, res) => {
    const id = req.params.id;
    const productoNuevo = req.body;
    productosApi.setProductoById(id, productoNuevo);
    res.json(productosApi.getProductoById(id));
});

router.delete("/productos/:id", (req, res) => {
    const id = req.params.id;
    productosApi.deleteProductoById(id);
    res.json(productosApi.getAll);
});

