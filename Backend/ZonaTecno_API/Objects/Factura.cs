using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZonaTecno_API.Objects
{
    public class Factura
    {
        public int id { get; set; }
        public int id_cliente { get; set; }
        public DateTime fecha { get; set; }
    }
}