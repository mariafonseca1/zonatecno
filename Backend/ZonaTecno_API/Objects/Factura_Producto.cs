using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZonaTecno_API.Objects
{
    public class Factura_Producto
    {
        public int? id { get; set; }
        public int id_factura { get; set; }
        public int id_producto { get; set; }
        public int cantidad { get; set; }
    }
}