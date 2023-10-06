import * as React from 'react';
import logo from '../img/logo.png'
import insumos from '../img/insumos.png'
import compras from '../img/compras.png'
import productos from '../img/productos.png'
import ventas from '../img/ventas.png'
import informes from '../img/informes.png'
import configuracion from '../img/configuracion.png'
import usuario from '../img/user.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [openCompras, setOpenCompras] = React.useState(false);
  const [openInsumos, setOpenInsumos] = React.useState(false);

  return (
    <div className="bg-white flex">
      <div className="w-64 bg-[#201E1E] min-h-screen flex flex-col justify-start items-start p-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-32 h-20 ml-8 mt-8" />
        </Link>
        <ul className="mt-8 space-y-6">
          {[
            { text: 'Insumos', icon: insumos, submenu: [{ text: 'Categoría de Insumos' }] },
            {
              text: 'Compras',
              icon: compras,
              submenu: [
                { text: 'Proveedores', route: '/supplier' }, // Agrega la ruta para Proveedores
              ],
            },
            { text: 'Productos', icon: productos },
            { text: 'Ventas', icon: ventas },
            { text: 'Informes', icon: informes },
          ].map((item, index) => (
            <li key={item.text}>
              <a
                href={item.route || '#'} // Usar la ruta si está definida
                className="flex items-center text-white hover:bg-gray-700 p-2 rounded ml-7"
                onClick={() => item.submenu && index === 0 ? setOpenInsumos(!openInsumos) : setOpenCompras(!openCompras)}
              >
                <img src={item.icon} alt={item.text} className="w-8 h-6" />
                <span className="ml-2">{item.text}</span>
                {item.submenu && (
                  <KeyboardArrowDownIcon className="ml-2 text-white" />
                )}
              </a>
              {index === 0 ? (
                openInsumos && item.submenu && (
                  <ul className="mt-2 space-y-2 ml-4">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subItem.text}>
                        <a href={subItem.route || '#'} className="text-white hover:bg-gray-700 p-2 rounded ml-7" style={{ whiteSpace: 'nowrap' }}>
                          <span>{subItem.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                openCompras && item.submenu && (
                  <ul className="mt-2 space-y-2 ml-4">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subItem.text}>
                        <a href={subItem.route || '#'} className="text-white hover:bg-gray-700 p-2 rounded ml-7" style={{ whiteSpace: 'nowrap' }}>
                          <span>{subItem.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex justify-end space-x-4 mr-4 w-full">
          <a href="#" className="text-white hover:text-gray-400">
            <img src={configuracion} alt="Configuración" className="w-9 h-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <img src={usuario} alt="Usuario" className="w-8 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
