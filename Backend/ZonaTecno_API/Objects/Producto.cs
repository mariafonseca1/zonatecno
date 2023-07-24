using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZonaTecno_API.Objects
{
    public class Producto
    {
        public int? id { get; set; }
        public string nombre { get; set; }
        public int precio { get; set; }
        public string descripcion { get; set; }
    }
}