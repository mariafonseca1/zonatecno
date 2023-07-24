using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ZonaTecno_API.Objects;

namespace ZonaTecno_API.Controllers
{
    public class ClienteController : ApiController
    {
        // GET: api/Cliente
        public IEnumerable<Cliente> Get()
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var clientes = (from c in db.CLIENTE
                                select new Cliente
                                {
                                    id = c.id,
                                    retira = c.retira,
                                    direccion = c.direccion
                                }).ToList();
                return clientes;
            }
        }

        // GET: api/Cliente/5
        public Cliente Get(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var cliente = (from c in db.CLIENTE
                               where c.id == id
                               select new Cliente
                               {
                                   id = c.id,
                                   retira = c.retira,
                                   direccion = c.direccion
                               }).FirstOrDefault();
                return cliente;
            }
        }

        // POST: api/Cliente
        public void Post([FromBody] Cliente cliente)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var nuevoCliente = new Models.CLIENTE
                {
                    retira = cliente.retira,
                    direccion = cliente.direccion
                };

                db.CLIENTE.Add(nuevoCliente);
                db.SaveChanges();
            }
        }

        // PUT: api/Cliente/5
        public void Put(int id, [FromBody] Cliente cliente)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var clienteExistente = db.CLIENTE.Find(id);

                if (clienteExistente != null)
                {
                    clienteExistente.retira = cliente.retira;
                    clienteExistente.direccion = cliente.direccion;

                    db.SaveChanges();
                }
            }
        }

        // DELETE: api/Cliente/5
        public void Delete(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var cliente = db.CLIENTE.Find(id);

                if (cliente != null)
                {
                    db.CLIENTE.Remove(cliente);
                    db.SaveChanges();
                }
            }
        }
    }

}
