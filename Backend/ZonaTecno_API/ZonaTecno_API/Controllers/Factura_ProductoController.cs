using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using ZonaTecno_API.Objects;

namespace ZonaTecno_API.Controllers
{
    public class Factura_ProductoController : ApiController
    {
        // GET: api/FacturaProducto
        public IEnumerable<Factura_Producto> Get()
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var facturaProductos = (from fp in db.FACTURA_PRODUCTO
                                        select new Factura_Producto
                                        {
                                            id_factura = (int)fp.id_factura,
                                            id_producto = (int)fp.id_producto,
                                            cantidad = (int)fp.cantidad
                                        }).ToList();
                return facturaProductos;
            }
        }

        // GET: api/FacturaProducto/5
        public Factura_Producto Get(int id_factura, int id_producto)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var facturaProducto = (from fp in db.FACTURA_PRODUCTO
                                       where fp.id_factura == id_factura && fp.id_producto == id_producto
                                       select new Factura_Producto
                                       {
                                           id_factura = (int)fp.id_factura,
                                           id_producto = (int)fp.id_producto,
                                           cantidad = (int)fp.cantidad
                                       }).FirstOrDefault();
                return facturaProducto;
            }
        }

        // POST: api/FacturaProducto
        public void Post([FromBody] Factura_Producto facturaProducto)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var nuevoFacturaProducto = new Models.FACTURA_PRODUCTO
                {
                    id_factura = facturaProducto.id_factura,
                    id_producto = facturaProducto.id_producto,
                    cantidad = facturaProducto.cantidad
                };

                db.FACTURA_PRODUCTO.Add(nuevoFacturaProducto);
                db.SaveChanges();
            }
        }

        // PUT: api/FacturaProducto/5
        public void Put(int id_factura, int id_producto, [FromBody] Factura_Producto facturaProducto)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var facturaProductoExistente = db.FACTURA_PRODUCTO.FirstOrDefault(fp => fp.id_factura == id_factura && fp.id_producto == id_producto);

                if (facturaProductoExistente != null)
                {
                    facturaProductoExistente.cantidad = facturaProducto.cantidad;

                    db.SaveChanges();
                }
            }
        }

        // DELETE: api/FacturaProducto/5
        public void Delete(int id_factura, int id_producto)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var facturaProducto = db.FACTURA_PRODUCTO.FirstOrDefault(fp => fp.id_factura == id_factura && fp.id_producto == id_producto);

                if (facturaProducto != null)
                {
                    db.FACTURA_PRODUCTO.Remove(facturaProducto);
                    db.SaveChanges();
                }
            }
        }
    }
}
