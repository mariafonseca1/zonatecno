using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ZonaTecno_API.Models;
using ZonaTecno_API.Objects;

namespace ZonaTecno_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        public Usuario Get(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var usuario = (from u in db.USUARIO
                               where u.id == id
                               select new Usuario
                               {
                                   id = u.id,
                                   cedula = (int)u.cedula,
                                   nombre = u.nombre,
                                   clave = u.clave
                               }).FirstOrDefault();
                return usuario;
            }
        }

        // POST: api/Usuario
        public void Post([FromBody] Usuario usuario)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var nuevoUsuario = new Models.USUARIO
                {
                    cedula = usuario.cedula,
                    nombre = usuario.nombre,
                    clave = usuario.clave
                };

                db.USUARIO.Add(nuevoUsuario);
                db.SaveChanges();
            }
        }

        // PUT: api/Usuario/5
        public void Put(int id, [FromBody] Usuario usuario)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var usuarioExistente = db.USUARIO.Find(id);

                if (usuarioExistente != null)
                {
                    usuarioExistente.cedula = usuario.cedula;
                    usuarioExistente.nombre = usuario.nombre;
                    usuarioExistente.clave = usuario.clave;

                    db.SaveChanges();
                }
            }
        }

        // DELETE: api/Usuario/5
        public void Delete(int id)
        {
            using (Models.zonatecno_dbEntities db = new Models.zonatecno_dbEntities())
            {
                var usuario = db.USUARIO.Find(id);

                if (usuario != null)
                {
                    db.USUARIO.Remove(usuario);
                    db.SaveChanges();
                }
            }
        }
    }
}
