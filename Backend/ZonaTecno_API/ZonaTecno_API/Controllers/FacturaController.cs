using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ZonaTecno_API.Objects;

namespace ZonaTecno_API.Controllers
{
    public class FacturaController : ApiController
    {
        // GET: api/Factura
        public IEnumerable<Factura> Get()
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var facturas = (from f in db.FACTURA
                                select new Factura
                                {
                                    id = f.id,
                                    id_cliente = (int)f.id_cliente,
                                    fecha = (DateTime)f.fecha
                                }).ToList();
                return facturas;
            }
        }

        // GET: api/Factura/5
        public Factura Get(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var factura = (from f in db.FACTURA
                               where f.id == id
                               select new Factura
                               {
                                   id = f.id,
                                   id_cliente = (int)f.id_cliente,
                                   fecha = (DateTime)f.fecha
                               }).FirstOrDefault();
                return factura;
            }
        }

        // POST: api/Factura
        public void Post([FromBody] Factura factura)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var nuevaFactura = new Models.FACTURA
                {
                    id_cliente = factura.id_cliente,
                    fecha = factura.fecha
                };

                db.FACTURA.Add(nuevaFactura);
                db.SaveChanges();
            }
        }

        // PUT: api/Factura/5
        public void Put(int id, [FromBody] Factura factura)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var facturaExistente = db.FACTURA.Find(id);

                if (facturaExistente != null)
                {
                    facturaExistente.id_cliente = factura.id_cliente;
                    facturaExistente.fecha = factura.fecha;

                    db.SaveChanges();
                }
            }
        }

        // DELETE: api/Factura/5
        public void Delete(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var factura = db.FACTURA.Find(id);

                if (factura != null)
                {
                    db.FACTURA.Remove(factura);
                    db.SaveChanges();
                }
            }
        }
    }

}
