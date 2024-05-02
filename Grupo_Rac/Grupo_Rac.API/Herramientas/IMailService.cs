using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grupo_Rac.API.Herramientas
{
    public interface IMailService
    {
        bool SendGmail(MailData mailData);
    }
}
