using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ZonaTecno_API.Objects;

namespace ZonaTecno_API.Controllers
{
    public class ProductoController : ApiController
    {
        // GET: api/Producto
        public IEnumerable<Producto> Get()
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var productos = (from p in db.PRODUCTO
                                 select new Producto
                                 {
                                     id = p.id,
                                     nombre = p.nombre,
                                     precio = (int)p.precio,
                                     descripcion = p.descripcion
                                 }).ToList();
                return productos;
            }
        }

        // GET: api/Producto/5
        public Producto Get(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var producto = (from p in db.PRODUCTO
                                where p.id == id
                                select new Producto
                                {
                                    id = p.id,
                                    nombre = p.nombre,
                                    precio = (int)p.precio,
                                    descripcion = p.descripcion
                                }).FirstOrDefault();
                return producto;
            }
        }

        // POST: api/Producto
        public void Post([FromBody] Producto producto)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var nuevoProducto = new Models.PRODUCTO
                {
                    nombre = producto.nombre,
                    precio = producto.precio,
                    descripcion = producto.descripcion
                };

                db.PRODUCTO.Add(nuevoProducto);
                db.SaveChanges();
            }
        }

        // PUT: api/Producto/5
        public void Put(int id, [FromBody] Producto producto)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var productoExistente = db.PRODUCTO.Find(id);

                if (productoExistente != null)
                {
                    productoExistente.nombre = producto.nombre;
                    productoExistente.precio = producto.precio;
                    productoExistente.descripcion = producto.descripcion;

                    db.SaveChanges();
                }
            }
        }

        // DELETE: api/Producto/5
        public void Delete(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var producto = db.PRODUCTO.Find(id);

                if (producto != null)
                {
                    db.PRODUCTO.Remove(producto);
                    db.SaveChanges();
                }
            }
        }
    }

}
