using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ZonaTecno_API.Objects;

namespace ZonaTecno_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")] //Permita que otros sitios hagan consultas
    public class UsuarioController : ApiController
    {
        // GET: api/Usuario
        public IEnumerable<Usuario> Get() 
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var usuarios = (from u in db.USUARIO
                                select new Usuario
                                {
                                    id = u.id,
                                    cedula = (int)u.cedula,
                                    nombre = u.nombre,
                                    clave = u.clave
                                }).ToList();
                return usuarios;
            }
        }

        // GET: api/Usuario/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Usuario
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Usuario/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Usuario/5
        public void Delete(int id)
        {
        }
    }
}
